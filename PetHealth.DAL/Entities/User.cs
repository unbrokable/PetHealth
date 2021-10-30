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
    }
}
