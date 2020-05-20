import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import * as React from 'react';
import EmocionesScreen from '../screens/EmocionesScreen';
import EmocionScreen from '../screens/EmocionScreen';
import MisEmocionesScreen from '../screens/MisEmocionesScreen';
// import {useStore} from 'react-redux';

const Stack = createStackNavigator();

// const store = useStore();
// const state = store.getState();
// console.log(state.emocion);
//let init = props.emocion === null ? 'Emociones' : 'Emocion';
export default function EmocionesNavigator() {
  return (
    <Stack.Navigator
      screenOptions={props => {
        return {
          title: '¿Cómo te sientes hoy?',
          headerTitleStyle: {
            color: '#030303',
            fontFamily: 'MyriadPro-Semibold',
          },
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => {
                props.navigation.goBack();
              }}
              labelVisible={false}
            />
          ),
        };
      }}>
      <Stack.Screen name="Emociones" component={EmocionesScreen} />
      <Stack.Screen name="Emocion" component={EmocionScreen} />
      <Stack.Screen
        name="MisEmociones"
        component={MisEmocionesScreen}
        options={MisEmocionesScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
}
