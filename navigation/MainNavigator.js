import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import MeditacionScreen from '../screens/MeditacionScreen';
import MeditacionIntroScreen from '../screens/MeditacionIntroScreen';
import AudiolibroScreen from '../screens/AudiolibroScreen';
import ReflexionScreen from '../screens/ReflexionScreen';
import EmocionesNavigator from './EmocionesNavigator';
import ViajeNavigator from './ViajeNavigator';
import PerfilNavigation from './PerfilNavigation';
import BottomNavigator from './BottomNavigator';
import TutorialScreen from '../screens/TutorialScreen';
import PremiumScreen from '../screens/PremiumScreen';
import CancionesScreen from '../screens/CancionesScreen';
import CancionScreen from '../screens/CancionScreen';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: null,
        headerTitleStyle: {
          color: '#030303',
          fontFamily: 'MyriadPro-Semibold',
        },
      }}>
      <Stack.Screen
        name="Main"
        component={BottomNavigator}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="PerfilDrawer"
        component={PerfilNavigation}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Meditacion"
        component={MeditacionScreen}
        options={MeditacionScreen.navigationOptions}
      />
      <Stack.Screen
        name="MeditacionIntro"
        component={MeditacionIntroScreen}
        options={MeditacionIntroScreen.navigationOptions}
      />
      <Stack.Screen
        name="Audiolibro"
        component={AudiolibroScreen}
        options={AudiolibroScreen.navigationOptions}
      />
      <Stack.Screen
        name="Reflexion"
        component={ReflexionScreen}
        options={ReflexionScreen.navigationOptions}
      />
      <Stack.Screen
        name="Canciones"
        component={CancionesScreen}
        options={CancionesScreen.navigationOptions}
      />
      <Stack.Screen
        name="Cancion"
        component={CancionScreen}
        options={CancionScreen.navigationOptions}
      />
      <Stack.Screen
        name="Suscribete"
        component={PremiumScreen}
        options={PremiumScreen.navigationOptions}
      />
      <Stack.Screen
        name="Tutorial"
        component={TutorialScreen}
        options={TutorialScreen.navigationOptions}
      />
      <Stack.Screen
        name="EmocionesStack"
        component={EmocionesNavigator}
        options={{
          title: '¿Cómo te sientes hoy?',
          headerTitleStyle: {
            color: '#030303',
            fontFamily: 'MyriadPro-Semibold',
          },
        }}
      />
      <Stack.Screen
        name="ViajeStack"
        component={ViajeNavigator}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
}
