using System.Collections.Generic;

namespace PetHealth.DAL.Entities
{
    public class Clinic
    {
        public int Id { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }

        public string Name { get; set; }

        public IEnumerable<ClinicPet> Pets { get; set; }

        public IEnumerable<Comment> Comments { get; set; }

        public IEnumerable<AvailableTime> AvailableTimes { get; set; }

        public IEnumerable<Chat> Chats { get; set; }

        public IEnumerable<Visit> Visits { get; set; }
    }
}
