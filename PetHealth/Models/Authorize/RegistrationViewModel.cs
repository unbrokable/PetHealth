using PetHealth.DAL.Entities;

namespace PetHealth.Models.Authorize
{
    public class RegistrationViewModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public string ClinicName { get; set; }
    }
}
