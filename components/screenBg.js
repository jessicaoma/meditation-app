import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';

/**
 * @typedef {Object} Props Properties of the component
 * @property {string} [color] Backgroud color for the image, default value Colors.primary
 * @property {import('react-native').ImageSourcePropType} [source] Source of the image to render
 * @property {import('react').ReactNode} [children] Children component that has is own render
 * @property {import('react-native').ViewStyle} [styleView] Extra style to the View compoenet
 * @property {import('react-native').ImageStyle} [styleImage] Extra style to the Image componet
 * @property {(event: import('react-native').NativeSyntheticEvent) => void} [onLoad] Invoked when load image completes successfully
 */

/**
 * Layout for screen that requiere a background image
 * @param {Props} props Props sended to the component
 */
const ScreenBg = ({source, color, styleView, styleImage, children, onLoad}) => {
  return (
    <View style={[styles.container, styleView]}>
      <Image
        source={source}
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: color || Colors.primary,
          },
          styleImage,
        ]}
        onLoad={onLoad}
      />
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    //height: '100%',
  },
});

export default ScreenBg;
