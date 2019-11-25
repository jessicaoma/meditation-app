// @ts-nocheck
import React from 'react';
import {StyleSheet, Image} from 'react-native';

/**
 * @typedef {Object} Props
 * @property {string} name Name of the Tab Icon
 * @property {import('react-native').ImageStyle} [styleImage] Indicate that the icon selected
 * @property {string} [tintColor] Color to used in the icon
 */

/**
 * Tab Bar Icon Component
 * @param {Props} props
 */
export default function TabBarIcon({name, styleImage, tintColor}) {
  function getSource() {
    //TODO cambiar la validacion pues ya no se usa expo snack
    const envProd = process.env.NODE_ENV === 'production';
    switch (name) {
      case 'viajes':
        return envProd
          ? {
              uri:
                'http://okoconnect.com/karim/assets/images/iconsNavigations/iconViajes.png',
            }
          : require('../assets/images/iconsNavigations/iconViajes.png');
      case 'meditar':
        return envProd
          ? {
              uri:
                'http://okoconnect.com/karim/assets/images/iconsNavigations/iconMeditar.png',
            }
          : require('../assets/images/iconsNavigations/iconMeditar.png');
      case 'audiolibros':
        return envProd
          ? {
              uri:
                'http://okoconnect.com/karim/assets/images/iconsNavigations/iconLibros.png',
            }
          : require('../assets/images/iconsNavigations/iconLibros.png');
      case 'angel':
        return envProd
          ? {
              uri:
                'http://okoconnect.com/karim/assets/images/iconsNavigations/iconAngel.png',
            }
          : require('../assets/images/iconsNavigations/iconAngel.png');
      case 'perfil':
        return envProd
          ? {
              uri: 'http://okoconnect.com/karim/assets/images/iconPerfil2.png',
            }
          : require('../assets/images/iconPerfil2.png');
      case 'MisEmociones':
        return envProd
          ? {
              uri:
                'http://okoconnect.com/karim/assets/images/menuPerfil/emociones.png',
            }
          : require('../assets/images/menuPerfil/emociones.png');
      case 'ViajesCompletados':
        return envProd
          ? {
              uri:
                'http://okoconnect.com/karim/assets/images/menuPerfil/viajescompletados.png',
            }
          : require('../assets/images/menuPerfil/viajescompletados.png');
      case 'MiDiario':
        return envProd
          ? {
              uri:
                'http://okoconnect.com/karim/assets/images/menuPerfil/diario.png',
            }
          : require('../assets/images/menuPerfil/diario.png');
      case 'MisMeditaciones':
        return envProd
          ? {
              uri:
                'http://okoconnect.com/karim/assets/images/menuPerfil/meditaciones.png',
            }
          : require('../assets/images/menuPerfil/meditaciones.png');
      case 'Premium':
        return envProd
          ? {
              uri:
                'http://okoconnect.com/karim/assets/images/menuPerfil/premium.png',
            }
          : require('../assets/images/menuPerfil/premium.png');
      default:
        return envProd
          ? {
              uri:
                'http://okoconnect.com/karim/assets/images/iconsNavigations/iconInicio.png',
            }
          : require('../assets/images/iconsNavigations/iconInicio.png');
    }
  }

  return (
    <Image
      source={getSource()}
      style={[
        styles.icon,
        {
          tintColor: tintColor,
        },
        styleImage,
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
