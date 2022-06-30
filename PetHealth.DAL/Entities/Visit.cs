using System;

namespace PetHealth.DAL.Entities
{
    public class Visit
    {
        public int Id { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }

        public int ClinicId { get; set; }

        public Clinic Clinic { get; set; }

        public DateTime Date { get; set; }
    }
}
