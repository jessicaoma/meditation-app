import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';

/**
 * Generic playVideoButton
 * @param {Object} props Props sended to the component
 */
export default function PlayVideoButton({isShow, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.center,
          {
            display: isShow ? 'flex' : 'none',
          },
        ]}>
        <Image
          source={require('../assets/images/iconsNavigations/iconVideo.png')}
          style={[styles.floatCenterCenter]}
        />
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
    //activar si quiere verificar la ubicación del componente
    //borderColor: '#00F',
    //borderWidth: 1,
  },
  floatCenterCenter: {
    width: 60,
    height: 38,
  },
});
