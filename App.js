// @ts-nocheck
import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import React, {useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </>
    );
  }
}

async function loadResourcesAsync() {
  //TODO cambiar la validacion pues ya no se usa expo snack
  const envProd = process.env.NODE_ENV === 'production';
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/logo.png'),
      require('./assets/images/logo2.png'),
      require('./assets/images/splash-bg.png'),
      //require('./assets/images/eye.png'),
      // require('./assets/images/iconsNavigations/iconInicio.png'),
      // require('./assets/images/iconsNavigations/iconViajes.png'),
      // require('./assets/images/iconsNavigations/iconMeditar.png'),
      // require('./assets/images/iconsNavigations/iconLibros.png'),
      // require('./assets/images/iconsNavigations/iconAngel.png'),
      require('./assets/images/iconsNavigations/iconVideo.png'),
      require('./assets/images/sliderimage.png'), //
      require('./assets/images/angel/angel1.png'),
      require('./assets/images/angel/angel2.png'),
      require('./assets/images/angel/angel3.png'),
      require('./assets/images/angel/angel4.png'),
      require('./assets/images/angel/angelreve1-vacio.png'),
      require('./assets/images/angel/angelreve2-vacio.png'),
      require('./assets/images/angel/angelreve3-vacio.png'),
      require('./assets/images/angel/angelreve4-vacio.png'),
      require('./assets/images/emociones/emocion1.png'),
      require('./assets/images/emociones/emocion2.png'),
      require('./assets/images/emociones/emocion3.png'),
      require('./assets/images/emociones/emocion4.png'),
      // require('./assets/images/iconPerfil2.png'),
      // require('./assets/images/menuPerfil/emociones.png'),
      // require('./assets/images/menuPerfil/viajescompletados.png'),
      // require('./assets/images/menuPerfil/diario.png'),
      // require('./assets/images/menuPerfil/meditaciones.png'),
      // require('./assets/images/menuPerfil/premium.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'MyriadPro-Bold': envProd
        ? 'http://okoconnect.com/karim/assets/fonts/MyriadPro-bold.ttf'
        : require('./assets/fonts/MyriadPro-bold.ttf'),
      'MyriadPro-Semibold': envProd
        ? 'http://okoconnect.com/karim/assets/fonts/MyriadPro-semibold.ttf'
        : require('./assets/fonts/MyriadPro-semibold.ttf'),
      'MyriadPro-Regular': envProd
        ? 'http://okoconnect.com/karim/assets/fonts/MyriadPro-regular.ttf'
        : require('./assets/fonts/MyriadPro-regular.ttf'),
      'SFProText-Medium': envProd
        ? 'http://okoconnect.com/karim/assets/fonts/SFProText-Medium.ttf'
        : require('./assets/fonts/SFProText-Medium.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //marginTop: StatusBar.currentHeight,
  },
});
