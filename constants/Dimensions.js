import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

/**
 * @typedef {Object} Dimension
 * @prop {{width:number, height:number}} window Dimensions of device
 * @prop {boolean} isSmallDevice True if device less that 375
 * @prop {number} smallSpace Space of 8 dp
 * @prop {number} regularSpace Space of 16 dp
 * @prop {number} bigSpace Space of 24 dp
 * @prop {number} hugeSpace Space of 32 dp
 * @prop {number} h1 Font Size 36
 * @prop {number} h2 Font Size 20
 * @prop {number} paragraph Font Size 18
 * @prop {number} bubbleTitle Font Size 15.5
 * @prop {number} bubbleTitleSpacing Letter SpacingFont 1.1
 * @prop {number} inputText Font Size 16
 */

/** @type {Dimension} */
const dimensions = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  smallSpace: 8,
  regularSpace: 16,
  bigSpace: 24,
  hugeSpace: 32,
  h1: 36,
  h2: 20,
  paragraph: 18,
  bubbleTitle: 15.5,
  bubbleTitleSpacing: 1,
  inputText: 16,
};

export default dimensions;
