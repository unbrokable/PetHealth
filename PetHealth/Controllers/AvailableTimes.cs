using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetHealth.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PetHealth.DAL;

namespace PetHealth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvailableTimes : ControllerBase
    {
        private readonly ApplicationContext _dataBase;

        public AvailableTimes(ApplicationContext applicationContext)
        {
            this._dataBase = applicationContext;
        }

        [HttpPut("availabletimes/{entityType}/{id}")]
        public async Task SetAvailableTimes(EntityType entityType, int id, IEnumerable<AvailableTime> times)
        {
            switch (entityType)
            {
                case EntityType.Clinic:

                    Clinic clinic = _dataBase.Clinics
                        .Include(c => c.AvailableTimes)
                        .FirstOrDefault(c => c.Id == id);

                    clinic.AvailableTimes = times;
                    break;
                case EntityType.User:
                    User user = _dataBase.Users
                        .Include(c => c.AvailableTimes)
                        .FirstOrDefault(c => c.Id == id);

                    user.AvailableTimes = times;
                    break;
                default:
                    break;
            }

            await _dataBase.SaveChangesAsync();
        }
    }
}
