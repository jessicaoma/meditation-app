import {SplashScreen} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';

import {NavigationContainer} from '@react-navigation/native';
// import useLinking from './navigation/useLinking';

StatusBar.setBarStyle('dark-content');
StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor('transparent');

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  //const [initialNavigationState, setInitialNavigationState] = useState();
  const containerRef = React.useRef();
  // const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        // setInitialNavigationState(await getInitialState());

        // Load assets
        await Asset.loadAsync([
          require('./assets/images/splash-bg.png'),
          require('./assets/images/sliderimage.png'),
          require('./assets/images/bg-inicio.png'),
          require('./assets/images/header-image.png'),
          //require('./assets/images/emociones/emocion-1.png'),
          //require('./assets/images/emociones/emocion-2.png'),
          //require('./assets/images/emociones/emocion-3.png'),
          //require('./assets/images/emociones/emocion-4.png'),
        ]);
        // Load fonts
        await Font.loadAsync({
          //...Ionicons.font,
          'MyriadPro-Bold': require('./assets/fonts/MyriadPro-Bold.ttf'),
          'MyriadPro-Semibold': require('./assets/fonts/MyriadPro-Semibold.ttf'),
          'MyriadPro-Regular': require('./assets/fonts/MyriadPro-Regular.ttf'),
          'SFProText-Medium': require('./assets/fonts/SFProText-Medium.ttf'),
          Kiona: require('./assets/fonts/Kiona-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <NavigationContainer
              ref={containerRef}
              //initialState={initialNavigationState}
            >
              {/* <StatusBar barStyle="dark-content" /> */}
              <AppNavigator />
            </NavigationContainer>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
