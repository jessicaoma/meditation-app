import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import EmocionesScreen from '../screens/EmocionesScreen';
import EmocionScreen from '../screens/EmocionScreen';
// import {useStore} from 'react-redux';

const Stack = createStackNavigator();

// const store = useStore();
// const state = store.getState();
// console.log(state.emocion);
//let init = props.emocion === null ? 'Emociones' : 'Emocion';
export default function EmocionesNavigator() {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="Emociones" component={EmocionesScreen} />
      <Stack.Screen name="Emocion" component={EmocionScreen} />
    </Stack.Navigator>
  );
}
