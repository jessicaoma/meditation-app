import {createStackNavigator} from 'react-navigation';

import MeditacionScreen from '../screens/MeditacionScreen';
import AudiolibroScreen from '../screens/AudiolibroScreen';
import BottomNavigator from './BottomNavigator';
import ReflexionScreen from '../screens/ReflexionScreen';
import EmocionesNavigator from './EmocionesNavigator';
//import ViajesNavigator from './ViajesNavigator';

const MainNavigator = createStackNavigator(
  {
    Main: {screen: BottomNavigator, navigationOptions: {header: null}},
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
    // Viajes: {
    //   screen: ViajesNavigator,
    //   navigationOptions: {
    //     header: null,
    //   },
    // },
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
