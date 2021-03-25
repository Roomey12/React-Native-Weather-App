export class CityService {
  url;
  constructor() {
    this.url = "https://eb37aa91d52e.ngrok.io/api/city";
    //"https://localhost:5001/api/city"
  }

  async getAllCities() {
    const request = await fetch(this.url);
    return await request.json();
  }

  async getCityById(id) {
    const request = await fetch(this.url + "/" + id);
    return await request.json();
  }

  async getClientCity() {
    const request = await fetch(this.url + "/client");
    return await request.text();
  }

  async getCitiesByIds(ids) {
    const request = await fetch(this.url + "/ids/" + ids);
    return await request.json();
  }
}
