import {createStackNavigator} from 'react-navigation';
import MeditacionScreen from '../screens/MeditacionScreen';
import MeditacionIntroScreen from '../screens/MeditacionIntroScreen';
import AudiolibroScreen from '../screens/AudiolibroScreen';
import ReflexionScreen from '../screens/ReflexionScreen';
import EmocionesNavigator from './EmocionesNavigator';
import ViajeNavigator from './ViajeNavigator';
import PerfilNavigation from './PerfilNavigation';
import TutorialScreen from '../screens/TutorialScreen';
import BienvenidaScreen from '../screens/BienvenidaScreen';
import CancionesScreen from '../screens/CancionesScreen';
import CancionScreen from '../screens/CancionScreen';

const MainNavigator = createStackNavigator(
  {
    PerfilDrawer: {screen: PerfilNavigation, navigationOptions: {header: null}},
    Meditacion: {
      screen: MeditacionScreen,
    },
    MeditacionIntro: {
      screen: MeditacionIntroScreen,
    },
    Audiolibro: {screen: AudiolibroScreen},
    Reflexion: ReflexionScreen,
    EmocionesStack: {
      screen: EmocionesNavigator,
      navigationOptions: {
        title: '¿Cómo me siento?',
        headerTitleStyle: {
          color: '#030303',
          fontFamily: 'MyriadPro-Semibold',
        },
      },
    },
    ViajeStack: {
      screen: ViajeNavigator,
      navigationOptions: {
        header: null,
      },
    },
    Canciones: {
      screen: CancionesScreen,
      navigationOptions: {
        title: 'Música',
      },
    },
    Cancion: CancionScreen,
    Tutorial: TutorialScreen,
    Bienvenida: BienvenidaScreen,
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
