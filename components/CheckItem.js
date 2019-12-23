import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Dims from '../constants/Dimensions';
import Colors from '../constants/Colors';

/**
 * A Check Item
 * @typedef Props
 * @prop {string} color Primary color to used
 * @prop {(event: import('react-native').GestureResponderEvent) => void} [onPress] Handle press event
 * @prop {boolean} [disable] Indicates that the component border is gray.
 * @prop {boolean} [checked] Indicates that the component checkedCircle has color. (not work with disable)
 * @prop {string} children Text to show
 * @extends {Component<Props>}
 */
export default class CheckItem extends Component {
  render() {
    let {color, disable, checked, onPress} = this.props;
    let styleStatus = StyleSheet.create({
      styleContainer: {
        borderColor: disable ? Colors.borderWhite : color,
      },
      styleText: {
        fontWeight: disable ? 'normal' : 'bold',
      },
      circle: {
        borderColor: disable ? '#919394' : Colors.primaryDark,
      },
      checkedCircle: {
        backgroundColor: disable
          ? 'white'
          : checked
          ? color
          : Colors.borderWhite,
      },
    });

    return (
      <TouchableOpacity
        style={[styles.container, styleStatus.styleContainer]}
        onPress={onPress}>
        <View style={[styles.circle, styleStatus.circle]}>
          <View style={[styles.checkedCircle, styleStatus.checkedCircle]} />
        </View>
        <Text style={[styles.text, styleStatus.styleText]}>
          {' '}
          {this.props.children}{' '}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 0,
    paddingHorizontal: Dims.regularSpace,
    borderColor: Colors.borderWhite,
    backgroundColor: 'white',
    flexDirection: 'row',
    flex: 1,
  },
  text: {
    fontFamily: 'MyriadPro-Semibold',
    lineHeight: 46,
    fontSize: Dims.window.width * 0.038,
    letterSpacing: 0.89,
    color: Colors.gray,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginVertical: 12,
  },
  checkedCircle: {
    width: 11,
    height: 11,
    borderRadius: 7,
  },
});
