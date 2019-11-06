import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AudiolibrosScreen from '../screens/AudiolibrosScreen';
import MeditacionesScreen from '../screens/MeditacionesScreen';
import ViajesNavigator from './ViajesNavigator';
import Colors from '../constants/Colors';
import AngelNavigator from './AngelNavigator';
import ActionBarImage from './ActionBarImage';

const tabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Inicio',
        tabBarIcon: ({focused}) => (
          <ActionBarImage
            uri='http://okoconnect.com/karim/images/icons/iconInicio.png' 
            />
        ),
      },
    },
    Viajes: {
      screen: ViajesNavigator,
      navigationOptions: {
        title: 'Viajes',
        tabBarIcon: () => (
          <ActionBarImage uri='http://okoconnect.com/karim/images/icons/iconViajes.png'/>
        ),
      },
    },
    Meditar: {
      screen: MeditacionesScreen,
      navigationOptions: {
        title: 'Meditar',
        tabBarIcon: ({focused}) => (
          <ActionBarImage uri='http://okoconnect.com/karim/images/icons/iconMeditar.png'/>
        ),
      },
    },
    Audiolibros: {
      screen: AudiolibrosScreen,
      navigationOptions: {
        title: 'Audiolibros',
        tabBarIcon: ({focused}) => (
          <ActionBarImage uri='http://okoconnect.com/karim/images/icons/iconLibros.png'/>
        ),
      },
    },
    AngelStack: {
      screen: AngelNavigator,
      navigationOptions: {
        title: 'Tu ángel',
        tabBarIcon: ({focused}) => (
          <ActionBarImage uri='http://okoconnect.com/karim/images/icons/iconAngel.png'/>
        ),
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
