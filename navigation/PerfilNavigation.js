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
import Dims from '../constants/Dimensions';

const PerfilNavigation = createDrawerNavigator(
  {
    Main: {
      screen: BottomNavigator,
    },
    MisEmociones: {
      screen: createStackNavigator(
        {MisEmocionesScreen},
        {
          defaultNavigationOptions: ({navigation}) => ({
            title: 'Mis emociones',
            headerBackTitle: null,
            headerLeft: (
              <HeaderBackButton onPress={() => navigation.goBack(null)} />
            ),
            headerTitleStyle: {
              color: '#030303',
              fontFamily: 'MyriadPro-Semibold',
            },
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
            headerTitleStyle: {
              color: '#030303',
              fontFamily: 'MyriadPro-Semibold',
            },
          }),
        },
      ),
      navigationOptions: {
        title: 'Cursos Completados',
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
            headerTitleStyle: {
              color: '#030303',
              fontFamily: 'MyriadPro-Semibold',
            },
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
            title: 'Mi Meditaciones',
            headerBackTitle: null,
            headerLeft: (
              <HeaderBackButton onPress={() => navigation.goBack(null)} />
            ),
            headerTitleStyle: {
              color: '#030303',
              fontFamily: 'MyriadPro-Semibold',
            },
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
    initialRouteName: 'Main',
    drawerPosition: 'right',
    drawerType: 'slide',
    drawerWidth: Dims.window.width - 50,
    contentComponent: DrawerContentComponents,
    edgeWidth: 0,
    unmountInactiveRoutes: true,
    overlayColor: 'rgba(206, 209, 230, 0.56)',
    drawerBackgroundColor: 'transparent',
  },
);

export default PerfilNavigation;
