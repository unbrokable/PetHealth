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
using Tutor.DAL;

namespace PetHealth.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PetController : ControllerBase
    {
        private readonly ApplicationContext _applicationContex;
        private readonly IMapper _mapper;

        public PetController(ApplicationContext applicationContex, IMapper mapper)
        {
            this._mapper = mapper;
            this._applicationContex = applicationContex;
        }

        [HttpGet("clinics/{id}")]
        public async Task<IEnumerable<PetClinicViewModel>> GetClinicPets(int id)
        {
            var result =  await _applicationContex
                .Pets
                .Include(i => i.User)
                .Where(i => i.Clinics.Any(j => j.ClinicId == id && j.LastDate == null))
                .ToListAsync();

            return _mapper
                .Map<IEnumerable<PetClinicViewModel>>(result);
        }

        [HttpGet]
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

        [HttpPut("id")]
        public async Task UpdatePet(int id, PetCreateViewModel petView)
        {
            var pet = await _applicationContex
                .Pets
                .FirstOrDefaultAsync(i => i.Id == id);

             _applicationContex
                .Pets
                .Update(pet.Updata(pet));

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
    }
}
