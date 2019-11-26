const BASE_API = 'http://okotesting-001.azurewebsites.net/api/';

/**
 * @typedef {Object} AngelMensaje
 * @prop {string} id Identificador
 * @prop {string} title Nombre del ángel
 * @prop {string} sentence Mensaje del angel
 *
 * @typedef {Object} Categoria
 * @prop {string} id Identificador
 * @prop {string} title Título
 * @prop {string} [cover] Imagen previa de la introcucción
 * @prop {string} [media] Ruta del video introductorio
 * @prop {string} [backgroundImage] Fondo de la categoria
 * @prop {string} color Color caracteristico de la categoria
 * @prop {string} itemImage Imagen para la lista
 * @prop {string} [journeys] Lista de viajes hijos
 *
 * @typedef {Object} Meditación
 * @prop {string} id Identificador
 * @prop {string} title Título
 * @prop {string} intro Video previo a la meditación
 * @prop {string} media Ruta del audio correspondiente a la meditación
 * @prop {string} backgroundImage Fondo de la meditación
 * @prop {string} color Color caracteristico de la meditación
 * @prop {string} itemImage Imagen para la lista
 * @prop {string} isFree Lista de viajes hijos
 *
 * @typedef {Object} Audiolibro
 * @prop {string} id Identificador
 * @prop {string} title Título
 * @prop {string} media Ruta del audio correspondiente al Audiolibro
 * @prop {string} backgroundImage Fondo del Audiolibro
 * @prop {string} color Color caracteristico del Audiolibro
 * @prop {string} itemImage Imagen para la lista
 * @prop {string} progress Indica hasta que punto se ha reproducido
 * @prop {string} isFree Lista de viajes hijos
 */

class Api {
  /** @return {Promise<Meditación[]>} */
  async getMeditaciones() {
    const query = await fetch(`${BASE_API}meditaciones`);
    const data = await query.json();
    return data;
  }

  /** @returns {Promise<Audiolibro[]>} */
  async getAudiolibros() {
    const query = await fetch(`${BASE_API}audiolibros`);
    const data = await query.json();
    return data;
  }

  /** @return {Promise<AngelMensaje>} */
  async getAngelMessage() {
    const query = await fetch(`${BASE_API}angelmessage`);
    const data = await query.json();
    return data;
  }

  /** @return {Promise<Categoria[]>} */
  async getCategorias() {
    const query = await fetch(`${BASE_API}categorias`);
    const data = await query.json();
    return data;
    //return catDB;
  }
}

export default new Api();
