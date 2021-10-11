using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetHealth.DAL.Entities;
using PetHealth.Models.Authorize;
using PetHealth.Models.User;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tutor.DAL;

namespace PetHealth.Controllers
{
    [Authorize(Roles = nameof(Role.Admin))]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationContext _applicationContext;
        private readonly IMapper _mapper;
        public UsersController(ApplicationContext applicationContext, IMapper mapper)
        {
            this._applicationContext = applicationContext;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<UserViewModel>> GetUsers()
        {
            var users = await _applicationContext
                .Users
                .ToListAsync();

            return _mapper
                .Map<IEnumerable<UserViewModel>>(users);
        }

        [HttpGet("removes")]
        public async Task<IEnumerable<UserViewModel>> GetRemovedUsers()
        {
            var users = await _applicationContext
                .Users
                .IgnoreQueryFilters()
                .Where(i => i.IsDeleted)
                .ToListAsync();

            return _mapper
                .Map<IEnumerable<UserViewModel>>(users);
        }

        [HttpDelete("{id}")]
        public async Task RemoveUser(int id)
        {
            var user = new User
            {
                Id = id
            };

            _applicationContext
                .Attach<User>(user);

            user.IsDeleted = true;

            await _applicationContext
                .SaveChangesAsync();
        }

        [HttpPatch("{id}")]
        public async Task RestoreUser(int id)
        {
            var user = new User
            {
                Id = id
            };

            _applicationContext
                .Attach<User>(user);

            user.IsDeleted = false;

            await _applicationContext
                .SaveChangesAsync();
        }

        [HttpPost]
        public async Task AddUser(RegistrationRoleViewModel userCreate)
        {
            var user = _mapper
                .Map<User>(userCreate);

            await _applicationContext
                .Users
                .AddAsync(user);

            await _applicationContext
              .SaveChangesAsync();
        }
     }
}
