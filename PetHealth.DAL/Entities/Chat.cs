using System.Collections.Generic;

namespace PetHealth.DAL.Entities
{
    public class Chat
    {
        public int Id { get; set; }

        public IEnumerable<Message> Messages { get; set; }

        public IEnumerable<Clinic> Clinics { get; set; }

        public IEnumerable<User> Users { get; set; }
    }
}
