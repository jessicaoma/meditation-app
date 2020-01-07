// @ts-nocheck
import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import LogoPlayVideo from '../constants/LogoPlayVideo';
/**
 * @typedef {Object} Props
 * @prop {boolean} isShow True to show the botton
 * @prop {(event: import('react-native').GestureResponderEvent) => void} onPress Callback to press event
 */
/**
 * Generic playVideoButton
 * @param {Props} props Props sended to the component
 */
export default function PlayVideoButton({isShow, onPress}) {
  //TODO cambiar la validacion pues ya no se usa expo snack
  const envProd = process.env.NODE_ENV === 'production';
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.center, isShow ? styles.show : styles.hidden]}>
        <LogoPlayVideo style={[styles.floatCenterCenter]}  />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  floatCenterCenter: {
    width: 60,
    height: 38,
  },
  hidden: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
});
