import {createStackNavigator} from 'react-navigation';

import MeditacionScreen from '../screens/MeditacionScreen';
import AudiolibroScreen from '../screens/AudiolibroScreen';
import BottomNavigator from './BottomNavigator';

const MainNavigator = createStackNavigator(
  {
    Main: {screen: BottomNavigator, navigationOptions: {header: null}},
    Meditacion: {
      screen: MeditacionScreen,
      navigationOptions: {},
    },
    Audiolibro: {screen: AudiolibroScreen, navigationOptions: {}},
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
