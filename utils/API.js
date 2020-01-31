import {dateToStrYYYYMMDD} from './convert';

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
    const myHeaders = new Headers({from: user});
    const query = await fetch(`${BASE_API}audiolibros`, {
      headers: myHeaders,
    });
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

  /**
   * @param {string} user
   * @return {Promise<import("./types").Viaje[]>} */
  async getViajesEnProgreso(user) {
    const myHeaders = new Headers({from: user});
    const query = await fetch(`${BASE_API}viajes/enprogreso`, {
      headers: myHeaders,
    });
    const data = await query.json();
    return data;
  }

  /** @return {Promise<import("./types").LoNuevo[]>} */
  async getLoNuevo() {
    //const myHeaders = new Headers({from: user});
    const query = await fetch(`${BASE_API}lonuevo`, {
      //headers: myHeaders,
    });
    const data = await query.json();
    return data;
  }

  /** @return {Promise<import("./types").Reflexión>} */
  async getReflexionDelDia() {
    //const myHeaders = new Headers({from: user});
    const query = await fetch(`${BASE_API}reflexion/deldia`, {
      //headers: myHeaders,
    });
    const data = await query.json();
    return data;
  }

  /**
   * @param {string} user
   * @return {Promise<import("./types").Viaje[]>} */
  async getViajesCompletados(user) {
    const myHeaders = new Headers({from: user});
    const query = await fetch(`${BASE_API}viajes/completados`, {
      headers: myHeaders,
    });
    const data = await query.json();
    return data;
  }

  /** Consulta las meditaciones
   * @return {Promise<import("./types").Canción[]>} */
  async getCanciones() {
    const query = await fetch(`${BASE_API}canciones`);
    const data = await query.json();
    return data;
  }

  /** Consulta las meditaciones
   * @return {Promise<import("./types").Emoción[]>} */
  async getEmociones() {
    const query = await fetch(`${BASE_API}emociones`);
    const data = await query.json();
    return data;
  }

  /** Consulta las meditaciones
   * @param {string} itemId Id de la meditacion
   * @param {number} progreso duracion de la meditacion
   */
  async postDiarioMeditacion(itemId, progreso) {
    await fetch(`${BASE_API}diario/meditacion`, {
      method: 'POST',
      body: JSON.stringify({
        itemId: itemId,
        date: dateToStrYYYYMMDD(new Date()),
        progreso: progreso,
        usuario: user,
      }),
      headers: {'Content-Type': 'application/json'},
    });
  }

  /**
   * @param {string} user
   * @return {Promise<import("./types").MeditacionesCompletadas>} */
  async getMeditacionesCompletadas(user) {
    const myHeaders = new Headers({from: user});
    const query = await fetch(`${BASE_API}meditaciones/completadas`, {
      headers: myHeaders,
    });
    const data = await query.json();
    return data;
  }

  /**
   * @param {string} viajeId
   * @param {string} user
   * @return {Promise<import("./types").Viaje[]>} */
  async getPasosDelViaje(viajeId, user) {
    const myHeaders = new Headers({from: user});
    const query = await fetch(`${BASE_API}pasos/viaje/${viajeId}`, {
      headers: myHeaders,
    });
    const data = await query.json();
    return data;
  }

  /** Consulta las meditaciones
   * @param {string} itemId Id de la meditacion
   * @param {number} progreso duracion de la meditacion
   * @param {import('./types').enumStatus} progreso duracion de la meditacion
   */
  async putDiarioAudiolibro(itemId, progreso, estado) {
    await fetch(`${BASE_API}diario/audiolibro`, {
      method: 'PUT',
      body: JSON.stringify({
        itemId: itemId,
        date: dateToStrYYYYMMDD(new Date()),
        progreso: progreso,
        usuario: user,
        estado,
      }),
      headers: {'Content-Type': 'application/json'},
    });
  }
}

export default new Api();

// TODO cambiar forma de obtener el correo del usuario 'example@example.com'
export const user = 'asdf';
