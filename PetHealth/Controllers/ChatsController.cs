using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetHealth.DAL.Entities;
using PetHealth.Extentions;
using PetHealth.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using PetHealth.DAL;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace PetHealth.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        private readonly ApplicationContext _database;

        private readonly IMapper _mapper;
        public ChatsController(ApplicationContext application, IMapper mapper)
        {
            this._database = application;

            this._mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetChats()
        {
            IEnumerable<Chat> chats = (await _database
                .Users
                .Include(u => u.Chats)
                .ThenInclude(c => c.Users)
                .ThenInclude(c => c.Clinic)
                .FirstOrDefaultAsync(u => u.Email == User.GetEmail()))
                .Chats;

            return Ok(chats
                .Select(c => new ChatViewModel() { 
                    Id = c.Id,
                    Name = User.IsInRole(Role.Owner.ToString())
                    ?   "Chat with " + c.Users.FirstOrDefault(u => u.Role != Role.Owner).Email ?? " Client"
                    :   "Chat with "  + c.Users.FirstOrDefault(u => u.Role == Role.Owner)?.Clinic?.Name ?? " Clinic"
                }));
        }
    }
}
