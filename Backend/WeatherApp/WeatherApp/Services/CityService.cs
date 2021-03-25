using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Threading.Tasks;
using IpData;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using WeatherApp.Database;
using WeatherApp.Interfaces;
using WeatherApp.Models;

namespace WeatherApp.Services
{
    public class CityService : ICityService
    {
        private readonly ApplicationContext _context;
        private readonly ApplicationSettings _appSettings;

        public CityService(ApplicationContext context, IOptions<ApplicationSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }

        public async Task<List<City>> GetAllCities()
        {
            return await _context.Cities.ToListAsync();
        }

        public async Task<City> GetCityById(int id)
        {
            return await _context.Cities.FindAsync(id);
        }

        public async Task<string> GetClientsCity(string remoteIpAddress)
        {
            var client = new IpDataClient(_appSettings.IpDataApiKey);
            var ipInfo = await client.Lookup(remoteIpAddress);

            return ipInfo.City;
        }

        public async Task<List<City>> GetCitiesByIds(string ids)
        {
            var idsList = ids.Split("_");
            var result = new List<City>();

            for(int i = 0; i < idsList.Length; i++) 
            {
                if(idsList[i] != string.Empty)
                {
                    result.Add(await _context.Cities.FindAsync(Convert.ToInt32(idsList[i])));
                }
            }

            return result;
        }
    }
}
