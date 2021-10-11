using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace PetHealth
{
    public class JwtAuthorizationViewModel
    {
        public string AccessToken  { get; set; }
        // add refresh token
    }
}
