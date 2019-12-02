const BASE_API =
  process.env.NODE_ENV === 'production'
    ? 'http://okotesting-001.azurewebsites.net/api/'
    : 'http://localhost:5000/api/';

class Api {
  /** @return {Promise<import("./types").Meditación[]>} */
  async getMeditaciones() {
    const query = await fetch(`${BASE_API}meditaciones`);
    const data = await query.json();
    return data;
  }

  /** @returns {Promise<import("./types").Audiolibro[]>} */
  async getAudiolibros() {
    const query = await fetch(`${BASE_API}audiolibros`);
    const data = await query.json();
    return data;
  }

  /** @return {Promise<import("./types").AngelMensaje>} */
  async getAngelMessage() {
    const query = await fetch(`${BASE_API}angelmessage`);
    const data = await query.json();
    return data;
  }

  /** @return {Promise<import("./types").Categoria[]>} */
  async getCategorias() {
    const query = await fetch(`${BASE_API}categorias`);
    const data = await query.json();
    return data;
    //return catDB;
  }

  /**
   * @param {string} categoriaId
   * @return {Promise<import("./types").Viaje[]>} */
  async getViajesCategoria(categoriaId, user) {
    // eslint-disable-next-line no-undef
    const myHeaders = new Headers({from: user});
    const query = await fetch(`${BASE_API}viajes/categoria/${categoriaId}`, {
      headers: myHeaders,
    });
    const data = await query.json();
    return data;
  }
}

export default new Api();
