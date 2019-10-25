import React from 'react';
import {StyleSheet, Image} from 'react-native';

/**
 * Generic playVideoButton
 * @param {Props} props Props sended to the component
 */
export default function PlayVideoButton({style, children, onPress}) {
  return (
    <Image
      source={require('../assets/images/iconsNavigations/iconVideo.png')}
      style={[styles.floatCenterCenter, style]}
    />
  );
}

const styles = StyleSheet.create({
  floatCenterCenter: {
    width: 60,
    height: 38,
  },
});
