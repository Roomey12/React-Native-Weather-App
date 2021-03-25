using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WeatherApp.Models;

namespace WeatherApp.Database
{
    public class ApplicationContext : DbContext
    {
        public DbSet<City> Cities { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options) { }
    }
}
