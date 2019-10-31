const BASE_API = 'http://apikarimtempletest.azurewebsites.net/api/';

class Api {
  async getMeditaciones() {
    const query = await fetch(`${BASE_API}meditaciones`);
    const data = await query.json();
    return data;
  }

  async getAudiolibros() {
    const query = await fetch(`${BASE_API}audiolibros`);
    const data = await query.json();
    return data;
  }
}

export default new Api();