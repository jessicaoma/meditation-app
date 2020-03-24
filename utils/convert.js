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
