using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetHealth.DAL.Entities;
using PetHealth.Extentions;
using PetHealth.Models.Clinic;
using PetHealth.Models.HealthRecord;
using PetHealth.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tutor.DAL;

namespace PetHealth.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClinicController : ControllerBase
    {
        private readonly ApplicationContext _dataBase;
        private readonly EmailManager _emailManager;
        private readonly IMapper _mapper;

        public ClinicController(ApplicationContext dataBase, EmailManager emailManager, IMapper mapper)
        {
            this._mapper = mapper;
            this._dataBase = dataBase;
            this._emailManager = emailManager;
        }

        [HttpGet]
        public async Task<IEnumerable<ClinicViewModel>> GetClinics()
        {
            return await _dataBase
                .Clinics
                .Include(i => i.User)
                .Include(i => i.Pets.Where(j => j.LastDate == null))
                .Select(i => new ClinicViewModel
                {
                    User = i.User.Email,
                    Name = i.Name,
                    AmountOfPets = i.Pets.Count()
                })
                .ToListAsync();
        }

        [HttpPost]
        public async Task AddClinic(string name)
        {
            var userId = (await _dataBase
                .Users
                .FirstOrDefaultAsync(i => i.Email == User.GetEmail())).Id;

            _dataBase
                .Clinics
                .Add(new Clinic
                {
                    Name = name,
                    UserId = userId
                });

            await _dataBase
                .SaveChangesAsync();
        }

        [HttpPost("{clinicId}/pets/{petId}")]
        public async Task AddPetClinic(int clinicId, int petId)
        {
            var clinicPet = await _dataBase
                .ClinicPets
                .FirstOrDefaultAsync(i => i.PetId == petId && i.ClinicId == clinicId);

            if (clinicPet is null)
            {
                await _dataBase
                    .ClinicPets
                    .AddAsync(new ClinicPet
                    {
                        ClinicId = clinicId,
                        PetId = petId,
                        LastDate = null
                    });
            }
            else
            {
                clinicPet.LastDate = null;

                _dataBase
                  .ClinicPets
                  .Update(clinicPet);
            }

            await _dataBase
                .SaveChangesAsync();
        }

        [HttpDelete("{clinicId}/pets/{petId}")]
        public async Task UnsubscribePet(int clinicId, int petId)
        {
            _dataBase
                 .ClinicPets
                 .Update(new ClinicPet
                 {
                     ClinicId = clinicId,
                     PetId = petId,
                     LastDate = DateTime.Now
                 });

            await _dataBase
                .SaveChangesAsync();
        }

        [HttpPost("{clinicId}/pets/records")]
        public async Task AddHealthRecord(int clinicId, HealthRecordCreateViewModel healthRecordModel)
        {
            var healthRecord = _mapper
                .Map<HealthRecord>(healthRecordModel);

            healthRecord.ClinicId = clinicId;

            await _dataBase
                .HealthRecords
                .AddAsync(healthRecord);

            var user = await _dataBase
                .Users
                .FirstOrDefaultAsync(i => i.Pets.Any(j => j.Id == healthRecord.PetId));

            await _emailManager
                .SendMessage(new List<string> { user.Email }, "Your pet health", "Record is added");

            await _dataBase
                .SaveChangesAsync();
        }

    }
}
