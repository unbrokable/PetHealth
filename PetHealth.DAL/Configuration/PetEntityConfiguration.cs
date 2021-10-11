using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetHealth.DAL.Entities;

namespace PetHealth.DAL.Configuration
{
    public class PetEntityConfiguration : IEntityTypeConfiguration<Pet>
    {
        public void Configure(EntityTypeBuilder<Pet> builder)
        {
            builder.HasKey(i => i.Id);

            builder.Property(I => I.Name)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(i => i.Kind)
                .IsRequired()
                .HasMaxLength(100);
        }
    }
}
