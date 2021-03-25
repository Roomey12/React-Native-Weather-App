using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WeatherApp.Models;

namespace WeatherApp.Interfaces
{
    public interface ICityService
    {
        Task<List<City>> GetAllCities();

        Task<City> GetCityById(int id);

        Task<string> GetClientsCity(string remoteIpAddress);

        Task<List<City>> GetCitiesByIds(string ids);
    }
}
