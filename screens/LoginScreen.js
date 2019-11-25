import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Image
} from 'react-native';
import Colors from '../constants/Colors';
import InputLogin from '../components/InputLogin';
import Logo from '../components/Logo';
import Dims from '../constants/Dimensions';

export default class LoginScreen extends Component {
  handleLogin = () => {
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Logo isAlternative style={styles.logo} />
          <Text style={styles.welcomeTitle}>BIENVENIDO</Text>
          <View style={styles.full}>
            <InputLogin placeholder="Correo" type="text" />
            <InputLogin placeholder="Constraseña" type="password" />
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
              <Text style={styles.buttonLabel}>CREAR UNA CUENTA</Text>
            </TouchableOpacity>
          </View>
          <View />
          <View />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    minHeight: 100,
    paddingTop: Dims.hugeSpace + Dims.hugeSpace + Dims.hugeSpace,
  },
  welcomeTitle: {
    color: '#aba0b5',
    fontSize: 20,
    lineHeight: 36,
    fontFamily: 'MyriadPro-Regular',
  },
  logo: {
    width: 84,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 5
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
    fontSize: Dims.window.width * 0.041,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.5,
    lineHeight: 50,
    fontFamily: 'MyriadPro-Regular',
  },
  forgetText: {
    color: Colors.gray,
    fontSize: 16,
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
