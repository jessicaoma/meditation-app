import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  smallSpace: 8,
  regularSpace: 16,
  bigSpace: 24,
  hugeSpace: 32,
};
