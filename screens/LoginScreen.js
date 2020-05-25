import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Colors from '../constants/Colors';
import InputLogin from '../components/InputLogin';
import Logo from '../components/Logo';
import Dims from '../constants/Dimensions';
import ScalableText from 'react-native-text';
import API from '../utils/API';
import {SAVE_USER} from '../reducers/types';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

//TODO hacer todo el manejo
/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Login'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Login'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class LoginScreen extends Component {
  state = {
    email: '',
    pass: '',
  };

  handleLogin = async () => {
    let error = '';
    if (this.state.email.length === 0) {
      error += 'Debes ingresar tu correo\n';
    }
    if (this.state.pass.length === 0) {
      error += 'Debes ingresar tu constraseña\n';
    }
    if (error !== '') {
      /*Alert.alert('Datos Inválidos', error);*/
      this.setState({error});
      return;
    }
    const datos = {
      email: this.state.email.trim(),
      password: this.state.pass,
      rememberme: true,
    };
    const result = await API.loginUser(datos);
    if (result.token !== undefined) {
      this.props.dispatch({
        type: SAVE_USER,
        payload: {usuario: result},
      });
    } else {
      /*Alert.alert('create fail');*/
      this.setState({error});
      this.props.navigation.navigate('Login');
    }
    //this.props.navigation.navigate('App');
  };
  handleCrearCuenta = () => {
    this.props.navigation.navigate('CrearCuenta');
  };
  emailRef = {};
  passwordRef = {};
  refEmail = input => {
    this.emailRef = input;
  };
  refPassword = input => {
    this.passwordRef = input;
  };
  goPassword = () => {
    this.passwordRef.focus();
  };


  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scroll}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Logo isAlternative />
              <ScalableText style={styles.welcomeTitle}>
                BIENVENIDO
              </ScalableText>
            </View>
            <View style={styles.container}>

              {this.state.error && (
                  <>
                  <View style={[styles.errorContainer]}>
                    <Ionicons
                      name="md-alert"
                      size={25}
                      style={{color:'#efbfba',marginRight:10,}}/>
                      <ScalableText style={styles.errorTexto}>
                        {this.state.error}
                      </ScalableText>
                    </View>
                  </>
                )
              }

              <View style={styles.full}>
                <InputLogin
                  placeholder="Correo electrónico"
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
                  inputRef={this.refPassword}
                  onChange={pass => {
                    this.setState({pass});
                  }}
                  value={this.state.pass}
                />
                <TouchableOpacity
                  onPress={this.handleLogin}
                  style={[styles.button]}>
                  <ScalableText style={styles.buttonLabel}>
                    Iniciar Sesión
                  </ScalableText>
                </TouchableOpacity>
                <TouchableHighlight>
                  <ScalableText style={styles.forgetText}>
                    ¿Olvidaste tu contraseña?
                  </ScalableText>
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={this.handleCrearCuenta}
                style={[styles.button]}>
                <ScalableText style={styles.buttonLabel}>
                  Crear una cuenta
                </ScalableText>
              </TouchableOpacity>
            </View>
          </View>
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
  scroll: {},
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
    minHeight: Dims.window.height * 0.9,
  },
  header: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    paddingTop: 50,
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
    paddingBottom: 15,
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
  errorContainer: {
    flex: 0,
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  errorTexto: {
    fontFamily: 'MyriadPro-Semibold',
    color: '#ABA0B5',
    fontSize: 12,
    lineHeight: 13,
  }
});

export default connect(null)(LoginScreen);
