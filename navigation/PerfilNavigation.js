import React from 'react';
import {StyleSheet, Image, Styles} from 'react-native';
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
        drawerLabel: 'Mis Emociones',
        drawerIcon: () => (
          <Image
            source={{uri: 'http://okoconnect.com/karim/assets/images/menuPerfil/emociones.png'}}
            style={styles.icon} />
        ),
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
        drawerLabel: 'Viajes Completados',
        drawerIcon: () => (
          <Image
            source={{uri: 'http://okoconnect.com/karim/assets/images/menuPerfil/viajescompletados.png'}}
            style={styles.icon} />
        ),
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
        drawerLabel: 'Mi Diario',
        drawerIcon: () => (
          <Image
            source={{uri: 'http://okoconnect.com/karim/assets/images/menuPerfil/diario.png'}}
            style={styles.icon} />
        ),
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
        drawerLabel: 'Mis Meditaciones',
        drawerIcon: () => (
          <Image
            source={{uri: 'http://okoconnect.com/karim/assets/images/menuPerfil/meditaciones.png'}}
            style={styles.icon} />
        ),
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
        drawerLabel: 'Convierte en Premium',
        drawerIcon: () => (
          <Image
            source={{uri: 'http://okoconnect.com/karim/assets/images/menuPerfil/premium.png'}}
            style={styles.icon} />
        ),
      },
    },
  },
  {
    drawerPosition: 'right',
    drawerType: 'slide',
    unmountInactiveRoutes: true,
    contentComponent: DrawerContentComponents,
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTitleStyle: {
        color: '#8088a5',
        fontFamily: 'MyriadPro-Semibold',
        fontSize: 16,
        paddingVertical: 20,
      },
    },
  },
);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  }
});

export default PerfilNavigation;
