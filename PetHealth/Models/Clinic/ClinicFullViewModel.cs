using PetHealth.Models.Chat;
using System.Collections.Generic;

namespace PetHealth.Models.Clinic
{
    public class ClinicFullViewModel : ClinicViewModel
    {
        public IEnumerable<CommentViewModel> Comments { get; set; }
    }
}
