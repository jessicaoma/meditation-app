import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import ScalableText from 'react-native-text';

/**
 * @typedef {Object} Props Properties of the component
 * @property {import('react-native').StyleProp<import('react-native').ViewStyle>} [style] Extra custom style for the component
 * @property {React.ReactNode} children Elements that render inside the component
 * @property {(event: import('react-native').GestureResponderEvent) => void} [onPress] Handle press event
 */

/**
 * Generic Buttom
 * @param {Props} props Props sended to the component
 */
export default function Buttom({style, children, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.contenedor, style]}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: Colors.primary,
    maxWidth: 'auto',
    minHeight: 80,
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 30,
  },
});
