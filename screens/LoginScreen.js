import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
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
        <SafeAreaView style={styles.container}>
          <Logo style={styles.logo} />
          <View style={styles.full}>
            <InputLogin placeholder="Nombre de usuario" type="text" />
            <InputLogin placeholder="Constraseña" type="password" />
            <TouchableOpacity
              onPress={this.handleLogin}
              style={[styles.button]}>
              <Text style={styles.buttonLabel}>INICIAR SESION</Text>
            </TouchableOpacity>
            <TouchableHighlight onPress={this.handleLogin}>
              <View style={[styles.instagramRow]}>
                <Image source={require('../assets/images/instagram.png')} />
                <Text style={styles.instagramText}>Iniciar con Instagram</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text style={styles.forgetText}>¿Olvidaste tu contraseña?</Text>
            </TouchableHighlight>
          </View>
          <View />
          <View />
        </SafeAreaView>
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
    paddingHorizontal: Dims.hugeSpace,
  },
  logo: {
    maxWidth: 185,
    height: 80,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: Colors.primaryDark,
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.5,
    lineHeight: 48,
  },
  instagramRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Dims.regularSpace,
    color: Colors.primary,
  },
  instagramText: {
    color: Colors.primaryDark,
    fontSize: 16,
    lineHeight: 14,
  },
  forgetText: {
    color: Colors.grey,
    fontSize: 16,
    lineHeight: 28,
    marginVertical: Dims.smallSpace,
  },
  full: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
