import {createStackNavigator} from 'react-navigation';

import MeditacionScreen from '../screens/MeditacionScreen';
import AudiolibroScreen from '../screens/AudiolibroScreen';
import BottomNavigator from './BottomNavigator';

const MainNavigator = createStackNavigator(
  {
    Main: {screen: BottomNavigator, navigationOptions: {header: null}},
    Meditacion: MeditacionScreen,
    Audiolibro: AudiolibroScreen,
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
    },
  },
);

export default MainNavigator;
