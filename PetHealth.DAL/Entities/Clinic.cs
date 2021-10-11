using System.Collections.Generic;

namespace PetHealth.DAL.Entities
{
    public class Clinic
    {
        public int UserId{ get; set; }
        public User User { get; set; }

        public string Name { get; set; }

        public IEnumerable<ClinicPet> Pets { get; set; }
    }
}
