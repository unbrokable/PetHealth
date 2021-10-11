using AutoMapper;
using PetHealth.DAL.Entities;
using PetHealth.Models.Clinic;
using PetHealth.Models.HealthRecord;
using PetHealth.Models.Pet;
using PetHealth.Models.User;

namespace PetHealth.Infrastructure.Profiles
{
    public class CommonProfile: Profile
    {
        public CommonProfile()
        {
            CreateMap<Clinic, ClinicViewModel>()
                .ReverseMap();

            CreateMap<HealthRecordCreateViewModel, HealthRecord>();

            CreateMap<HealthRecordViewModel, HealthRecord>()
                .ReverseMap();

            CreateMap<UserViewModel, User>()
                .ReverseMap();

            CreateMap<Pet, PetViewModel>()
                .ReverseMap();

            CreateMap<PetCreateViewModel, Pet>();

            CreateMap<Pet, PetClinicViewModel>()
                .ForPath(i => i.User, j => j.MapFrom(j => j.User.Email));
        
        }
    }
}
