// @ts-nocheck
import React, {Component} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';

/**
 * @typedef State
 * @property {'eye' | 'eye-off'} icon Icon to show in the input
 * @property {boolean} password Indicate that is a input password
 *
 * @typedef {Object} Props
 * @prop {string} [placeholder] The string that will be rendered before text input has been entered
 * @prop {import('react-native').TextStyle} [style] Styles
 * @prop {'text' | 'password'} [type] Type of the input text
 * @prop {(e: import('react-native').NativeSyntheticEvent<import('react-native').TextInputChangeEventData>) => void} [onChange] Callback to event change
 */

/**
 * Componet to control all Input in the LoginScreen
 * @extends {Component<Props>}
 */
export default class InputLogin extends Component {
  /** @type {State} */
  state = {
    icon: 'eye',
    password: true,
  };
  _changeIcon = () => {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      password: !prevState.password,
    }));
  };

  getSource(state) {
    //TODO cambiar la validacion pues ya no se usa expo snack
    //TODO agregar imagen de eye-off
    const envProd = process.env.NODE_ENV === 'production';
    return state === 'eye'
      ? envProd
        ? {uri: 'http://okoconnect.com/karim/assets/images/eye.png'}
        : require('../assets/images/eye.png')
      : require('../assets/images/iconPerfil2.png');
  }

  render() {
    var {placeholder, style, type, onChange} = this.props;
    return (
      <View style={styles.container}>
        {type === 'text' ? (
          <TextInput
            style={[styles.inputText, style]}
            placeholder={placeholder}
            secureTextEntry={false}
            onChange={onChange}
          />
        ) : (
          <>
            <TextInput
              style={[styles.inputPassword, style]}
              placeholder={placeholder}
              secureTextEntry={this.state.password}
              onChange={onChange}
            />
            <TouchableOpacity onPress={this._changeIcon}>
              <Image
                source={this.getSource(this.state.icon)}
                style={styles.eyeImage}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: Dims.regularSpace,
    marginBottom: Dims.bigSpace + Dims.bigSpace,
    alignItems: 'center',
  },
  inputText: {
    width: '100%',
    color: Colors.gray,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
    lineHeight: 55,
    paddingHorizontal: 0,
    minHeight: 55,
    fontFamily: 'MyriadPro-Regular',
  },
  inputPassword: {
    width: '96%',
    color: Colors.gray,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
    lineHeight: 55,
    paddingHorizontal: 0,
    minHeight: 55,
    fontFamily: 'MyriadPro-Regular',
  },
  eyeImage: {
    width: 22,
    height: 15,
    resizeMode: 'contain',
  },
});
