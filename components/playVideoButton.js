import React from 'react';
import {View, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import Colors from '../constants/Colors';

/**
 * Generic playVideoButton
 * @param {Props} props Props sended to the component
 */
export default function PlayVideoButton({style, children, onPress}) {
  return (
    <ImageBackground source={require('../assets/images/iconsNavigations/iconVideo.png')} style={[styles.floatCenterCenter, style]}>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  floatCenterCenter: {
    position: 'absolute',
    top: '50%',
    transform: `translateX(${'-50%'}) translateY(${'-50%'})`,
    left: '50%',
    width: 60,
    height: 38,
  },
});