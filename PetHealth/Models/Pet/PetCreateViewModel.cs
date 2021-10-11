using System;

namespace PetHealth.Models.Pet
{
    public class PetCreateViewModel
    {
        public string Name { get; set; }
        public DateTime BirthDay { get; set; }
        public string Kind { get; set; }
    }
}
