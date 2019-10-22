import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ViajesNavigator from './ViajesNavigator';
import Colors from '../constants/Colors';
import MeditacionNavigator from './MeditacionNavigator';
import AudioLibrosNavigator from './AudioLibrosNavigator';
import AngelNavigator from './AngelNavigator';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    navigationOptions: {
      tabBarIcon: ({focused}) => (
        <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios'
              ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'md-information-circle'
          }
        />
      ),
    },
  },
);

const tabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Viajes: ViajesNavigator,
    Meditar: MeditacionNavigator,
    AudioLibros: AudioLibrosNavigator,
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
  },
);

export default tabNavigator;
