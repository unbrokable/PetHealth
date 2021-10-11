using System;
using System.Security.Claims;

namespace PetHealth.JWT
{
    public interface IJwtAuthorizationService
    {
        public JwtAuthorizationViewModel GenerateTokens( Claim[] claims, DateTime now);
    }
}
