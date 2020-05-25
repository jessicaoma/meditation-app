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
 * @prop {boolean} [blurOnSubmit] If true, the text field will blur when submitted. The default value is true.
 * @prop {(text: string) => void} [onSubmitEditing] Callback that is called when the text input's submit button is pressed.
 * @prop {(input: import('react-native').TextInput) => void} [inputRef] Reference of the Textinput
 * @prop {string} [value] Text value for the Textinput
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
    var {
      placeholder,
      style,
      type,
      onChange,
      blurOnSubmit,
      onSubmitEditing,
      inputRef,
      value,
    } = this.props;
    return (
      <View style={styles.container}>
        {type === 'text' ? (
          <TextInput
            style={[styles.inputText, style]}
            placeholder={placeholder}
            placeholderTextColor="#ABA0B5"
            secureTextEntry={false}
            onChangeText={onChange}
            returnKeyType={'next'}
            blurOnSubmit={blurOnSubmit}
            onSubmitEditing={onSubmitEditing}
            ref={inputRef}
            value={value}
          />
        ) : (
          <>
            <TextInput
              style={[styles.inputText, styles.inputPassword, style]}
              placeholder={placeholder}
              placeholderTextColor="#ABA0B5"
              secureTextEntry={this.state.password}
              onChangeText={onChange}
              blurOnSubmit={blurOnSubmit}
              onSubmitEditing={onSubmitEditing}
              ref={inputRef}
              value={value}
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
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputText: {
    width: '100%',
    height: '95%',
    color: '#ABA0B5',
    fontSize: Dims.inputText,
    fontWeight: '400',
    letterSpacing: 1,
    //lineHeight: 55,
    paddingHorizontal: 10,
    minHeight: 55,
    fontFamily: 'MyriadPro-Regular',
    borderRadius: 50,
    position: 'relative',
  },
  inputPassword: {
    width: '92%',
  },
  eyeImage: {
    width: 24,
    height: 24,
    color: '#97a3ce',
    position: 'relative',
    right: 0,
  },
});
