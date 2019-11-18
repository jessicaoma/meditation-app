import {createStackNavigator} from 'react-navigation';

import MeditacionScreen from '../screens/MeditacionScreen';
import AudiolibroScreen from '../screens/AudiolibroScreen';
import BottomNavigator from './BottomNavigator';
import ReflexionScreen from '../screens/ReflexionScreen';
import EmocionesScreen from '../screens/EmocionesScreen';
import EmocionScreen from '../screens/EmocionScreen';

const MainNavigator = createStackNavigator(
  {
    Main: {screen: BottomNavigator, navigationOptions: {header: null}},
    Meditacion: {
      screen: MeditacionScreen,
      navigationOptions: {},
    },
    Audiolibro: {screen: AudiolibroScreen, navigationOptions: {}},
    Reflexion: ReflexionScreen,
    Emociones: EmocionesScreen,
    Emocion: EmocionScreen,
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
