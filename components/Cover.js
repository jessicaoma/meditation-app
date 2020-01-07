import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import LogoPlayVideo from '../constants/LogoPlayVideo';

/**
 * @typedef {Object} Props Properties of the component
 * @property {string} [color] Backgroud color for the image, default value Colors.primary
 * @property {import('react-native').ImageSourcePropType} source Source of the image to render
 * @property {(event: import('react-native').GestureResponderEvent) => void} [onPress] Handle press event
 */

/**
 * A image cover
 * @param {Props} props Props sended to the component
 */
const Cover = ({source, onPress, color}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={source}
        style={[styles.image, {backgroundColor: color || Colors.primary}]}
      />
      <View style={styles.playicon} onPress={onPress}><LogoPlayVideo /></View>
    </TouchableOpacity>
  );
};

export default Cover;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.22,
    
  },
  image: {
    width: Dims.window.width - Dims.bigSpace - 6,
    minHeight: Dims.window.width -  Dims.bigSpace - 6,
    resizeMode: 'cover',
    borderRadius: 20,
    marginBottom: Dims.bigSpace,
    position: 'relative',
  },
  playicon: {
    position: 'absolute',
    zIndex: 2,
    top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
  }
});
