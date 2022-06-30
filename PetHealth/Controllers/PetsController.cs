using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetHealth.DAL.Entities;
using PetHealth.Extentions;
using PetHealth.Infrastructure;
using PetHealth.Models.Pet;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PetHealth.DAL;

namespace PetHealth.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController : ControllerBase
    {
        private readonly ApplicationContext _applicationContex;
        private readonly IMapper _mapper;

        public PetsController(ApplicationContext applicationContex, IMapper mapper)
        {
            this._mapper = mapper;
            this._applicationContex = applicationContex;
        }

        [HttpGet("clinics")]
        public async Task<IEnumerable<PetClinicViewModel>> GetClinicPets()
        {
            var userEmail = User.GetEmail();

            var result = await _applicationContex
                .Pets
                .Include(i => i.User)
                .Where(i => i.Clinics
                    .Any(j => j.Clinic.User.Email == userEmail && j.LastDate == null))
                .ToListAsync();

            return _mapper
                .Map<IEnumerable<PetClinicViewModel>>(result);
        }

        [HttpGet]
        public async Task<IEnumerable<PetClinicViewModel>> GetPetsForClinic([FromQuery] string name)
        {
            var userEmail = User.GetEmail();

            var result = await _applicationContex
                .Pets
                .Include(i => i.User)
                .Where(i => i.Clinics
                    .Any(j => j.Clinic.User.Email != userEmail && j.LastDate != null) || !i.Clinics.Any())
                .Where(i => i.Name.Contains(name??""))
                .ToListAsync();

            return _mapper
                .Map<IEnumerable<PetClinicViewModel>>(result);
        }

        [HttpGet("{id}")]
        public async Task<PetClinicViewModel> GetPet(int id)
        {
            var pet = await _applicationContex
                .Pets
                .FirstOrDefaultAsync(i => i.Id == id);

            return _mapper
                .Map<PetClinicViewModel>(pet);
        }

        [HttpGet("users")]
        public async Task<IEnumerable<PetViewModel>> GetUserPets()
        {
            int id = (await _applicationContex
                .Users
                .FirstOrDefaultAsync(i => i.Email == User.GetEmail())
                ).Id;

            var result = await _applicationContex
                .Pets
                .Where(i => i.UserId == id)
                .ToListAsync();

            return _mapper
              .Map<IEnumerable<PetViewModel>>(result);
        }

        [HttpPut]
        public async Task UpdatePet(PetUpdateViewModel petView)
        {
            var pet = await _applicationContex
                .Pets
                .FirstOrDefaultAsync(i => i.Id == petView.Id);

             _applicationContex
                .Pets
                .Update(pet.Updata(petView));

            await _applicationContex
                .SaveChangesAsync();
        }

        [HttpPost]
        public async Task AddPet(PetCreateViewModel petView)
        {
            var userId = (await _applicationContex
                .Users
                .FirstOrDefaultAsync(i => i.Email == User.GetEmail())).Id;

            var pet = _mapper.Map<Pet>(petView);
            
            pet.UserId = userId;

            await _applicationContex
                .Pets
                .AddAsync(pet);

            await _applicationContex
                .SaveChangesAsync();
        }

        [HttpGet("health")]
        public async Task<IEnumerable<PetHealthReportViewModel>> GetHealthReport()
        {
            var userId = (await _applicationContex
                .Users
                .FirstOrDefaultAsync(i => i.Email == User.GetEmail())).Id;

            var pets = _applicationContex
                .Pets
                .Where(i => i.UserId == userId)
                .ToList();

            List<PetHealthReportViewModel> report = new ();

            foreach (Pet pet in pets)
            {
                var healths = await _applicationContex
                    .HealthRecords
                    .Where(i => i.PetId == pet.Id)
                    .ToListAsync();

                if (!healths.Any())
                {
                    report.Add(new PetHealthReportViewModel
                    {
                        Id = pet.Id,
                        Name = pet.Name,
                        Condition = HealthCondition.Good.ToString(),
                    });

                    continue;
                }

                decimal tempIncrease = healths.Max(i => i.Temperature) 
                    - healths.Min(i => i.Temperature);

                decimal weightIncrease = healths.Max(i => i.Weight)
                    - healths.Min(i => i.Weight);

                foreach (var health in healths)
                {
                    tempIncrease = health.Temperature  - (tempIncrease + health.Temperature) / 2;
                    weightIncrease = health.Weight  - (weightIncrease + health.Weight) / 2;
                }

                decimal avgIncrease = (tempIncrease + weightIncrease) / 2;

                decimal avg = (healths.Average(i => i.Weight) + healths.Average(i => i.Weight)) / 2;

                decimal interest = avg / (avgIncrease > 0 ? avgIncrease / 100 : (avgIncrease * -1) / 100);   

                report.Add(new PetHealthReportViewModel
                {
                    Id = pet.Id,
                    Name = pet.Name,
                    Condition = GetCondition(interest).ToString(),
                });
            }

            return report;
        }

        private HealthCondition GetCondition(decimal condition)
        {
            if (condition >= (int)HealthCondition.Critical)
                return HealthCondition.Critical;

            else if (condition >= (int)HealthCondition.Bad)
                return HealthCondition.Bad;

            else if (condition >= (int)HealthCondition.Normal)
                return HealthCondition.Normal;

            return HealthCondition.Good;
        }
    }
}
