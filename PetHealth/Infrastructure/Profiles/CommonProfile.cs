using AutoMapper;
using PetHealth.DAL.Entities;
using PetHealth.Models;
using PetHealth.Models.Chat;
using PetHealth.Models.Clinic;
using PetHealth.Models.HealthRecord;
using PetHealth.Models.Pet;
using PetHealth.Models.User;
using System.Linq;

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

            CreateMap<Chat, ChatViewModel>()
                .ForPath(c => c.Name, c => c.MapFrom(c => "Chat " + c.Id));

            CreateMap<Comment, CommentViewModel>()
                .ForPath(i => i.UserEmail, j => j.MapFrom(j => j.User.Email));

            CreateMap<Clinic, ClinicViewModel>()
                .ForPath(i => i.User, j => j.MapFrom(j => j.User.Email))
                .ForPath(i => i.AmountOfPets, j => j.MapFrom(j => j.Pets.Count()));

            CreateMap<Clinic, ClinicFullViewModel>()
                .ForPath(i => i.User, j => j.MapFrom(j => j.User.Email));
        }
    }
}
