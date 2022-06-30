using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace PetHealth.Hubs
{
    [Authorize]
    public class NotificationHub : Hub 
    {
    }
}
