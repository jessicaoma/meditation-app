// @ts-nocheck
import React from 'react';
import {Image, View} from 'react-native';
import LogoAppHeader from '../constants/LogoAppHeader';
import LogoApp from '../constants/LogoApp';

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
    <View style={{width: 192,height: 44,}}><LogoAppHeader /></View>
  ) : (
    <View style={{width: 84,height: 90,alignItems: 'center'}}><LogoApp /></View>
  );
};

export default Logo;
