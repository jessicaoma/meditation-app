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
 * @property {string} icon Icon to show in the input
 * @property {boolean} password Indicate that is a input password
 */

export default class InputLogin extends Component {
  state = {
    icon: 'eye',
    password: false,
  };
  _changeIcon = () => {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      password: !prevState.password,
    }));
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
              <Image
                // @ts-ignore
                source={require('../assets/images/eye.png')}
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
    color: Colors.grey,
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
    color: Colors.grey,
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
    height: 22,
    resizeMode: 'contain',
  },
});
