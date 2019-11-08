import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';

/**
 * @typedef {Object} Props Properties of the component
 * @property {string} [color] Backgroud color for the image, default value Colors.primary
 * @property {import('react-native').ImageSourcePropType} source Source of the image to render
 * @property {string} resizeMode Determines how to resize the image
 * @property {any} [children] Children component that has is own render
 */

/**
 * Layout for screen that requiere a background image
 * @param {Props} props Props sended to the component
 */
const ScreenBg = ({source, color, resizeMode, children}) => {
  return (
    <View>
      <Image
        source={source}
        style={[
          StyleSheet.absoluteFill,
          {
            resizeMode: resizeMode,
            backgroundColor: color || Colors.primary,
          },
        ]}
      />
      <View style={styles.container}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default ScreenBg;
