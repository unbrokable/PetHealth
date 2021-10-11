using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PetHealth.DAL.Entities
{
    public class Pet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDay { get; set; }
        public string Kind { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public IEnumerable<ClinicPet> Clinics { get; set; }
    }
}
