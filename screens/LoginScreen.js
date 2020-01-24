import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  SafeAreaView,
  ScrollView,
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
  handleCrearCuenta = () => {
    this.props.navigation.navigate('CrearCuenta');
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
          <ScrollView contentInsetAdjustmentBehavior="automatic" >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Logo width='50%' isAlternative />
                    <Text style={styles.welcomeTitle}>BIENVENIDO</Text>
                </View>
                <View style={styles.container}>
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
                        
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity
                      onPress={this.handleCrearCuenta}
                      style={[styles.button]}>
                      <Text style={styles.buttonLabel}>Crear una cuenta</Text>
                    </TouchableOpacity>
                </View>
            </View>  
            
          </ScrollView>
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
    justifyContent: 'center',
    minHeight: Dims.window.height / 1.65,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '90%'
  },
  header: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    paddingTop: 50
  },
  welcomeTitle: {
    color: '#ABA0B5',
    fontSize: Dims.h2,
    lineHeight: 36,
    fontFamily: 'MyriadPro-Regular',
    letterSpacing: 1.2,
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
  footer: {
    paddingHorizontal: '6%',
  },
  buttonLabel: {
    color: 'white',
    fontSize: Dims.inputText,
    textAlign: 'center',
    lineHeight: 50,
    fontFamily: 'MyriadPro-Regular',
    minWidth: '100%',
  },
  forgetText: {
    color: '#ABA0B5',
    fontSize: Dims.inputText,
    lineHeight: 28,
    marginVertical: Dims.smallSpace,
  },
  full: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
});
