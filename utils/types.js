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
 * @prop {Viaje[]} [journeys] Lista de viajes
 *
 * @typedef {Object} Viaje
 * @prop {string} id Identificador
 * @prop {string} title Título
 * @prop {string} categoriaId Categoria padre
 * @prop {string} backgroundImage Fondo del viaje
 * @prop {string} color Color caracteristico de la categoria padre
 * @prop {enumStatus} status Estatus del viaje
 * @prop {boolean} isFree Es gratuito o no
 * @prop {Paso[]} [steps] Lista de pasos en el viajes
 *
 * @typedef Paso
 * @prop {string} id
 * @prop {string} title
 * @prop {enumStatus} status
 * @prop {string} type
 *
 * @typedef {Object} Meditación
 * @prop {string} id Identificador
 * @prop {string} title Título
 * @prop {string} intro Video previo a la meditación
 * @prop {string} media Ruta del audio correspondiente a la meditación
 * @prop {string} backgroundImage Fondo de la meditación
 * @prop {string} color Color caracteristico de la meditación
 * @prop {string} itemImage Imagen para la lista
 * @prop {boolean} isFree Es gratuito o no
 *
 * @typedef {Object} Audiolibro
 * @prop {string} id Identificador
 * @prop {string} title Título
 * @prop {string} media Ruta del audio correspondiente al Audiolibro
 * @prop {string} backgroundImage Fondo del Audiolibro
 * @prop {string} color Color caracteristico del Audiolibro
 * @prop {string} itemImage Imagen para la lista
 * @prop {string} progress Indica hasta que punto se ha reproducido
 * @prop {boolean} isFree Es gratuito o no
 */

/**
 * Enum for status.
 * @readonly
 * @enum {number}
 */
export const enumStatus = {
  /** Value 0 */
  todo: 0,
  /** Value 1 */
  doing: 1,
  /** Value 2 */
  done: 2,
};
