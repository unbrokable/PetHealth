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
 
    [Route("api/[controller]/users")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationContext _applicationContext;
        private readonly IMapper _mapper;
        public AdminController(ApplicationContext applicationContext, IMapper mapper)
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

        [HttpPut("{id}")]
        public async Task RestoreUser(int id)
        {
            var user = new User
            {
                Id = id,
                IsDeleted = true
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

        [HttpPost("damp")]
        public async Task Damp(string location)
        {
            string dbname = _applicationContext.Database.GetDbConnection().ConnectionString;
            string sqlCommand = @"BACKUP DATABASE [{0}] TO  DISK = N'{1}' WITH NOFORMAT, NOINIT,  NAME = N'MyAir-Full Database Backup', SKIP, NOREWIND, NOUNLOAD,  STATS = 10";
            
            _applicationContext
                .Database
                .ExecuteSqlRaw 
                (string.Format(sqlCommand, dbname, location));
        }
     }
}
