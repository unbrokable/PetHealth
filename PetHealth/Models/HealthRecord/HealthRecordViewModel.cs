using System;

namespace PetHealth.Models.HealthRecord
{
    public class HealthRecordViewModel
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Temperature { get; set; }
        public string Pulse { get; set; }
        public decimal Weight { get; set; }
        public DateTime Date { get; set; }
    }
}
