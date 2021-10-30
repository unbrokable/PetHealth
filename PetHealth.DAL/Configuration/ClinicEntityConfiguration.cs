using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetHealth.DAL.Entities;

namespace PetHealth.DAL.Configuration
{
    public class ClinicEntityConfiguration : IEntityTypeConfiguration<Clinic>
    {
        public void Configure(EntityTypeBuilder<Clinic> builder)
        {
            builder
                .HasKey(i => i.Id);

            builder
                .Property(i => i.Name)
                .HasMaxLength(255);

            builder
                .HasOne(i => i.User)
                .WithOne(i => i.Clinic)
                .HasForeignKey<Clinic>(i => i.Id); 
        }
    }
}
