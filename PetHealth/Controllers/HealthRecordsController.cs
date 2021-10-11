using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetHealth.Models.HealthRecord;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tutor.DAL;

namespace PetHealth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthRecordsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ApplicationContext _applicationContext;

        public HealthRecordsController(IMapper mapper, ApplicationContext applicationContext)
        {
            this._applicationContext = applicationContext;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<HealthRecordViewModel>> GetHealthRecordsOfPet([FromQuery]int petId)
        {
            var records = await _applicationContext
                .HealthRecords
                .Where(i => i.PetId == petId)
                .ToListAsync();

            return _mapper
                .Map<IEnumerable<HealthRecordViewModel>>(records);
        }  
    }
}
