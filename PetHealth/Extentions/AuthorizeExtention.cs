using System.Linq;
using System.Security.Claims;

namespace PetHealth.Extentions
{
    public static class AuthorizeExtention
    {
        public static string GetEmail(this ClaimsPrincipal user) => user.FindFirst(ClaimTypes.Email).Value;

        public static string GetHubEmail(this ClaimsPrincipal user) => user
            .Identities
            .SelectMany(i => i.Claims)
            .FirstOrDefault(i => i.Type == ClaimTypes.Email).Value;
    }
}
