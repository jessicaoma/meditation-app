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

const PerfilNavigation = createDrawerNavigator(
  {
    Main: {
      screen: BottomNavigator,
      navigationOptions: {
        title: 'Karim Temple',
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
    Premium2: {
      screen: createStackNavigator(
        {PremiumScreen},
        {
          defaultNavigationOptions: ({navigation}) => ({
            title: 'Convierte en Premium',
            headerBackTitle: null,
            headerLeft: (
              <HeaderBackButton onPress={() => navigation.goBack(null)} />
            ),
          }),
        },
      ),
      navigationOptions: {
        title: 'Convierte en Premium',
      },
    },
  },
  {
    drawerPosition: 'right',
    drawerType: 'slide',
    unmountInactiveRoutes: true,
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTitleStyle: {
        color: '#030303',
        fontFamily: 'MyriadPro-Semibold',
      },
    },
  },
);

export default PerfilNavigation;
