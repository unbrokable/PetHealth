using System;

namespace PetHealth.DAL.Entities
{
    public class AvailableTime
    {
        public int Id { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
