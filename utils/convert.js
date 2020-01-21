/** @param {number} number */
const padWithZero = number => {
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
 * Convertir una fecha al formato 'yyyy-MM-dd'
 * @param {Date} date
 */
export const dateToStrYYYYMMDD = date => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}-${month > 9 ? month : '0' + month}-${
    day > 9 ? day : '0' + day
  }`;
};
