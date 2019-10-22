import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

/**
 * @typedef {Object} Props Properties of the component
 * @property {import('react-native').StyleProp<import('react-native').ViewStyle>} [style] Extra custom style for the component
 * @property {any} children Elements that render inside the component
 * @property {(event: any) => void} [onPress] Callback used when the component is Press
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
    borderRadius: 20,
    backgroundColor: Colors.primary,
    maxWidth: 'auto',
    minHeight: 75,
    minWidth: 300,
    justifyContent: 'space-between',
    marginBottom: 22,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 15,
  },
});
