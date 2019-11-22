import {createStackNavigator} from 'react-navigation';

import MeditacionScreen from '../screens/MeditacionScreen';
import AudiolibroScreen from '../screens/AudiolibroScreen';
import ReflexionScreen from '../screens/ReflexionScreen';
import EmocionesNavigator from './EmocionesNavigator';
import ViajeNavigator from './ViajeNavigator';
import PerfilNavigation from './PerfilNavigation';

const MainNavigator = createStackNavigator(
  {
    PerfilDrawer: {screen: PerfilNavigation, navigationOptions: {header: null}},
    Meditacion: {
      screen: MeditacionScreen,
      //navigationOptions: {},
    },
    Audiolibro: {screen: AudiolibroScreen, navigationOptions: {}},
    Reflexion: ReflexionScreen,
    EmocionesStack: {
      screen: EmocionesNavigator,
      navigationOptions: {
        title: '¿Cómo me siento?',
      },
    },
    ViajeStack: {
      screen: ViajeNavigator,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTitleStyle: {
        color: '#030303',
        fontFamily: 'MyriadPro-Semibold',
      },
    },
  },
);

export default MainNavigator;
