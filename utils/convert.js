/** @param {number} number */
export const padWithZero = number => {
  const string = number.toString();
  if (number < 10) {
    return '0' + string;
  }
  return string;
};

/**
 * Convertir milisegundos a "mm:ss"
 * @param {number} millis
 * */
export const millisToMinSeg = millis => {
  let totalSeconds = millis / 1000;
  let seconds = Math.floor(totalSeconds % 60);
  let minutes = Math.floor(totalSeconds / 60);

  return padWithZero(minutes) + ':' + padWithZero(seconds);
};

/**
 * Convertir milisegundos a hora con 2 decimales
 * @param {number} millis
 * */
export const millisToHours = millis => {
  let hours = (millis / (1000 * 60 * 60)).toFixed(2);
  return hours;
};

/**
 * Convertir una fecha al formato 'yyyy-MM-dd'
 * @param {Date} date
 * @returns {string}
 */
export const dateToStrYYYYMMDD = date => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}-${padWithZero(month)}-${padWithZero(day)}`;
};

/**
 *
 * @param {string} color A color on the format Hex6 (#ffffff)
 * @returns {number} Returns the perceived brightness of a color, from 0-255, as defined by https://en.wikipedia.org/wiki/Rec._709
 */
export const getBrightness = function(color) {
  var {r, g, b} = toRgb(color);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 *
 * @param {string} color A color on the format Hex6 (#ffffff)
 * @returns {object} Object compouse of the RGB values
 */
export function toRgb(color) {
  var c = color.substring(1);
  var rgb = parseInt(c, 16);
  var r = (rgb >> 16) & 0xff;
  var g = (rgb >> 8) & 0xff;
  var b = (rgb >> 0) & 0xff;
  return {r, g, b};
}

/**
 *
 * @param {import('@react-navigation/native').NavigationProp<Object>} navigation
 * @returns {string}
 */
export const navigationStacks = navigation => {
  let state = navigation.dangerouslyGetState();
  let parentState = navigation.dangerouslyGetParent();
  let out = '';
  if (parentState !== undefined) {
    out += `(${navigationStacks(parentState)})`;
  }
  out += state.routes.reduce((prev, route) => {
    return prev + route.name + '->';
  }, '');
  return out;
};

/**
 *
 * @param {import('@react-navigation/native').NavigationProp<Object>} navigation
 * @param {string} screen
 * @returns {boolean}
 */
export const existScreenInNavigationStacks = (navigation, screen) => {
  let state = navigation.dangerouslyGetState();
  let parentState = navigation.dangerouslyGetParent();
  let out = state.routes.reduce((prev, route) => {
    return prev || route.name === screen;
  }, false);
  if (parentState !== undefined && !out) {
    out = out || existScreenInNavigationStacks(parentState, screen);
  }
  return out;
};
