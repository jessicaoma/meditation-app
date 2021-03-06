import React from 'react';
import {
  createStackNavigator,
  HeaderBackButton,
  TransitionPresets,
} from '@react-navigation/stack';
import MisEmocionesScreen from '../screens/MisEmocionesScreen';
import ViajeCompletadoNavigator from './ViajeCompletadoNavigator';
import MisMeditacionesScreen from '../screens/MisMeditacionesScreen';
import Perfil from '../screens/PerfilScreen';

const Stack = createStackNavigator();

export default function PerfilNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerTitleStyle: {
          color: '#030303',
          fontFamily: 'MyriadPro-Semibold',
        },
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={props => {
          return {
            headerLeft: p => (
              <HeaderBackButton
                {...p}
                onPress={() => props.navigation.goBack()}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="MisEmociones"
        component={MisEmocionesScreen}
        options={MisEmocionesScreen.navigationOptions}
      />
      <Stack.Screen
        name="ViajesCompletadosStack"
        component={ViajeCompletadoNavigator}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="MisMeditaciones"
        component={MisMeditacionesScreen}
        options={MisMeditacionesScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
}
