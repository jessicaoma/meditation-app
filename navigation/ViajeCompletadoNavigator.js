import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import * as React from 'react';
import ViajesCompletadosScreen from '../screens/ViajesCompletadosScreen';
import PasoAScreen from '../screens/PasoAScreen';
import PasoBScreen from '../screens/PasoBScreen';
import PasoCScreen from '../screens/PasoCScreen';
import PasoDScreen from '../screens/PasoDScreen';
import PasoEScreen from '../screens/PasoEScreen';

const Stack = createStackNavigator();

function ViajeCompletadoNavigator(props) {
  //console.log(props);
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerBackTitle: null,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          color: '#030303',
          fontFamily: 'MyriadPro-Semibold',
        },
      }}>
      <Stack.Screen
        name="ViajesCompletados"
        component={ViajesCompletadosScreen}
        options={ViajesCompletadosScreen.navigationOptions}
      />
      <Stack.Screen
        name="PasoA"
        component={PasoAScreen}
        options={PasoAScreen.navigationOptions}
      />
      <Stack.Screen
        name="PasoB"
        component={PasoBScreen}
        options={PasoBScreen.navigationOptions}
      />
      <Stack.Screen
        name="PasoC"
        component={PasoCScreen}
        options={PasoCScreen.navigationOptions}
      />
      <Stack.Screen
        name="PasoD"
        component={PasoDScreen}
        options={PasoDScreen.navigationOptions}
      />
      <Stack.Screen
        name="PasoE"
        component={PasoEScreen}
        options={PasoEScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
}

export default ViajeCompletadoNavigator;
