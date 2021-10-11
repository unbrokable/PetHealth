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
                .HasKey(i => i.UserId);

            builder
                .Property(i => i.Name)
                .HasMaxLength(255);
        }
    }
}
