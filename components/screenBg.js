import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';

/**
 * @typedef {Object} Props Properties of the component
 * @property {string} [color] Backgroud color for the image, default value Colors.primary
 * @property {import('react-native').ImageSourcePropType} source Source of the image to render
 * @property {any} [children] Children component that has is own render
 */

/**
 * Layout for screen that requiere a background image
 * @param {Props} props Props sended to the component
 */
const ScreenBg = ({source, color, children}) => {
  return (
    <ImageBackground
      source={source}
      style={styles.container}
      imageStyle={(styles.image, {backgroundColor: color || Colors.primary})}>
      <View style={styles.container}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  image: {
    resizeMode: 'cover',
  },
});

export default ScreenBg;
