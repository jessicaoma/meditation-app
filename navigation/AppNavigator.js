import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainNavigator';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      App: MainTabNavigator,
      Splash: SplashScreen,
      Login: LoginScreen,
    },
    {
      initialRouteName: 'Splash',
    },
  ),
);
