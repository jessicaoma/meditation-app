// @ts-nocheck
import React from 'react';
import {StyleSheet, SafeAreaView, Image, StatusBar} from 'react-native';
import Colors from '../constants/Colors';
import Logo from '../components/Logo';
import Dimensions from '../constants/Dimensions';

const aspectRadioImage = 320 / 236;
//TODO revisar como mejorar la experiencia (posiblemente se deba eliminar esta pantalla)
/**
 * @typedef {Object} Props Properties of the component
 * @property {import('react-navigation').NavigationScreenProp} navigation Callback used when the component is Press
 * @param {Props} props Properties
 */
export default function SplashScreen({navigation}) {
  setTimeout(() => {
    navigation.navigate('Login');
  }, 1000);
  return (
    <SafeAreaView style={styles.contaner}>
      <StatusBar barStyle="dark-content" />
      <Image
        source={require('../assets/images/splash-bg.png')}
        style={styles.background}
      />
      <Logo />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contaner: {
    backgroundColor: Colors.backgroundSplash,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: Dimensions.window.width / aspectRadioImage,
    position: 'absolute',
    resizeMode: 'contain',
    bottom: 0,
  },
});
