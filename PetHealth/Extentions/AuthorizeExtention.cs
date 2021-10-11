using System.Security.Claims;

namespace PetHealth.Extentions
{
    public static class AuthorizeExtention
    {
        public static string GetEmail(this ClaimsPrincipal user) => user.FindFirst(ClaimTypes.Email).Value;
    }
}
