const BASE_API =
  process.env.NODE_ENV === 'production'
    ? 'http://okotesting-001.azurewebsites.net/api/'
    : 'http://localhost:5000/api/';

class Api {
  /** Consulta las meditaciones
   * @return {Promise<import("./types").Meditación[]>} */
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
   * @param {string} user
   * @return {Promise<import("./types").Viaje[]>} */
  async getViajesCategoria(categoriaId, user) {
    const myHeaders = new Headers({from: user});
    const query = await fetch(`${BASE_API}viajes/categoria/${categoriaId}`, {
      headers: myHeaders,
    });
    const data = await query.json();
    return data;
  }

  // /**
  //  * @param {string} user
  //  * @return {Promise<import("./types").Viaje[]>} */
  // async getViajesEnProgreso(user) {
  //   const query = await fetch(`${BASE_API}viajes/enprogreso/${user}`);
  //   const data = await query.json();
  //   return data;
  // }

  // /**
  //  * @param {string} user
  //  * @return {Promise<import("./types").Viaje[]>} */
  // async getViajesCompletadps(user) {
  //   const query = await fetch(`${BASE_API}viajes/completados/${user}`);
  //   const data = await query.json();
  //   return data;
  // }
}

export default new Api();
