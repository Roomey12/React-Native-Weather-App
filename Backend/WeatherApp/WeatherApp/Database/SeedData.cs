using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WeatherApp.Models;

namespace WeatherApp.Database
{
    public class SeedData
    {
        public static void PrepPopulation(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope()) {
                SeedCityData(serviceScope.ServiceProvider.GetService<ApplicationContext>());
            }
        }

        public static void SeedCityData(ApplicationContext context)
        {
            Console.WriteLine("Applying Migrations...");
            context.Database.Migrate();
            if (!context.Cities.Any()) {
                Console.WriteLine("Adding data - seeding...");
                context.Cities.AddRange(
                        new City("London"),
                        new City("Kyiv"),
                        new City("Paris"),
                        new City("Zhytomyr"),
                        new City("Lviv"),
                        new City("Moscow"),
                        new City("Amsterdam"),
                        new City("Berlin"),
                        new City("Chicago"),
                        new City("Omsk"),
                        new City("Tomsk"),
                        new City("Texas"),
                        new City("Philadelphia"),
                        new City("Odessa"),
                        new City("Grozny")
                    );
                context.SaveChanges();
            } else {
                Console.WriteLine("Already have data - not seeding");
            }
        }
    }
}
