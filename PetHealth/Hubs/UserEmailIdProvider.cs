using Microsoft.AspNetCore.SignalR;
using PetHealth.Extentions;
using System.Linq;
using System.Security.Claims;

namespace PetHealth.Hubs
{
    public class UserEmailIdProvider : IUserIdProvider
    {
        public virtual string GetUserId(HubConnectionContext connection)
        {
            return connection.User.GetEmail();
        }
    }
}
