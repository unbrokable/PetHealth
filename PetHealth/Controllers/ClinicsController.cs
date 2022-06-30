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
using PetHealth.DAL;
using PetHealth.Models.Chat;
using PetHealth.Infrastructure;
using DinkToPdf.Contracts;
using DinkToPdf;
using System.IO;

using Syncfusion.Pdf;
using Syncfusion.Pdf.Parsing;
using Syncfusion.Pdf.Graphics;
using Syncfusion.Pdf.Grid;
using System.Data;
using Syncfusion.Drawing;

namespace PetHealth.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClinicsController : ControllerBase
    {
        private readonly ApplicationContext _dataBase;
        private readonly EmailManager _emailManager;
        private readonly IMapper _mapper;
        private readonly IConverter converter;

        public ClinicsController(ApplicationContext dataBase, EmailManager emailManager, IMapper mapper, IConverter converter)
        {
            this._mapper = mapper;
            this._dataBase = dataBase;
            this._emailManager = emailManager;
            this.converter = converter;
        }

        [HttpGet]
        public async Task<IEnumerable<ClinicViewModel>> GetClinics()
        {
            IEnumerable<Clinic> clinics = _dataBase
                .Clinics
                .Include(i => i.User)
                .Include(i => i.Pets.Where(j => j.LastDate == null));

            var response = await Task
                .FromResult(_mapper.Map<IEnumerable<ClinicViewModel>>(clinics));

            return response;
        }

        [HttpGet("{id}")]
        public async Task<ClinicFullViewModel> GetClinic(int id)
        {
           
           Clinic clinic = await _dataBase
                .Clinics
                .Include(i => i.User)
                .Include(i => i.Pets.Where(j => j.LastDate == null))
                .Include(i => i.Comments)
                .ThenInclude(i => i.User)
                .FirstOrDefaultAsync(i => id != 0 ? i.Id == id : i.Id == i.User.Clinic.Id);
      
            return _mapper
                .Map<ClinicFullViewModel>(clinic);
        }

        [HttpPost("{id}/comments")]
        public async Task AddClinicComment(int id, CommentAddViewModel comment)
        {

            if(id == 0)
            {
                throw new ArgumentException("Owner can't add comments");
            }

            _dataBase
                .Comments
                .Add(new Comment()
                {
                    ClinicId = id,
                    UserId = (await _dataBase
                        .Users
                        .FirstOrDefaultAsync(u => u.Email == User.GetEmail())).Id,
                    Text = comment.Text
                });

            await _dataBase.SaveChangesAsync();
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
                    Id = userId
                });

            await _dataBase
                .SaveChangesAsync();
        }

        [HttpPost("pets/{petId}")]
        public async Task AddPetClinic(int petId)
        {
            var clinic = await _dataBase
                .Clinics
                .FirstOrDefaultAsync(i => i.User.Email == User.GetEmail());

            var clinicPet = await _dataBase
                .ClinicPets
                .FirstOrDefaultAsync(i => i.PetId == petId
                && clinic.Id == i.ClinicId);

            if (clinicPet is null)
            {
                await _dataBase
                    .ClinicPets
                    .AddAsync(new ClinicPet
                    {
                        ClinicId = clinic.Id,
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

        [HttpDelete("pets/{petId}")]
        public async Task UnsubscribePet(int petId)
        {
            var clinic = await _dataBase
             .Clinics
             .FirstOrDefaultAsync(i => i.User.Email == User.GetEmail());

            _dataBase
                 .ClinicPets
                 .Update(new ClinicPet
                 {
                     ClinicId = clinic.Id,
                     PetId = petId,
                     LastDate = DateTime.Now
                 });

            await _dataBase
                .SaveChangesAsync();
        }

        [HttpPost("pets/records")]
        public async Task AddHealthRecord(HealthRecordCreateViewModel healthRecordModel)
        {
            var clinic = await _dataBase
               .Clinics
               .FirstOrDefaultAsync(i => i.User.Email == User.GetEmail());

            var healthRecord = _mapper
                .Map<HealthRecord>(healthRecordModel);
            healthRecord.Date = DateTime.Now;

            healthRecord.ClinicId = clinic.Id;

            await _dataBase
                .HealthRecords
                .AddAsync(healthRecord);

            var user = await _dataBase
                .Users
                .FirstOrDefaultAsync(i => i.Pets.Any(j => j.Id == healthRecord.PetId));

            try
            {
                await _emailManager
                    .SendMessage(new List<string> { user.Email }, "Your pet health", "Record is added");
            }
            catch (Exception)
            {
                
            }

            await _dataBase
                .SaveChangesAsync();
        }


        [HttpGet("pets/pdf")]
        public async Task<IActionResult> GeneratePdf()
        {

            IEnumerable<Pet> pets =
                await _dataBase
                .Clinics
                .Where(c => c.User.Email == User.GetEmail())
                .Include(i => i.Pets.Where(j => j.LastDate == null))
                .ThenInclude(c => c.Pet)
                .SelectMany(c => c.Pets)
                .Select(c => c.Pet)
                .ToListAsync();

            PdfDocument doc = new PdfDocument();
            PdfPage page = doc.Pages.Add();
            PdfGrid pdfGrid = new PdfGrid();
            DataTable dataTable = new DataTable();

            foreach (var type in new Pet().GetType().GetProperties())
            {
                dataTable.Columns.Add(type.Name);
            }

            foreach (var pet in pets)
            {
                dataTable.Rows.Add(pet.GetType().GetProperties().Select(t => t.GetValue(pet)?.ToString()?? "No data" ).ToArray());
            }

            pdfGrid.DataSource = dataTable;

            pdfGrid.Draw(page, new PointF(10, 10));

            MemoryStream stream = new MemoryStream();
            doc.Save(stream);
            stream.Position = 0;
            doc.Close(true);

            string contentType = "application/pdf";
            string fileName = "Report.pdf";

            return File(stream, contentType, fileName);
        }
    }
}
