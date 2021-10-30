using System;

namespace PetHealth.Models.HealthRecord
{
    public class HealthRecordCreateViewModel
    {
        public string Description { get; set; }
        public decimal Temperature { get; set; }
        public string Pulse { get; set; }
        public decimal Weight { get; set; }
        public int PetId { get; set; }
    }
}
