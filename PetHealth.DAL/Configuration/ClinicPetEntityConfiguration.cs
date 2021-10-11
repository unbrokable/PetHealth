using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetHealth.DAL.Entities;

namespace PetHealth.DAL.Configuration
{
    public class ClinicPetEntityConfiguration : IEntityTypeConfiguration<ClinicPet>
    {
        public void Configure(EntityTypeBuilder<ClinicPet> builder)
        {
            builder
                .HasKey(i => new { i.ClinicId, i.PetId});

            builder
                 .HasOne(i => i.Pet)
                 .WithMany()
                 .HasForeignKey(i => i.PetId)
                 .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(i => i.Clinic)
                .WithMany()
                .HasForeignKey(i => i.ClinicId)
                .OnDelete(DeleteBehavior.NoAction); ;
        }
    }
}
