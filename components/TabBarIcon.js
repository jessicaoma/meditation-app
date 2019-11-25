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
      source = {uri: 'http://okoconnect.com/karim/assets/images/iconsNavigations/iconViajes.png'};
      break;
    case 'meditar':
      source = {uri: 'http://okoconnect.com/karim/assets/images/iconsNavigations/iconMeditar.png'};
      break;
    case 'audiolibros':
      source = {uri: 'http://okoconnect.com/karim/assets/images/iconsNavigations/iconLibros.png'};
      break;
    case 'angel':
      source = {uri: 'http://okoconnect.com/karim/assets/images/iconsNavigations/iconAngel.png'};
      break;
    case 'perfil':
      source = {uri: 'http://okoconnect.com/karim/assets/images/iconPerfil2.png'};
      break;
    default:
      source = {uri: 'http://okoconnect.com/karim/assets/images/iconsNavigations/iconInicio.png'};
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
