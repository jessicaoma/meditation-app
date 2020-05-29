import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';
import InputLogin from '../components/InputLogin';
import Dims from '../constants/Dimensions';
import ScreenBg from '../components/screenBg';
import API from '../utils/API';
import {connect} from 'react-redux';
import {SAVE_USER} from '../reducers/types';
import {Ionicons} from '@expo/vector-icons';
import ScalableText from 'react-native-text';

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'CrearCuenta'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'CrearCuenta'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class CrearCuentaScreen extends Component {
  state = {
    name: '',
    email: '',
    pass: '',
    pass2: '',
    error: [],
  };

  checkEmail = () => {
    const reg = /^((([a-z]|d|[!#$%&'*+-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(.([a-z]|d|[!#$%&'*+-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|d|-|.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))).)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|d|-|.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))).?$/;
    return reg.test(this.state.email.trim());
  };

  checkPass = () => {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])(?=.{6,})/;
    return reg.test(this.state.pass.trim());
  };

  handleLogin = async () => {
    let error = [];
    if (this.state.name.trim().length === 0) {
      error.push('Debes ingresar un nombre');
    }
    if (!this.checkEmail()) {
      error.push('Debe ingresar una dirección de correo válida.');
    }
    if (!this.checkPass()) {
      error.push(
        'La contraseña debe tener una mayúscula, una minúscula, un número, un signo y una longitud de al menos 6 caracteres.',
      );
    }
    if (this.state.pass.trim() !== this.state.pass2.trim()) {
      error.push('La contraseña y su confirmación no coinciden.');
    }
    if (error.length > 0) {
      this.setState({error});
      return;
    }
    const datos = {
      FirstName: this.state.name.trim(),
      Email: this.state.email.trim(),
      Password: this.state.pass,
      ConfirmPassword: this.state.pass2,
    };
    const result = await API.registerUser(datos);
    if (result.token !== undefined) {
      this.props.dispatch({
        type: SAVE_USER,
        payload: {usuario: result},
      });
    } else {
      this.setState({error: result.errors});
      //this.props.navigation.navigate('Login');
    }
  };
  nameRef = {};
  emailRef = {};
  passwordRef = {};
  passwordRef2 = {};
  refName = input => {
    this.nameRef = input;
  };
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
  _handleClose = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scroll}>
          <ScreenBg
            source={{
              uri: 'http://okoconnect.com/karim/images/crearcuenta-bg.png',
            }}
            color="white"
            styleImage={{resizeMode: 'cover', height: Dims.window.height}}>
            <TouchableOpacity style={styles.close} onPress={this._handleClose}>
              <Ionicons
                name={'md-close'}
                size={30}
                color={Colors.primaryDark}
              />
            </TouchableOpacity>

            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.welcomeTitle}>
                  Regístrate con tu correo electrónico
                </Text>
              </View>
              <View style={styles.full}>
                {this.state.error.length > 0 ? (
                  this.state.error.map((error, index) => (
                    <View
                      style={[styles.errorContainer]}
                      key={index.toString()}>
                      <Ionicons
                        name="md-alert"
                        size={15}
                        style={{color: '#efbfba', marginRight: 4, marginTop:-4}}
                      />
                      <ScalableText style={styles.errorTexto}>
                        {error}
                      </ScalableText>
                    </View>
                  ))
                ) : (
                  <></>
                )}
                <InputLogin
                  placeholder="Nombre"
                  type="text"
                  onSubmitEditing={this.goEmail}
                  blurOnSubmit={false}
                  inputRef={this.refName}
                  onChange={name => {
                    this.setState({name});
                  }}
                  value={this.state.name}
                />
                <InputLogin
                  placeholder="Correo"
                  type="text"
                  onSubmitEditing={this.goPassword}
                  blurOnSubmit={false}
                  inputRef={this.refEmail}
                  onChange={email => {
                    this.setState({email});
                  }}
                  value={this.state.email}
                />
                <InputLogin
                  placeholder="Contraseña"
                  type="password"
                  onSubmitEditing={this.goPassword2}
                  blurOnSubmit={false}
                  inputRef={this.refPassword}
                  onChange={pass => {
                    this.setState({pass});
                  }}
                  value={this.state.pass}
                />
                <InputLogin
                  placeholder="Confirmar Contraseña"
                  type="password"
                  inputRef={this.refPassword2}
                  onChange={pass2 => {
                    this.setState({pass2});
                  }}
                  value={this.state.pass2}
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
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? Dims.statusBarHeight : 0,
  },
  scroll: {
    paddingTop: Dims.statusBarHeight,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingHorizontal: 40,
    paddingVertical: 50,
    minHeight: Dims.window.height - 220,
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
  full: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  errorContainer: {
    flex: 0,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  errorTexto: {
    fontFamily: 'MyriadPro-Semibold',
    color: '#ABA0B5',
    fontSize: 12,
    lineHeight: 13,
  },
  close: {
    position: 'absolute',
    right: 25,
    top: 0,
    zIndex: 100,
  },
});

export default connect(null)(CrearCuentaScreen);
