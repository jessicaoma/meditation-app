import React from 'react';
import {StyleSheet, SafeAreaView, Image} from 'react-native';
import Colors from '../constants/Colors';
import Logo from '../components/Logo';
import Dimensions from '../constants/Dimensions';
import {connect} from 'react-redux';
import * as Actions from '../reducers/types';

const aspectRadioImage = 320 / 236;
/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Splash'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Splash'>} route
 * @prop {import('redux').Dispatch} [dispatch]

 * @prop {string} angelTime
 * @prop {string} emocionTime
 * @param {Props} props
 */
function SplashScreen({navigation, angelTime, emocionTime, dispatch}) {
  if (angelTime === undefined) {
    dispatch({
      type: Actions.SET_ANGEL,
      payload: {
        angel: undefined,
        angelTime: new Date(0).toJSON(),
      },
    });
  }
  if (emocionTime === undefined) {
    dispatch({
      type: Actions.SET_EMOCION,
      payload: {
        emocion: undefined,
        emocionTime: new Date(0).toJSON(),
      },
    });
  }
  setTimeout(() => {
    // if (usuario === undefined) {
    //   // @ts-ignore
    //   navigation.navigate('Login');
    // } else {
    //   // @ts-ignore
    //   navigation.replace('App');
    // }
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
    angelTime: state.angelTime,
    emocionTime: state.emocionTime,
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
