import React from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import BottomNavigator from './BottomNavigator';
import MisEmocionesScreen from '../screens/MisEmocionesScreen';
// import MiDiarioScreen from '../screens/MiDiarioScreen';
import ViajesCompletadosScreen from '../screens/ViajesCompletadosScreen';
import MisMeditacionesScreen from '../screens/MisMeditacionesScreen';
import PremiumScreen from '../screens/PremiumScreen';
import DrawerContentComponents from '../components/DrawerContentComponents';
import dimensions from '../constants/Dimensions';
import Perfil from '../screens/PerfilScreen';

// const Drawer = createDrawerNavigator();
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
        //options={MisEmocionesScreen.navigationOptions}
        options={props => {
          return {
            headerLeft: () => (
              <HeaderBackButton onPress={() => props.navigation.goBack()} />
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
  //   return (
  //     <Drawer.Navigator
  //       edgeWidth={0}
  //       drawerPosition="right"
  //       drawerType="slide"
  //       overlayColor="rgba(206, 209, 230, 0.56)"
  //       drawerStyle={{
  //         backgroundColor: 'transparent',
  //         width: dimensions.window.width - 50,
  //       }}
  //       screenOptions={{
  //         unmountOnBlur: true,
  //       }}
  //       drawerContent={props => <DrawerContentComponents {...props} />}>
  //       <Drawer.Screen name="Main" component={BottomNavigator} />
  //       <Drawer.Screen
  //         name="MisEmociones"
  //         component={MisEmociones}
  //         options={{title: 'Mis Emociones'}}
  //       />
  //       <Drawer.Screen
  //         name="ViajesCompletados"
  //         component={ViajesCompletados}
  //         options={{title: 'Módulos Finalizados'}}
  //       />
  //       <Drawer.Screen
  //         name="MisMeditaciones"
  //         component={MisMeditaciones}
  //         options={{title: 'Mis Meditaciones'}}
  //       />
  //       <Drawer.Screen name="Suscribete" component={PremiumScreen} />
  //     </Drawer.Navigator>
  //   );
}

// function MisEmociones(props) {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTitleStyle: {
//           color: '#030303',
//           fontFamily: 'MyriadPro-Semibold',
//         },
//         headerBackTitleVisible: false,
//       }}>
//       <Stack.Screen
//         name="MisEmociones"
//         component={MisEmocionesScreen}
//         options={MisEmocionesScreen.navigationOptions}
//       />
//     </Stack.Navigator>
//   );
// }
// function ViajesCompletados(props) {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTitleStyle: {
//           color: '#030303',
//           fontFamily: 'MyriadPro-Semibold',
//         },
//         headerBackTitleVisible: false,
//       }}>
//       <Stack.Screen
//         name="ViajesCompletados"
//         component={ViajesCompletadosScreen}
//         options={ViajesCompletadosScreen.navigationOptions}
//       />
//     </Stack.Navigator>
//   );
// }
// function MisMeditaciones(props) {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerTitleStyle: {
//           color: '#030303',
//           fontFamily: 'MyriadPro-Semibold',
//         },
//         headerBackTitleVisible: false,
//       }}>
//       <Stack.Screen
//         name="MisMeditaciones"
//         component={MisMeditacionesScreen}
//         options={MisMeditacionesScreen.navigationOptions}
//       />
//     </Stack.Navigator>
//   );
// }

/*const PerfilNavigation = createDrawerNavigator(
  {
    Premium: {
      screen: PremiumScreen,
      navigationOptions: ,
    },
  },
  {
    contentComponent: DrawerContentComponents,
  },
);*/
