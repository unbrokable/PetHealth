using System;

namespace PetHealth.Models.Pet
{
    public class PetViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDay { get; set; }
        public string Kind { get; set; }
    }
}
