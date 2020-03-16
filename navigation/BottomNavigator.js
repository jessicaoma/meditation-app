import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AudiolibrosScreen from '../screens/AudiolibrosScreen';
import MeditacionesScreen from '../screens/MeditacionesScreen';
import CategoriasNavigator from './CategoriasNavigator';
import Colors from '../constants/Colors';
import AngelNavigator from './AngelNavigator';

const homeStack = createStackNavigator({Home: HomeScreen});

const BottomNavigator = createBottomTabNavigator(
  {
    Inicio: {
      screen: homeStack,
      navigationOptions: {
        title: 'Inicio',
        tabBarIcon: ({tintColor}) => (
          <TabBarIcon name={'inicio'} tintColor={tintColor} />
        ),
      },
    },
    Categorias: {
      screen: CategoriasNavigator,
      navigationOptions: {
        title: 'Viajes',
        tabBarIcon: ({tintColor}) => (
          <TabBarIcon name={'viajes'} tintColor={tintColor} />
        ),
      },
    },
    Meditar: {
      screen: MeditacionesScreen,
      navigationOptions: {
        title: 'Meditar',
        tabBarIcon: ({tintColor}) => (
          <TabBarIcon name={'meditar'} tintColor={tintColor} />
        ),
      },
    },
    Audiolibros: {
      screen: AudiolibrosScreen,
      navigationOptions: {
        title: 'Audiolibros',
        tabBarIcon: ({tintColor}) => (
          <TabBarIcon name={'audiolibros'} tintColor={tintColor} />
        ),
      },
    },
    AngelStack: {
      screen: AngelNavigator,
      navigationOptions: {
        title: 'Tu ángel',
        tabBarIcon: ({tintColor}) => (
          <TabBarIcon name={'angel'} tintColor={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
    },
    initialRouteName: 'Inicio',
    //TODO elimnar despues
    resetOnBlur: true,
  },
);

export default BottomNavigator;
