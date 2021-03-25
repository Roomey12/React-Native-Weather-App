export class WeatherService {
  API_KEY;
  url;

  constructor() {
    this.API_KEY = "&appid=8943c2c5b07c50f60fa9ae9ee8392655";
    this.url = "https://api.openweathermap.org/data/2.5/weather?";
  }
  async getWeatherByCityName(cityName) {
    const request = await fetch(
      this.url + "q=" + cityName + this.API_KEY + "&units=metric"
    );
    return await request.json();
  }
  async getWeatherByCityId(cityId) {
    const request = await fetch(
      this.url + "id=" + cityId + this.API_KEY + "&units=metric"
    );
    return await request.json();
  }
}
