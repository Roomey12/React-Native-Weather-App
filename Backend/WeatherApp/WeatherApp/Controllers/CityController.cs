using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using WeatherApp.Interfaces;

namespace WeatherApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CityController : ControllerBase
    {
        private readonly ICityService _cityService;

        public CityController(ICityService cityService)
        {
            _cityService = cityService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCities()
        {
            return Ok(await _cityService.GetAllCities());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCityById(int id)
        {
            return Ok(await _cityService.GetCityById(id));
        }

        [HttpGet("client")]
        public async Task<IActionResult> GetClientsCity()
        {
            var remoteIpAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();

            var result = await _cityService.GetClientsCity(remoteIpAddress);

            return Ok(result);
        }

        [HttpGet("ids/{ids}")]
        public async Task<IActionResult> GetCitiesByIds(string ids)
        {
            var result = await _cityService.GetCitiesByIds(ids);

            return Ok(result);
        }
    }
}
