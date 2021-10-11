using System;

namespace PetHealth.DAL.Entities
{
    public class HealthRecord
    {
        public int Id{ get; set; }

        public string Description { get; set; }
        public decimal Temperature { get; set; }
        public string Pulse { get; set; }
        public decimal Weight { get; set; }
        public DateTime Date { get; set; }
       
        public int PetId { get; set; }
        public Pet Pet { get; set; }

        public int ClinicId { get; set; }
        public Clinic Clinic { get; set; }
    }
}
