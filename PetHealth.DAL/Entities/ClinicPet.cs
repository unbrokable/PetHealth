using System;

namespace PetHealth.DAL.Entities
{
    public class ClinicPet
    {
        public int PetId { get; set; }

        public Pet Pet { get; set; }

        public Clinic Clinic { get; set; }

        public int ClinicId { get; set; }

        public DateTime? LastDate { get; set; }
    }
}
