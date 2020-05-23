/* eslint-disable no-undef */
import {dateToStrYYYYMMDD} from './convert';
import {envRemoto} from './types';

const BASE_API = envRemoto
  ? //? 'http://okotesting-001.azurewebsites.net/api/'
    'http://50.63.13.57:501/api/'
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
   * @param {number} categoriaId
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
    const query = await fetch(`${BASE_API}enprogreso`, {
      headers: myHeaders,
    });
    const data = await query.json();
    return data;
  }

  /** @return {Promise<import("./types").Destacado[]>} */
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
   * @param {number} itemId Id del paso
   * @param {import('./types').enumStatus} estado Estado del paso
   * @param {string} usuario usuario activo
   */
  async putDiarioPaso(itemId, estado, usuario = user) {
    await fetch(`${BASE_API}diario/paso`, {
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
   * @param {number} itemId Id del viaje
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

  /** Consulta las emociones
   * @param {string} token Token de Autorización
   * @return {Promise<import("./types").Emoción[] | {errors : Object}>} */
  async getEmociones(token) {
    let query;
    try {
      query = await fetch(`${BASE_API}emociones`, {
        headers: {Authorization: `Bearer  ${token}`},
      });
    } catch (error) {
      return {
        errors: {
          network: 'Error de Red',
        },
      };
    }
    if (query.status === 200) {
      return await query.json();
    } else {
      return {
        errors: {
          message: 'Error Interno',
        },
      };
    }
  }

  /**
   * @param {number} emocionId Id de la emocion
   * @param {string} token Token de autorización
   * @return {Promise<{errors?: Object, emocionId?: number, fecha?: string}>}
   */
  async postRegistroEmocion(emocionId, token) {
    let query;
    const date = dateToStrYYYYMMDD(new Date());
    try {
      query = await fetch(`${BASE_API}emociones/registro`, {
        method: 'POST',
        body: JSON.stringify({
          emocionId,
          fecha: date,
        }),
        headers: {
          Authorization: `Bearer  ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return {
        errors: {
          network: 'Error de Red',
        },
      };
    }
    if (query.status >= 200 && query.status < 500) {
      if (query.status < 400) {
        //TODO este metodo debe retornar los datos del metodo /emociones/registro/{fecha}
        //return await query.json();
        return {
          emocionId,
          fecha: date,
        };
      } else {
        return {
          errors: {
            message: 'Datos inválidos',
          },
        };
      }
    }
  }
  /**
   * @param {string} token Token de autorización
   * @return {Promise<import('./types').MisEmociones | {errors : Object} >} Registros
   */
  async getRegistroEmociones(token) {
    let query;
    try {
      query = await fetch(`${BASE_API}emociones/registro`, {
        headers: {Authorization: `Bearer  ${token}`},
      });
    } catch (error) {
      return {
        errors: {
          network: 'Error de Red',
        },
      };
    }
    if (query.status >= 200 && query.status < 500) {
      if (query.status < 400) {
        //TODO este metodo debe retornar los datos del metodo /emociones/registro/{fecha}
        //return await query.json();
        return await query.json();
      } else {
        return {
          errors: {
            message: 'Datos inválidos',
          },
        };
      }
    }
  }

  async registerUser(userData) {
    let query;
    try {
      query = await fetch(`${BASE_API}Account/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
    } catch (error) {
      return {
        errors: {
          network: 'Error de Red',
        },
      };
    }
    if (query.status >= 200 && query.status < 500) {
      if (query.status < 400) {
        return await query.json();
      } else {
        //TODO agregar los mensajes del API
        return {
          errors: {
            message: 'Datos inválidos',
          },
        };
      }
    }
    return {};
  }
  async loginUser(userData) {
    let query;
    try {
      query = await fetch(`${BASE_API}Account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
    } catch (error) {
      return {
        errors: {
          network: 'Error de Red',
        },
      };
    }
    if (query.status >= 200 && query.status < 500) {
      if (query.status < 400) {
        return await query.json();
      } else {
        //TODO agregar los mensajes del API
        return {
          errors: {
            message: 'Datos inválidos',
          },
        };
      }
    }
    return {};
  }
}

export default new Api();

// TODO proximo a eliminar
export const user = 'asdf';
