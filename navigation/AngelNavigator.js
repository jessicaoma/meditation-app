import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AngelCartasScreen from '../screens/AngelCartasScreen';
import AngelScreen from '../screens/AngelScreen';

const Stack = createStackNavigator();

function AngelNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cartas"
        component={AngelCartasScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Angel"
        component={AngelScreen}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}

export default AngelNavigator;
