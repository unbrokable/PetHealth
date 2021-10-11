using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetHealth.DAL.Entities;

namespace PetHealth.DAL.Configuration
{
    public class UserEntityConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .HasIndex(i => i.Email)
                .IsUnique();
            
            builder
                .HasQueryFilter(i => !i.IsDeleted);

            builder.HasKey(i => i.Id);

            builder.Property(I => I.Email)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(i => i.Name)
                .HasMaxLength(100);

            builder.Property(i => i.Password)
                .HasMaxLength(100);
        }
    }
}
