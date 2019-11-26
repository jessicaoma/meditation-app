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
    Home: {
      screen: homeStack,
      navigationOptions: {
        title: 'Inicio',
        tabBarIcon: ({focused, horizontal, tintColor}) => (
          <TabBarIcon name={'inicio'} tintColor={tintColor} />
        ),
      },
    },
    Categorias: {
      screen: CategoriasNavigator,
      navigationOptions: {
        title: 'Viajes',
        tabBarIcon: ({focused, horizontal, tintColor}) => (
          <TabBarIcon name={'viajes'} tintColor={tintColor} />
        ),
      },
    },
    Meditar: {
      screen: MeditacionesScreen,
      navigationOptions: {
        title: 'Meditar',
        tabBarIcon: ({focused, horizontal, tintColor}) => (
          <TabBarIcon name={'meditar'} tintColor={tintColor} />
        ),
      },
    },
    Audiolibros: {
      screen: AudiolibrosScreen,
      navigationOptions: {
        title: 'Audiolibros',
        tabBarIcon: ({focused, horizontal, tintColor}) => (
          <TabBarIcon name={'audiolibros'} tintColor={tintColor} />
        ),
      },
    },
    AngelStack: {
      screen: AngelNavigator,
      navigationOptions: {
        title: 'Tu ángel',
        tabBarIcon: ({focused, horizontal, tintColor}) => (
          <TabBarIcon name={'angel'} tintColor={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
      labelStyle:{
        // #Editar aca va los estilos, si no te funciona se debera usar tabBarLabel que debe regresar un React.Node y estar la altura de tabBarIcon.
      }
    },
    initialRouteName: 'Home',
  },
);

export default BottomNavigator;
