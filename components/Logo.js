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
  //TODO cambiar la validacion pues ya no se usa expo snack
  const envProd = process.env.NODE_ENV === 'production';
  return !isAlternative ? (
    <Image
      source={
        envProd
          ? {uri: 'http://okoconnect.com/karim/assets/images/logo.png'}
          : require('../assets/images/logo.png')
      }
      style={style}
    />
  ) : (
    <Image
      source={
        envProd
          ? {uri: 'http://okoconnect.com/karim/assets/images/logo2.png'}
          : require('../assets/images/logo2.png')
      }
      style={style}
    />
  );
};

export default Logo;
