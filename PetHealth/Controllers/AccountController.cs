using AutoMapper;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PetHealth.DAL.Entities;
using PetHealth.JWT;
using PetHealth.Models.Authorize;
using PetHealth.Services;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Tutor.DAL;

namespace PetHealth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationContext _dataBase;
        private readonly IMapper _mapper;
        private readonly IJwtAuthorizationService _authorizationService;
        private readonly IConfiguration _configuration;
        private readonly IHasher _hasher;

        public AccountController(ApplicationContext dataBase, IMapper mapper, IJwtAuthorizationService authorizationService,
            IConfiguration configuration, IHasher hasher)
        {
            this._configuration = configuration;
            this._dataBase = dataBase;
            this._mapper = mapper;
            this._authorizationService = authorizationService;
            this._hasher = hasher;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginViewModel login)
        {
            var user = await _dataBase
                 .Users
                 .FirstOrDefaultAsync(i => i.Email == login.Email && i.Password == login.Password);

            if(user is null)
            {
                return BadRequest();
            }

            return GenerateAuthorizeResponse(user);
        }

        [HttpPost("registration")]
        public async Task<ActionResult> Registration(RegistrationViewModel registration)
        {
            var user = _mapper.Map<User>(registration);

            if(user.Role == Role.Owner)
            {
                user.Clinic = new Clinic
                {
                    Name = user.Name + " Clinic"
                };
            }

            await _dataBase
                .Users
                .AddAsync(user);
           
            await _dataBase
                .SaveChangesAsync();

            return GenerateAuthorizeResponse(user);
        }

        [HttpPost("google")]
        public async Task<ActionResult> Google(string token)
        {
            GoogleJsonWebSignature.Payload userInfo;

            try
            {
                userInfo = await ValidateIdTokenAndGetUserInfo(token);
            }
            catch 
            {
                return BadRequest();
            }

            if(userInfo is null)
            {
                return BadRequest();
            }

            var user = await _dataBase
                .Users
                .FirstOrDefaultAsync(i => i.Email == userInfo.Email);
           
            if(user is null) { 
               
                user = new User
                {
                    Name = userInfo.Name,
                    Email = userInfo.Email,
                    Password = "password",
                    Role = Role.User
                };

                await _dataBase
                    .SaveChangesAsync();
            }

            return GenerateAuthorizeResponse(user);
        }

        async Task<GoogleJsonWebSignature.Payload> ValidateIdTokenAndGetUserInfo(string idToken)
        {
            return await GoogleJsonWebSignature
                .ValidateAsync(idToken, new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>() { _configuration .GetSection("AudienceGoogle").Value },
                    IssuedAtClockTolerance = TimeSpan.FromSeconds(100)
                });
        }
        
        ActionResult GenerateAuthorizeResponse(User user)
        {
            var claims = new[] {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role,nameof(user.Role))
            };

            var data = _authorizationService
                .GenerateTokens(claims, DateTime.Now);

            return Ok(new
            {
                data.AccessToken,
                Role = user.Role.ToString()
            });
        }
    }
}
