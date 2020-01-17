/**
 * @typedef {Object} AngelMensaje
 * @prop {string} titulo Nombre del ángel
 * @prop {string} mensaje Mensaje del angel
 *
 * @typedef {Object} Categoria
 * @prop {string} key Identificador
 * @prop {string} titulo Título
 * @prop {string} [imagenPrevia] Imagen previa de la introcucción
 * @prop {string} [media] Ruta del video introductorio
 * @prop {string} [imagenFondo] Fondo de la categoria
 * @prop {string} color Color caracteristico de la categoria
 * @prop {string} imagenLista Imagen para la lista
 * @prop {Viaje[]} [Viajes] Lista de viajes
 *
 * @typedef {Object} Viaje
 * @prop {string} key Identificador
 * @prop {string} titulo Título
 * @prop {string} categoriaId Categoria padre
 * @prop {string} imagenFondo Fondo del viaje
 * @prop {string} color Color caracteristico de la categoria padre
 * @prop {enumStatus} estado Estatus del viaje
 * @prop {boolean} isFree Es gratuito o no
 * @prop {Paso[]} [pasos] Lista de pasos en el viajes
 *
 * @typedef Paso
 * @prop {string} id
 * @prop {string} title
 * @prop {enumStatus} status
 * @prop {string} type
 *
 * @typedef {Object} Meditación
 * @prop {string} key Identificador
 * @prop {string} titulo Título
 * @prop {string} media Ruta del audio correspondiente a la meditación
 * @prop {string} imagenFondo Fondo de la meditación
 * @prop {string} color Color caracteristico de la meditación
 * @prop {string} imagenLista Imagen para la lista
 * @prop {boolean} isFree Es gratuito o no
 *
 * @typedef {Object} Canción
 * @prop {string} key Identificador
 * @prop {string} titulo Título
 * @prop {string} media Ruta del audio correspondiente a la meditación
 * @prop {string} imagenFondo Fondo de la meditación
 * @prop {string} color Color caracteristico de la meditación
 * @prop {string} imagenLista Imagen para la lista
 * @prop {boolean} isFree Es gratuito o no
 *
 * @typedef {Object} Audiolibro
 * @prop {string} key Identificador
 * @prop {string} titulo Título
 * @prop {string} media Ruta del audio correspondiente al Audiolibro
 * @prop {string} imagenFondo Fondo del Audiolibro
 * @prop {string} color Color caracteristico del Audiolibro
 * @prop {string} imagenLista Imagen para la lista
 * @prop {string} progreso Indica hasta que punto se ha reproducido
 * @prop {boolean} isFree Es gratuito o no
 *
 * @typedef {Object} LoNuevo
 * @prop {string} key Identificador
 * @prop {enumLoNuevo} tipo Tipo de registro asociado
 * @prop {Audiolibro} audiolibro Audiolibro asociada
 * @prop {Canción} cancion Canción asociada
 * @prop {Meditación} meditacion Meditación asociada
 * @prop {Viaje} viaje Viaje asociado
 *
 * @typedef {Object} Reflexión
 * @prop {string} titulo
 * @prop {string} imagenFondo
 * @prop {string} imagenPrevia
 * @prop {string} color
 * @prop {string} media
 * @prop {string} texto
 *
 * @typedef {Object} Video
 * @prop {string} titulo Título
 * @prop {string} media Ruta del audio correspondiente a la meditación
 * @prop {string} imagenFondo Fondo de la meditación
 * @prop {string} color Color caracteristico de la meditación
 *
 * @typedef {Object} Emoción
 * @prop {string} key Identificador
 * @prop {string} titulo
 * @prop {string} descripcion
 * @prop {string} oracion
 * @prop {string} imagenFondo
 * @prop {string} header
 * @prop {string} footer
 * @prop {number} headerH
 * @prop {number} footerH
 * @prop {import('react-native').ImageSourcePropType} imagen
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

/**
 * Enum for lonuevo type.
 * @readonly
 * @enum {number}
 */
export const enumLoNuevo = {
  /** Value 0 */
  viaje: 0,
  /** Value 1 */
  meditacion: 1,
  /** Value 2 */
  cancion: 2,
  /** Value 3 */
  audiolibro: 3,
};
