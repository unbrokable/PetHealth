using Microsoft.EntityFrameworkCore;
using PetHealth.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PetHealth.DAL;

namespace PetHealth.Services
{
    public class NotificationService
    {
        private readonly ApplicationContext _database;

        private readonly EmailManager _emailManager;

        public NotificationService(ApplicationContext applicationContext, EmailManager emailManager)
        {
            _database = applicationContext;

            _emailManager = emailManager;
        }

        public async Task SendNotification(string subject, string message, string userEmail)
        {
            DateTime now = DateTime.Now;

            User user = await _database
                .Users
                .Include(u => u.AvailableTimes)
                .FirstOrDefaultAsync(u => u.Email == userEmail);

            IEnumerable<AvailableTime> times;

            if(user.Role == Role.Owner)
            {
                times = _database
                       .Clinics
                       .Include(c => c.AvailableTimes)
                       .FirstOrDefault(c => c.UserId == user.Id)
                       .AvailableTimes;
            }
            else
            {
                times = user.AvailableTimes;
            }


            bool inRange = false;

            foreach (AvailableTime time in times)
            {
                if (time.StartDate <= now && time.EndDate >= now)
                {
                    inRange = true;
                    break;
                }
            }

            if (!inRange)
            {
                await _emailManager.SendMessage(new string[] { userEmail }, subject, message);
            }

        }

    }
}
