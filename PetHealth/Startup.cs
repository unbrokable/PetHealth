using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using PetHealth.Hubs;
using PetHealth.JWT;
using PetHealth.Services;
using System;
using PetHealth.DAL;
using DinkToPdf;
using DinkToPdf.Contracts;

namespace PetHealth
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connection = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContextPool<ApplicationContext>(opt =>
            {
                opt.UseSqlServer(connection);
            });

            services.AddControllers();

            services.AddScoped<IJwtAuthorizationService, JwtAuthorizationService>();
            services.AddScoped<EmailManager>();
            services.AddScoped<IHasher, Hasher>();

            services.AddJWT(Configuration);
            services.AddAutoMapper(typeof(Startup));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PetHealth", Version = "v1" });

                var jwtSecurityScheme = new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter into field the word 'Bearer' following by space and JWT",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme
                    }
                };
                c.AddSecurityDefinition("Bearer",jwtSecurityScheme);

                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                       { jwtSecurityScheme, Array.Empty<string>() }
                });
            });

            services.AddSignalR();
            services.AddSingleton<IUserIdProvider, UserEmailIdProvider>();

            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(builder => builder
               .WithOrigins("http://localhost:3000")
               .WithOrigins("http://localhost:3001")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();

                app.UseSwaggerUI(c => {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "PetHealth v1");
                  
                });
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<NotificationHub>("/hubs/notification");
                endpoints.MapHub<MessageHub>("/hubs/message");
                endpoints.MapControllers();
            });
        }
    }
}
