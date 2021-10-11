using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetHealth.DAL.Entities;

namespace PetHealth.DAL.Configuration
{
    public class HealthRecordEntityConfiguration : IEntityTypeConfiguration<HealthRecord>
    {
        public void Configure(EntityTypeBuilder<HealthRecord> builder)
        {
            builder
                .HasKey(i => i.Id);

            builder
                .Property(i => i.Description)
                .HasMaxLength(255);

            builder
                .Property(i => i.Pulse)
                .IsRequired()
                .HasMaxLength(255);

            builder
               .Property(i => i.Temperature)
               .IsRequired();

            builder
                .Property(i => i.Weight)
                .IsRequired();

            builder
                .Property(i => i.Date)
                .IsRequired();


            builder
                 .HasOne(i => i.Pet)
                 .WithMany()
                 .HasForeignKey(i => i.PetId)
                 .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(i => i.Clinic)
                .WithMany()
                .HasForeignKey(i => i.ClinicId)
                   .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
