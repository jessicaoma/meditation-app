import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import CrearCuentaScreen from '../screens/CrearCuentaScreen';

const Stack = createStackNavigator();

/**
 * @typedef ParamList
 * App
 * @prop {Object} Splash
 * @prop {Object} Login
 * @prop {Object} CrearCuenta
 * @prop {Object} App
 * Main
 * @prop {Object} Meditacion
 * @prop {import('../utils/types').Meditación} Meditacion.meditacion
 * @prop {Object} MeditacionIntro
 * @prop {import('../utils/types').Meditación} MeditacionIntro.meditacion
 * @prop {Object} Audiolibro
 * @prop {import('../utils/types').Audiolibro} Audiolibro.audiolibro
 * @prop {Object} Reflexion
 * @prop {import('../utils/types').Reflexión} Reflexion.reflexion
 * @prop {Object} Canciones
 * @prop {Object} Cancion
 * @prop {import('../utils/types').Canción} Cancion.cancion
 * @prop {Object} Tutorial
 * @prop {import('../utils/types').Video} Tutorial.video
 * @prop {Object} Suscribete
 * Emociones
 * @prop {Object} EmocionesStack
 * @prop {Object} Emociones
 * @prop {Object} Emocion
 * Viaje
 * @prop {Object} ViajeStack
 * @prop {Object} Categoria
 * @prop {string} Categoria.titulo
 * @prop {Object} PasoA
 * @prop {string} PasoA.titulo
 * @prop {number} PasoA.position
 * @prop {number} PasoA.viajeIndex
 * @prop {number} PasoA.colorHeader
 * @prop {Object} PasoB
 * @prop {string} PasoB.titulo
 * @prop {number} PasoB.position
 * @prop {number} PasoB.colorHeader
 * @prop {number} PasoB.viajeIndex
 * @prop {Object} PasoC
 * @prop {string} PasoC.titulo
 * @prop {number} PasoC.position
 * @prop {number} PasoC.colorHeader
 * @prop {number} PasoC.viajeIndex
 * @prop {Object} PasoD
 * @prop {string} PasoD.titulo
 * @prop {number} PasoD.position
 * @prop {number} PasoD.colorHeader
 * @prop {number} PasoD.viajeIndex
 * @prop {Object} PasoE
 * @prop {string} PasoE.titulo
 * @prop {number} PasoE.position
 * @prop {number} PasoE.colorHeader
 * @prop {number} PasoE.viajeIndex
 * Perfil
 * @prop {Object} PerfilDrawer
 * @prop {Object} MisEmociones
 * @prop {Object} ViajesCompletados
 * @prop {Object} MisMeditaciones
 * @prop {Object} Main
 * Main
 * @prop {Object} Inicio
 * @prop {Object} Home
 * @prop {Object} Categorias
 * @prop {Object} Meditar
 * @prop {Object} Audiolibros
 * @prop {Object} AngelStack
 * @prop {Object} Cartas
 * @prop {Object} Angel
 */

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
        headerTransparent: true,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CrearCuenta" component={CrearCuentaScreen} />
      <Stack.Screen name="App" component={MainNavigator} />
    </Stack.Navigator>
  );
}
