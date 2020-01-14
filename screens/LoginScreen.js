import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Colors from '../constants/Colors';
import InputLogin from '../components/InputLogin';
import Logo from '../components/Logo';
import Dims from '../constants/Dimensions';
//TODO hacer todo el manejo
/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class LoginScreen extends Component {
  handleLogin = () => {
    this.props.navigation.navigate('App');
  };
  passwordRef = {};
  refPassword = input => {
    this.passwordRef = input;
  };
  goPassword = () => {
    this.passwordRef.focus();
  };
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.flex1}>
          <View style={styles.container}>
            <Logo isAlternative />
            <Text style={styles.welcomeTitle}>BIENVENIDO</Text>
            <View style={styles.full}>
              <InputLogin
                placeholder="Correo"
                type="text"
                onSubmitEditing={this.goPassword}
                blurOnSubmit={false}
              />
              <InputLogin
                placeholder="Constraseña"
                type="password"
                inputRef={this.refPassword}
              />
              <TouchableOpacity
                onPress={this.handleLogin}
                style={[styles.button]}>
                <Text style={styles.buttonLabel}>Iniciar Sesión</Text>
              </TouchableOpacity>
              <TouchableHighlight>
                <Text style={styles.forgetText}>¿Olvidaste tu contraseña?</Text>
              </TouchableHighlight>
              <TouchableOpacity
                onPress={this.handleLogin}
                style={[styles.button]}>
                <Text style={styles.buttonLabel}>Crear una cuenta</Text>
              </TouchableOpacity>
            </View>
            <View />
            <View />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  flex1: {flex: 1},
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    minHeight: 100,
    paddingTop: Dims.hugeSpace + Dims.hugeSpace + Dims.hugeSpace,
  },
  welcomeTitle: {
    color: '#97a3ce',
    fontSize: Dims.h2,
    lineHeight: 36,
    fontFamily: 'MyriadPro-Bold',
    letterSpacing: 1.2,
  },
  logo: {
    width: 84,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  button: {
    backgroundColor: Colors.second,
    borderRadius: 30,
    alignSelf: 'stretch',
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonLabel: {
    color: 'white',
    fontSize: Dims.inputText,
    textAlign: 'center',
    letterSpacing: 1.5,
    lineHeight: 50,
    fontFamily: 'MyriadPro-Bold',
  },
  forgetText: {
    color: Colors.gray,
    fontSize: Dims.inputText,
    lineHeight: 28,
    marginVertical: Dims.smallSpace,
  },
  full: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 25,
  },
});
