import {dateToStrYYYYMMDD} from './convert';
import {envRemoto} from './types';

const BASE_API = envRemoto
  ? //? 'http://okotesting-001.azurewebsites.net/api/'
    'http://50.63.13.57:501/api/'
  : 'http://localhost:5000/api/';

class Api {
  /** Consulta las meditaciones
   * @param {string} token Token de Autorización
   * @return {Promise<import("./types").Meditación[] | {errors: any}>} */
  async getMeditaciones(token) {
    let query;
    try {
      query = await fetch(`${BASE_API}meditaciones`, {
        headers: {Authorization: `Bearer  ${token}`},
      });
    } catch (error) {
      return {
        errors: {
          network: 'Error de Red',
        },
      };
    }
    if (query.status < 300) {
      return await query.json();
    } else {
      return {
        errors: {
          message: 'Datos inválidos',
        },
      };
    }
  }

  /** Consulta las meditaciones
   * @param {number} itemId Id de la meditacion
   * @param {number} progreso duracion de la meditacion
   * @param {string} token Token de Autorización
   */
  async postDiarioMeditacion(itemId, progreso, token) {
    let query;
    try {
      query = await fetch(`${BASE_API}diario/meditacion`, {
        method: 'POST',
        body: JSON.stringify({
          itemId,
          fecha: dateToStrYYYYMMDD(new Date()),
          progreso,
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
    if (query.status < 300) {
      return;
    } else {
      return {
        errors: {
          message: 'Datos inválidos',
        },
      };
    }
  }

  /**
   * @param {string} token Token de Autorización
   * @return {Promise<import("./types").MeditacionesCompletadas | {errors: any}>} */
  async getMeditacionesCompletadas(token) {
    let query;
    try {
      query = await fetch(`${BASE_API}meditaciones/completadas`, {
        headers: {Authorization: `Bearer  ${token}`},
      });
    } catch (error) {
      return {
        errors: {
          network: 'Error de Red',
        },
      };
    }
    if (query.status < 300) {
      return await query.json();
    } else {
      return {
        errors: {
          message: 'Datos inválidos',
        },
      };
    }
  }

  /**
   * @param {string} token Token de Autorización
   * @returns {Promise<import("./types").Audiolibro[] | {errors: any}>}
   */
  async getAudiolibros(token) {
    let query;
    try {
      query = await fetch(`${BASE_API}audiolibros`, {
        headers: {Authorization: `Bearer  ${token}`},
      });
    } catch (error) {
      return {
        errors: {
          network: 'Error de Red',
        },
      };
    }
    if (query.status < 300) {
      return await query.json();
    } else {
      return {
        errors: {
          message: 'Datos inválidos',
        },
      };
    }
  }

  /**
   * @param {number} itemId Id del audiolibro
   * @param {number} progreso Avance en el audiolibro
   * @param {import('./types').enumStatus} estado Estatus a actualizar del audiolibro
   * @param {string} token Token de Autorización
   */
  async putDiarioAudiolibro(itemId, progreso, estado, token) {
    let query;
    try {
      query = await fetch(`${BASE_API}diario/audiolibro`, {
        method: 'PUT',
        body: JSON.stringify({
          itemId,
          fecha: dateToStrYYYYMMDD(new Date()),
          estado,
          progreso,
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
    if (query.status < 300) {
      return;
    } else {
      return {
        errors: {
          message: 'Datos inválidos',
        },
      };
    }
  }

  /** @return {Promise<import("./types").CartaDelAngel[]>} */
  async getAngelMessage() {
    const query = await fetch(`${BASE_API}angels/mensaje`);
    const data = await query.json();
    return data;
  }

  /**
   * @param {string} token Token de Autorización
   * @return {Promise<import("./types").Categoria[] | {errors: any}>}
   */
  async getCategorias(token) {
    //const data = await query.json();
    let query;
    try {
      query = await fetch(`${BASE_API}categorias`, {
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
   * @param {number} categoriaId categoria seleccionada
   * @param {string} token Token de Autorización
   * @return {Promise<import("./types").Viaje[] | {errors: any}>} */
  async getViajesCategoria(categoriaId, token) {
    let query;
    try {
      query = await fetch(`${BASE_API}viajes/categoria/${categoriaId}`, {
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
   * @param {string} token Token de Autorización
   * @return {Promise<import("./types").Viaje[] | {errors: any}>}
   */
  async getViajesCompletados(token) {
    let query;
    try {
      query = await fetch(`${BASE_API}viajes/completados`, {
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
   * @param {number} itemId Id del viaje
   * @param {import('./types').enumStatus} estado Estado del paso
   * @param {string} token Token de Autorización
   */
  async putDiarioViaje(itemId, estado, token) {
    let query;
    try {
      query = await fetch(`${BASE_API}diario/viaje`, {
        method: 'PUT',
        body: JSON.stringify({
          itemId,
          fecha: dateToStrYYYYMMDD(new Date()),
          estado,
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
    if (query.status < 300) {
      return;
    } else {
      return {
        errors: {
          message: 'Datos inválidos',
        },
      };
    }
  }

  /**
   * @param {number} itemId Id del paso
   * @param {import('./types').enumStatus} estado Estado del paso
   * @param {string} token Token de Autorización
   */
  async putDiarioPaso(itemId, estado, token) {
    let query;
    try {
      query = await fetch(`${BASE_API}diario/paso`, {
        method: 'PUT',
        body: JSON.stringify({
          itemId,
          fecha: dateToStrYYYYMMDD(new Date()),
          estado,
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
    if (query.status < 300) {
      return;
    } else {
      return {
        errors: {
          message: 'Datos inválidos',
        },
      };
    }
  }

  /**
   * @param {string} token Token de Autorización
   * @return {Promise<import("./types").Viaje[] | {errors: any}>} */
  async getEnProgreso(token) {
    let query;
    try {
      query = await fetch(`${BASE_API}enprogreso`, {
        headers: {Authorization: `Bearer  ${token}`},
      });
    } catch (error) {
      return {
        errors: {
          network: 'Error de Red',
        },
      };
    }
    if (query.status < 300) {
      return await query.json();
    } else {
      return {
        errors: {
          message: 'Datos inválidos',
        },
      };
    }
  }

  /**
   * @param {string} token Token de Autorización
   * @return {Promise<import("./types").Destacado[] | {errors: any}>}
   */
  async getDestacados(token) {
    let query;
    try {
      query = await fetch(`${BASE_API}destacados`, {
        headers: {Authorization: `Bearer  ${token}`},
      });
    } catch (error) {
      return {
        errors: {
          network: 'Error de Red',
        },
      };
    }
    if (query.status < 300) {
      return await query.json();
    } else {
      return {
        errors: {
          message: 'Datos inválidos',
        },
      };
    }
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

  /** Consulta las meditaciones
   * @return {Promise<import("./types").Canción[]>} */
  async getCanciones() {
    const query = await fetch(`${BASE_API}canciones`);
    const data = await query.json();
    return data;
  }

  // /**
  //  * @param {string} viajeId
  //  * @param {string} user usuario activo
  //  * @return {Promise<import("./types").Viaje[]>} */
  // async getPasosDelViaje(viajeId, user) {
  //   const myHeaders = new Headers({from: user});
  //   const query = await fetch(`${BASE_API}pasos/viaje/${viajeId}`, {
  //     headers: myHeaders,
  //   });
  //   const data = await query.json();
  //   return data;
  // }

  /** Busca uno de los siguientes videos (Bienvenida, Tutorial, MeditacionesIntro)
   * @param {string} titulo Titulo del video
   * @returns {Promise<import("./types").Video>}
   */
  async getVideo(titulo) {
    const query = await fetch(`${BASE_API}videos/${titulo}`);
    const data = await query.json();
    return data;
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
    const now = new Date();
    const date = dateToStrYYYYMMDD(now);
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
          fecha: new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
          ).toJSON(),
        };
      } else if (query.status < 500) {
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

  /** Consulta si existe una emoción para el dia
   * @param {string} date Fecha a consultar
   * @param {string} token Token de Autorización
   * @return {Promise<import("./types").Emoción | {errors : Object}>} */
  async getEmocionOfDate(date, token) {
    let query;
    try {
      query = await fetch(`${BASE_API}emociones/registro/${date}`, {
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
    } else if (query.status < 500) {
      return await query.json();
    } else {
      return {
        errors: {
          message: 'Error Interno',
        },
      };
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
      if (query.status < 300) {
        //Salida correcta
        /** @returns {import('./types').Usuario} */
        return await query.json();
      }
      if (query.status < 500) {
        //Salida correcta
        /** @returns {{errors: Array}} */
        return await query.json();
      } else {
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
        /** @returns {import('./types').Usuario} */
        return await query.json();
      } else {
        //TODO agregar los mensajes del API
        /** @returns {{errors: Array}} */
        return await query.json();
        /*{
          errors: {
            message: 'Datos inválidos',
          },
        }*/
      }
    }
    return {};
  }
}

export default new Api();

// TODO proximo a eliminar
export const user = 'asdf';
