using AutoMapper;
using PetHealth.DAL.Entities;
using PetHealth.Models.Authorize;

namespace PetHealth.Infrastructure.Profiles
{
    public class AuthorizeProfile: Profile
    {
        public AuthorizeProfile()
        {
            CreateMap<RegistrationViewModel, User>();
            CreateMap<RegistrationRoleViewModel, User>()
                .ForMember(i => i.Role, j => j.MapFrom(j =>(Role)j.Role));
        }
    }
}
