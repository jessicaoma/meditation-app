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
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/logo.png'),
      require('./assets/images/logo2.png'),
      require('./assets/images/splash-bg.png'),
      require('./assets/images/iconsNavigations/iconInicio.png'),
      require('./assets/images/iconsNavigations/iconViajes.png'),
      require('./assets/images/iconsNavigations/iconMeditar.png'),
      require('./assets/images/iconsNavigations/iconLibros.png'),
      require('./assets/images/iconsNavigations/iconAngel.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'MyriadPro-Bold': require('./assets/fonts/MyriadPro-bold.ttf'),
      'MyriadPro-Semibold ': require('./assets/fonts/MyriadPro-semibold.ttf'),
      'MyriadPro-Regular': require('./assets/fonts/MyriadPro-regular.ttf'),
      'SFProText-Medium': require('./assets/fonts/SFProText-Medium.ttf'),
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
