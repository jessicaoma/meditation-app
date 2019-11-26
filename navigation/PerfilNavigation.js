import React from 'react';
import {
  createDrawerNavigator,
  createStackNavigator,
  HeaderBackButton,
} from 'react-navigation';

import BottomNavigator from './BottomNavigator';
import MisEmocionesScreen from '../screens/MisEmocionesScreen';
import MiDiarioScreen from '../screens/MiDiarioScreen';
import ViajesCompletadosScreen from '../screens/ViajesCompletadosScreen';
import MisMeditacionesScreen from '../screens/MisMeditacionesScreen';
import PremiumScreen from '../screens/PremiumScreen';
import DrawerContentComponents from '../components/DrawerContentComponents';

const PerfilNavigation = createDrawerNavigator(
  {
    Main: {
      screen: BottomNavigator,
      navigationOptions: {
        title: 'Janett Ramirez',
      },
    },
    MisEmociones: {
      screen: createStackNavigator(
        {MisEmocionesScreen},
        {
          defaultNavigationOptions: ({navigation}) => ({
            title: 'Mis Emociones',
            headerBackTitle: null,
            headerLeft: (
              <HeaderBackButton onPress={() => navigation.goBack(null)} />
            ),
          }),
        },
      ),
      navigationOptions: {
        title: 'Mis Emociones',
      },
    },
    ViajesCompletados: {
      screen: createStackNavigator(
        {ViajesCompletadosScreen},
        {
          defaultNavigationOptions: ({navigation}) => ({
            title: 'Viajes Completados',
            headerBackTitle: null,
            headerLeft: (
              <HeaderBackButton onPress={() => navigation.goBack(null)} />
            ),
          }),
        },
      ),
      navigationOptions: {
        title: 'Viajes Completados',
      },
    },
    MiDiario: {
      screen: createStackNavigator(
        {MiDiarioScreen},
        {
          defaultNavigationOptions: ({navigation}) => ({
            title: 'Mi Diario',
            headerBackTitle: null,
            headerLeft: (
              <HeaderBackButton onPress={() => navigation.goBack(null)} />
            ),
          }),
        },
      ),
      navigationOptions: {
        title: 'Mi Diario',
      },
    },
    MisMeditaciones: {
      screen: createStackNavigator(
        {MisMeditacionesScreen},
        {
          defaultNavigationOptions: ({navigation}) => ({
            title: 'Mis Meditaciones',
            headerBackTitle: null,
            headerLeft: (
              <HeaderBackButton onPress={() => navigation.goBack(null)} />
            ),
          }),
        },
      ),
      navigationOptions: {
        title: 'Mis Meditaciones',
      },
    },
    Premium: {
      screen: PremiumScreen,
      navigationOptions: {
        title: 'Convierte en Premium',
      },
    },
  },
  {
    drawerPosition: 'right',
    drawerType: 'slide',
    contentComponent: DrawerContentComponents,
    edgeWidth: 0,
    defaultNavigationOptions: {
      //headerBackTitle: null,
    },
  },
);

export default PerfilNavigation;
