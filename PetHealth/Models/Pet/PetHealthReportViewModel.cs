namespace PetHealth.Models.Pet
{

    public enum HealthCondition
    {
        Critical = 80,
        Bad = 30,
        Normal = 15, 
        Good = 10,
    }

    public class PetHealthReportViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Condition { get; set; }
    }
}
