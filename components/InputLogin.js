// @ts-nocheck
import React, {Component} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import {Ionicons} from '@expo/vector-icons';

/**
 * @typedef State
 * @property {'md-eye' | 'md-eye-off'} icon Icon to show in the input
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
    icon: 'md-eye',
    password: true,
  };
  _changeIcon = () => {
    this.setState(
      /** @param {State} prevState*/
      prevState => ({
        icon: prevState.icon === 'md-eye' ? 'md-eye-off' : 'md-eye',
        password: !prevState.password,
      }),
    );
  };

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
              <Ionicons
                name={this.state.icon}
                size={24}
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
    color: '#4b4547',
    fontSize: Dims.inputText,
    fontWeight: '400',
    letterSpacing: 1,
    lineHeight: 55,
    paddingHorizontal: 15,
    minHeight: 55,
    fontFamily: 'MyriadPro-Regular',
  },
  inputPassword: {
    width: '96%',
    color: '#4b4547',
    fontSize: Dims.inputText,
    fontWeight: '400',
    letterSpacing: 1,
    lineHeight: 55,
    paddingHorizontal: 10,
    minHeight: 55,
    fontFamily: 'MyriadPro-Regular',
  },
  eyeImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    color: '#97a3ce',
  },
});
