using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PetHealth.JWT
{
    public class JwtAuthorizationService : IJwtAuthorizationService
    {
        private readonly JwtTokenConfig jwtTokenConfig;
        private readonly byte[] secret;

        public JwtAuthorizationService(JwtTokenConfig jwtToken)
        {
            this.jwtTokenConfig = jwtToken;
            secret = Encoding.ASCII.GetBytes(jwtTokenConfig.Secret);
        }
        public JwtAuthorizationViewModel GenerateTokens(Claim[] claims, DateTime now )
        {
            var jwtToken = new JwtSecurityToken(
                jwtTokenConfig.Issuer,
                jwtTokenConfig.Audience,
                claims,
                expires: now.AddMinutes(jwtTokenConfig.AccessTokenExpiration),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256Signature));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            return new JwtAuthorizationViewModel
            {
                AccessToken = encodedJwt
            };
        }
    }
}
