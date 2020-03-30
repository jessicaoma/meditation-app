import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import React, {useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from './store';


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
        <Provider store={store}>
          <View style={styles.container}>
            <AppNavigator />
          </View>
        </Provider>
      </>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/splash-bg.png'),
      require('./assets/images/sliderimage.png'),
      require('./assets/images/bg-inicio.png'),
      require('./assets/images/angel/angel1.png'),
      require('./assets/images/angel/angel2.png'),
      require('./assets/images/angel/angel3.png'),
      require('./assets/images/angel/angel4.png'),
      require('./assets/images/angel/angelreve1-vacio.png'),
      require('./assets/images/angel/angelreve2-vacio.png'),
      require('./assets/images/angel/angelreve3-vacio.png'),
      require('./assets/images/angel/angelreve4-vacio.png'),
      require('./assets/images/emociones/emocion-1.png'),
      require('./assets/images/emociones/emocion-2.png'),
      require('./assets/images/emociones/emocion-3.png'),
      require('./assets/images/emociones/emocion-4.png'),
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      'MyriadPro-Bold': require('./assets/fonts/MyriadPro-Bold.ttf'),
      'MyriadPro-Semibold': require('./assets/fonts/MyriadPro-Semibold.ttf'),
      'MyriadPro-Regular': require('./assets/fonts/MyriadPro-Regular.ttf'),
      'SFProText-Medium': require('./assets/fonts/SFProText-Medium.ttf'),
      'Kiona': require('./assets/fonts/Kiona-Regular.ttf'),
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
