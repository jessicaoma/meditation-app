import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import AngelCartasScreen from '../screens/AngelCartasScreen';
import AngelScreen from '../screens/AngelScreen';

const Stack = createStackNavigator();

function AngelNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        header: () => null,
        headerTransparent: true,
      }}>
      <Stack.Screen name="Cartas" component={AngelCartasScreen} />
      <Stack.Screen name="Angel" component={AngelScreen} />
    </Stack.Navigator>
  );
}

export default AngelNavigator;
