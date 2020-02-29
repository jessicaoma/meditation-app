import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import LogoFacebook from '../constants/LogoFacebook';
import LogoGoogle from '../constants/LogoGoogle';
import InputLogin from '../components/InputLogin';
import Dims from '../constants/Dimensions';
import ScreenBg from '../components/screenBg';
//TODO hacer todo el manejo
/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class CrearCuentaScreen extends Component {
  handleLogin = () => {
    this.props.navigation.navigate('Login');
  };
  emailRef = {};
  passwordRef = {};
  passwordRef2 = {};

  refEmail = input => {
    this.emailRef = input;
  };
  goEmail = () => {
    this.emailRef.focus();
  };
  refPassword = input => {
    this.passwordRef = input;
  };
  goPassword = () => {
    this.passwordRef.focus();
  };
  refPassword2 = input => {
    this.passwordRef2 = input;
  };
  goPassword2 = () => {
    this.passwordRef2.focus();
  };
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.flex1}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <ScreenBg
              source={{
                uri: 'http://okoconnect.com/karim/images/crearcuenta-bg.png',
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              styleImage={{resizeMode: 'cover', height: Dims.window.height}}>
              <View style={styles.container}>
                <View style={styles.header}>
                  <Text style={styles.welcomeTitle}>Crear cuenta con</Text>
                  <View style={styles.sociallogos}>
                    <TouchableOpacity
                      //onPress={this._changeIcon}
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{marginRight: 5}}>
                      <LogoFacebook />
                    </TouchableOpacity>
                    <TouchableOpacity
                      //onPress={this._changeIcon}
                      style={{}}>
                      <LogoGoogle />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.welcomeTitle}>
                    ó registrarme vía email
                  </Text>
                </View>

                <View /*style={styles.inputs}*/>
                  <InputLogin
                    placeholder="Nombre"
                    type="text"
                    onSubmitEditing={this.goEmail}
                    blurOnSubmit={false}
                  />
                  <InputLogin
                    placeholder="Correo"
                    type="text"
                    onSubmitEditing={this.goPassword}
                    blurOnSubmit={false}
                    inputRef={this.refEmail}
                  />
                  <InputLogin
                    placeholder="Contraseña"
                    type="password"
                    onSubmitEditing={this.goPassword2}
                    inputRef={this.refPassword}
                  />
                  <InputLogin
                    placeholder="Confirmar Contraseña"
                    type="password"
                    inputRef={this.refPassword2}
                  />
                </View>

                <View>
                  <TouchableOpacity
                    onPress={this.handleLogin}
                    style={[styles.button]}>
                    <Text style={styles.buttonLabel}>¡LISTO!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScreenBg>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 40,
    minHeight: Dims.window.height - 120,
  },
  welcomeTitle: {
    color: '#ABA0B5',
    fontSize: Dims.paragraph,
    lineHeight: 25,
    fontFamily: 'MyriadPro-Regular',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  header: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    marginBottom: 15,
  },
  sociallogos: {
    flex: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 30,
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
    lineHeight: 50,
    fontFamily: 'MyriadPro-Regular',
    width: '100%',
    minWidth: '100%',
  },
});
