using System;
using System.Security.Cryptography;
using System.Text;

namespace PetHealth.Services
{
    public class Hasher : IHasher
    {
        public string Hash(string input)
        {
            var md5 = MD5.Create();
            var hash = md5.ComputeHash(Encoding.UTF8.GetBytes(input));

            return Convert.ToBase64String(hash);
        }
    }
}
