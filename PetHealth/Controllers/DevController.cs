using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetHealth.DAL.Entities;
using PetHealth.Models.HealthRecord;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PetHealth.DAL;

namespace PetHealth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ApplicationContext _applicationContext;

        public DevController(IMapper mapper, ApplicationContext applicationContext)
        {
            this._applicationContext = applicationContext;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _applicationContext.Users.ToListAsync();
        }  

        [HttpDelete("chats/messages")]
        public async Task RemoveMessages()
        {
            _applicationContext
                .Messages
                .RemoveRange(_applicationContext
                .Messages);

            await _applicationContext.SaveChangesAsync();
        }

        [HttpDelete("comments")]
        public async Task RemoveComments()
        {
            _applicationContext
                .Comments
                .RemoveRange(_applicationContext
                .Comments);

            await _applicationContext.SaveChangesAsync();
        }

        [HttpDelete("chats")]
        public async Task RemoveChats()
        {
            _applicationContext
                .Chats
                .RemoveRange(_applicationContext
                .Chats);

            await _applicationContext.SaveChangesAsync();
        }
    }
}
