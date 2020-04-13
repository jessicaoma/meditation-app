import React from 'react';
import {StyleSheet, SafeAreaView, Image} from 'react-native';
import Colors from '../constants/Colors';
import Logo from '../components/Logo';
import Dimensions from '../constants/Dimensions';
import {connect} from 'react-redux';

const aspectRadioImage = 320 / 236;
//TODO revisar como mejorar la experiencia (posiblemente se deba eliminar esta pantalla)
/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Splash'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Splash'>} route
 * @prop {string} usuario
 * @param {Props} props
 */
function SplashScreen({navigation, usuario}) {
  setTimeout(() => {
    if (usuario === undefined) {
      // @ts-ignore
      navigation.replace('Login');
    } else {
      // @ts-ignore
      navigation.replace('App');
    }
  }, 1000);
  return (
    <SafeAreaView style={styles.contaner}>
      <Image
        // @ts-ignore
        source={require('../assets/images/splash-bg.png')}
        style={styles.background}
      />
      <Logo />
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    usuario: state.usuario,
  };
}

export default connect(mapStateToProps)(SplashScreen);

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
