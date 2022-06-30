namespace PetHealth.DAL.Entities
{
    public class Comment
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public int ClinicId { get; set; }

        public Clinic Clinic { get; set; }

        public string Text { get; set; }
    }
}
