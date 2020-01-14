import React from 'react';
import LogoInicio from '../constants/LogoInicio';
import LogoViajes from '../constants/LogoViajes';
import LogoMeditacion from '../constants/LogoMeditacion';
import LogoAudiolibro from '../constants/LogoAudiolibro';
import LogoAngel from '../constants/LogoAngel';
import LogoPerfil from '../constants/LogoPerfil';
import LogoEmociones from '../constants/LogoEmociones';
import LogoViajesCompletados from '../constants/LogoViajesCompletados';
import LogoDiario from '../constants/LogoDiario';
import LogoMisMeditaciones from '../constants/LogoMisMeditaciones';
import LogoPremium from '../constants/LogoPremium';

/**
 * @typedef {Object} Props
 * @property {string} name Name of the Tab Icon
 * @property {string} [tintColor] Color to used in the icon
 */

/**
 * Tab Bar Icon Component
 * @param {Props} props
 */
export default function TabBarIcon({name, tintColor}) {
  function renderIcon() {
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
  return renderIcon();
}
