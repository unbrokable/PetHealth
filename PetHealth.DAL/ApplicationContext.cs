using Microsoft.EntityFrameworkCore;
using PetHealth.DAL.Entities;

namespace PetHealth.DAL
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Clinic> Clinics { get; set; }

        public DbSet<HealthRecord> HealthRecords { get; set; }

        public DbSet<ClinicPet> ClinicPets { get; set; }

        public DbSet<Pet> Pets { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<AvailableTime> AvailableTimes { get; set; }

        public DbSet<Visit> Visits { get; set; }

        public DbSet<Chat> Chats { get; set; }

        public DbSet<Message> Messages { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { 
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationContext).Assembly);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Clinic)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.NoAction);

           modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<Visit>()
                .HasOne(c => c.Clinic)
                .WithMany(c => c.Visits)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Visit>()
                 .HasOne(c => c.User)
                 .WithMany(c => c.Visits)
                 .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Message>()
             .HasOne(c => c.Chat)
             .WithMany(c => c.Messages)
             .OnDelete(DeleteBehavior.NoAction);
        }
    }

}
