using Microsoft.EntityFrameworkCore;
using PetHealth.DAL.Entities;

namespace Tutor.DAL
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users {get; set;}

        public DbSet<Clinic> Clinics { get; set; }
        public DbSet<HealthRecord> HealthRecords { get; set; }
        public DbSet<ClinicPet> ClinicPets { get; set; }
        public DbSet<Pet> Pets { get; set; }


        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { 
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationContext).Assembly);
        }
    }

}
