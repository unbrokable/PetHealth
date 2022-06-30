using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using PetHealth.DAL.Entities;
using PetHealth.Extentions;
using PetHealth.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PetHealth.DAL;
using PetHealth.Models.Chat;
using Microsoft.EntityFrameworkCore;

namespace PetHealth.Hubs
{
    [Authorize]
    public class MessageHub : Hub 
    {

        private readonly ApplicationContext _dataBase;

        private readonly ILogger<MessageHub> logger;
                
        public MessageHub(ApplicationContext applicationContext, ILogger<MessageHub> logger)
        {
            _dataBase = applicationContext;

            this.logger = logger;
        }

        public override Task OnConnectedAsync()
        {
            logger.LogInformation("User connected. ConnectedId: {connectedId}", Context.ConnectionId);

            return base.OnConnectedAsync();
        }

        public async Task SendMessage(string text, int chatId)
        {
            _dataBase
                .Messages
                .Add(new Message()
                {
                    ChatId = chatId,
                    Text = text,
                    UserId = (await _dataBase
                        .Users
                        .FirstOrDefaultAsync(u => u.Email == Context.User.GetHubEmail()))
                        .Id
                });

            await _dataBase.SaveChangesAsync();


            MessageViewModel message = new MessageViewModel()
            {
                ChatId = chatId,
                Sender = Context.User.GetHubEmail(),
                Text = text
            };

            await this.Clients.Groups(chatId.ToString()).SendAsync("ReceiveMessage", message);
        }

        public class ClinicViewModel
        {
            public int Id { get; set; }
        }

        [HubMethodName("AddChat")]
        public async Task AddChat(ClinicViewModel clinic)
        {
            int? clinicId = clinic.Id;

            IEnumerable<User> users  = _dataBase
                .Users
                .Include(u => u.Clinic)
                .Where(c => c.Clinic.Id == clinicId || c.Email == Context.User.GetHubEmail())
                .ToList();


            Chat chat = await _dataBase
                .Chats
                .FirstOrDefaultAsync(c => c.Users
                    .Where(c => c.Clinic.Id == clinicId || c.Email == Context.User.GetHubEmail()).Count() == 2);

            if (chat is not null)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, chat.Id.ToString());

                await Groups.AddToGroupAsync(Context.ConnectionId, chat.Id.ToString());

                await Clients.User(users
                    .FirstOrDefault(u => u.Clinic != null && u.Clinic.Id == clinicId).Email)
                    .SendAsync("ConnectToChat", chat.Id);

                return;
            }

            chat = new() {
                Users = users
            };

            _dataBase.Chats.Add(chat);
            await _dataBase.SaveChangesAsync();

            await Groups.AddToGroupAsync(Context.ConnectionId, chat.Id.ToString());

            await Clients
                .User(users.FirstOrDefault(u => u.Clinic != null && u.Clinic.Id == clinicId).Email)
                .SendAsync("ConnectToChat", chat.Id);
        }

        public async Task ConnectToChats(IEnumerable<ChatViewModel> chats)
        {
            await Task.WhenAll(chats.Select(c => ConnectToChat(c)));
        }

        public async Task ConnectToChat(ChatViewModel chat)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, chat.Id.ToString());

            await Groups.AddToGroupAsync(Context.ConnectionId, chat.Id.ToString());

            MessageViewModel message = new MessageViewModel()
            {
                ChatId = chat.Id,
                Sender = "System",
                Text = $"User is available."
            };

            IEnumerable<MessageViewModel> messages = await  _dataBase
                .Messages
                .Include(c => c.User)
                .Where(c => c.ChatId == chat.Id)
                .Select(c => new MessageViewModel()
                {
                    ChatId = c.ChatId,
                    Sender = (c.User == null) ? "Sender" : c.User.Email,
                    Text = c.Text,
                })
                .ToListAsync();
                
            await Clients.Group(chat.Id.ToString()).SendAsync("ReceiveMessage", message);

            await Clients.Caller.SendAsync("ReceiveMessages", messages);
        }
    }
}
