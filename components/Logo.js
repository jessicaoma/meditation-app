// @ts-nocheck
import React from 'react';
import {Image} from 'react-native';

/**
 * @typedef {Object} Props
 * @prop {import('react-native').ImageStyle} [style] Style for Logo image
 * @prop {boolean} [isAlternative] Indicated that use the alternative Logo image
 */
/**
 * Component that crear a Logo Image
 * @param {Props} props
 */
const Logo = ({style, isAlternative}) => {
  return !isAlternative ? (
    <Image source={require('../assets/images/logo.png')} style={style} />
  ) : (
    <Image source={require('../assets/images/logo2.png')} style={style} />
  );
};

export default Logo;
