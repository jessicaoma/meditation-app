// @ts-nocheck
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {LogoInicio} from '../constants/LogoInicio';
import {LogoViajes} from '../constants/LogoViajes';
import {LogoPerfil} from '../constants/LogoPerfil';
import {LogoPremium} from '../constants/LogoPremium';
import {LogoAudiolibro} from '../constants/LogoAudiolibro';
import {LogoMeditacion} from '../constants/LogoMeditacion';
import {LogoAngel} from '../constants/LogoAngel';
import {LogoEmociones} from '../constants/LogoEmociones';
import {LogoDiario} from '../constants/LogoDiario';
import {LogoViajesCompletados} from '../constants/LogoViajesCompletados';
import {LogoMisMeditaciones} from '../constants/LogoMisMeditaciones';

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

  function renderIcon() {
    const envProd = process.env.NODE_ENV === 'production';
    switch (name) {
      default:
        return <LogoInicio tintColor={tintColor} />;
      case 'viajes':
        return <LogoViajes tintColor={tintColor} />;
      case 'meditar':
        return <LogoMeditacion tintColor={tintColor} />;
      case 'audiolibros':
        return <LogoAudiolibro tintColor={tintColor} />;
      case 'angel':
        return <LogoAngel tintColor={tintColor} />;
      case 'perfil':
        return <LogoPerfil tintColor={tintColor} />;
      case 'MisEmociones':
        return <LogoEmociones tintColor={tintColor} />;
      case 'ViajesCompletados':
        return <LogoViajesCompletados tintColor={tintColor} />;
      case 'MiDiario':
        return <LogoDiario tintColor={tintColor} />;
      case 'MisMeditaciones':
        return <LogoMisMeditaciones tintColor={tintColor} />;
      case 'Premium':
        return <LogoPremium tintColor={tintColor} />;
    }
  }
  return (
    renderIcon()
  );
}

const styles = StyleSheet.create({
});