import React from 'react';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import MisEmocionesScreen from '../screens/MisEmocionesScreen';
import ViajesCompletadosScreen from '../screens/ViajesCompletadosScreen';
import MisMeditacionesScreen from '../screens/MisMeditacionesScreen';
import Perfil from '../screens/PerfilScreen';

const Stack = createStackNavigator();

export default function PerfilNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
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
        name="ViajesCompletados"
        component={ViajesCompletadosScreen}
        options={ViajesCompletadosScreen.navigationOptions}
      />
      <Stack.Screen
        name="MisMeditaciones"
        component={MisMeditacionesScreen}
        options={MisMeditacionesScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
}
