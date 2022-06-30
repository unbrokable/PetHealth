using MailKit.Net.Smtp;
using MimeKit;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetHealth.Services
{
    public class EmailManager
    {
        public async Task SendMessage(IEnumerable<string> emails, string subject, string message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Subscribe", "deonisij340@gmail.com"));
            emailMessage.To.AddRange(emails.Select(i => new MailboxAddress("", i)));

            emailMessage.Subject = subject;

            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            using var client = new SmtpClient();
            await client.ConnectAsync("smtp.gmail.com", 587);
            await client.AuthenticateAsync("deonisij340@gmail.com", "School114denis");
            await client.SendAsync(emailMessage);
            await client.DisconnectAsync(true);
        }
    }
}
