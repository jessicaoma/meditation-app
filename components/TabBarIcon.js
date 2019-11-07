import React from 'react';
import {StyleSheet, Image} from 'react-native';

/**
 * @typedef {Object} Props
 * @property {string} name Name of the Tab Icon
 * @property {boolean} [focused] Indicate that the icon selected
 * @property {string} tintColor Color to used in the icon
 */

/**
 * Tab Bar Icon Component
 * @param {Props} props
 */
export default function TabBarIcon({name, focused, tintColor}) {
  let source = null;
  switch (name) {
    case 'viajes':
      source = require('../assets/images/iconsNavigations/iconViajes.png');
      break;
    case 'meditar':
      source = require('../assets/images/iconsNavigations/iconMeditar.png');
      break;
    case 'audiolibros':
      source = require('../assets/images/iconsNavigations/iconLibros.png');

      break;
    case 'angel':
      source = require('../assets/images/iconsNavigations/iconAngel.png');
      break;
    default:
      source = require('../assets/images/iconsNavigations/iconInicio.png');
      break;
  }

  return (
    <Image
      source={source}
      style={[
        styles.icon,
        {
          tintColor: tintColor,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 48,
    height: 34,
    opacity: 1,
  },
});
