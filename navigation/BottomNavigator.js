import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AudiolibrosScreen from '../screens/AudiolibrosScreen';
import MeditacionesScreen from '../screens/MeditacionesScreen';
import ViajesNavigator from './ViajesNavigator';
import Colors from '../constants/Colors';
import AngelNavigator from './AngelNavigator';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={'md-information-circle'} />
      ),
    },
  },
);

const tabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Viajes: ViajesNavigator,
    Meditar: MeditacionesScreen,
    Audiolibros: AudiolibrosScreen,
    AngelStack: {
      screen: AngelNavigator,
      navigationOptions: {
        title: 'Tu ángel',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.primaryDark,
    },
    initialRouteName: 'Home',
  },
);

export default tabNavigator;
