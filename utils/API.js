/* eslint-disable no-undef */
import {dateToStrYYYYMMDD} from './convert';
import {envRemoto} from './types';

const BASE_API = envRemoto
  ? 'http://okotesting-001.azurewebsites.net/api/'
  : 'http://localserver.com:5000/api/';

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

  /** @return {Promise<import("./types").CartaDelAngel[]>} */
  async getAngelMessage() {
    const query = await fetch(`${BASE_API}angels/mensaje`);
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
   * @param {string} user usuario activo
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
   * @param {string} user usuario activo
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
    const query = await fetch(`${BASE_API}destacados`, {
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
   * @param {string} user usuario activo
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
   * @param {string} usuario usuario activo
   */
  async postDiarioMeditacion(itemId, progreso, usuario = user) {
    await fetch(`${BASE_API}diario/meditacion`, {
      method: 'POST',
      body: JSON.stringify({
        itemId,
        fecha: dateToStrYYYYMMDD(new Date()),
        progreso,
        usuario,
      }),
      headers: {'Content-Type': 'application/json'},
    });
  }

  /**
   * @param {string} user usuario activo
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
   * @param {string} user usuario activo
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
   * @param {string} usuario usuario activo
   * @param {import('./types').enumStatus} progreso duracion de la meditacion
   */
  async putDiarioAudiolibro(itemId, progreso, estado, usuario = user) {
    await fetch(`${BASE_API}diario/audiolibro`, {
      method: 'PUT',
      body: JSON.stringify({
        itemId,
        fecha: dateToStrYYYYMMDD(new Date()),
        progreso,
        usuario,
        estado,
      }),
      headers: {'Content-Type': 'application/json'},
    });
  }

  /** Busca uno de los siguientes videos (Bienvenida, Tutorial, MeditacionesIntro)
   * @param {string} titulo Titulo del video
   * @returns {Promise<import("./types").Video>}
   */
  async getVideo(titulo) {
    const query = await fetch(`${BASE_API}videos/${titulo}`);
    const data = await query.json();
    return data;
  }

  /**
   * @param {string} itemId Id del paso
   * @param {import('./types').enumStatus} estado Estado del paso
   * @param {{preguntaId: string, texto: string }[]} respuestas Respuestas dadas en el PasoF
   * @param {string} usuario usuario activo
   */
  async putDiarioPaso(itemId, estado, respuestas, usuario = user) {
    await fetch(`${BASE_API}diario/paso`, {
      method: 'PUT',
      body: JSON.stringify({
        itemId,
        fecha: dateToStrYYYYMMDD(new Date()),
        estado,
        respuestas,
        usuario,
      }),
      headers: {'Content-Type': 'application/json'},
    });
  }

  /**
   * @param {string} itemId Id del viaje
   * @param {import('./types').enumStatus} estado Estado del paso
   * @param {string} usuario usuario activo
   */
  async putDiarioViaje(itemId, estado, usuario = user) {
    await fetch(`${BASE_API}diario/viaje`, {
      method: 'PUT',
      body: JSON.stringify({
        itemId,
        fecha: dateToStrYYYYMMDD(new Date()),
        estado,
        usuario,
      }),
      headers: {'Content-Type': 'application/json'},
    });
  }

  /**
   * @param {string} emocionId Id de la emocion
   * @param {string} usuario usuario activo
   */
  async postRegistroEmocion(emocionId, usuario = user) {
    await fetch(`${BASE_API}emociones/registro`, {
      method: 'POST',
      body: JSON.stringify({
        emocionId,
        fecha: dateToStrYYYYMMDD(new Date()),
        usuario,
      }),
      headers: {'Content-Type': 'application/json'},
    });
  }
  /**
   * @param {string} usuario usuario activo
   * @return {Promise<import('./types').MisEmociones>} Registros
   */
  async getRegistroEmociones(usuario = user) {
    const myHeaders = new Headers({from: usuario});
    const query = await fetch(`${BASE_API}emociones/registro`, {
      headers: myHeaders,
    });
    const data = await query.json();
    return data;
  }

  /**
   * @param {string} usuario usuario activo
   * @return {Promise<import('./types').Diario[]>} Registros
   */
  async getBitacora(usuario = user) {
    const myHeaders = new Headers({from: usuario});
    const query = await fetch(`${BASE_API}diario`, {
      headers: myHeaders,
    });
    const data = await query.json();
    return data;
  }
}

export default new Api();

// TODO cambiar forma de obtener el correo del usuario 'example@example.com'
export const user = 'asdf';
