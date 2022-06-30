using System.Collections.Generic;

namespace PetHealth.DAL.Entities
{
    public enum Role
    {
        User, 

        Owner,

        Admin,
    } 
    
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsDeleted { get; set; }
        public Role Role { get; set; }
        public Clinic Clinic { get; set; }

        public IEnumerable<Pet> Pets { get; set; }

        public IEnumerable<Comment> Comments { get; set; }

        public IEnumerable<AvailableTime> AvailableTimes { get; set; }

        public IEnumerable<Chat> Chats { get; set; }

        public IEnumerable<Visit> Visits { get; set; }
    }
}
