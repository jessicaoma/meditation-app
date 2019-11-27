import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Dims from '../constants/Dimensions';
import Colors from '../constants/Colors';
import {enumStatus} from '../utils/types';

/**
 * A button whit border radius 30º
 * @typedef Props
 * @prop {string} color Primary color to used
 * @prop {enumStatus | string} status Status of the item
 * @prop {(event: import('react-native').GestureResponderEvent) => void} [onPress] Handle press event
 * @extends {Component<Props>}
 */
export default class ItemBubble extends Component {
  render() {
    let {color, status, onPress} = this.props;
    let styleStatus = {};
    if (status === enumStatus.done) {
      styleStatus = StyleSheet.create({
        styleContainer: {
          borderColor: color,
          backgroundColor: color,
        },
        styleText: {
          fontWeight: 'bold',
        },
      });
    } else if (status === enumStatus.doing) {
      styleStatus = StyleSheet.create({
        styleContainer: {
          borderColor: color,
          backgroundColor: 'white',
        },
        styleText: {
          fontWeight: 'bold',
        },
      });
    } else if (status === 'viajeTitle') {
      styleStatus = StyleSheet.create({
        styleContainer: {
          borderColor: color,
          backgroundColor: color,
        },
        styleText: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      });
    }
    return (
      <TouchableOpacity
        style={[styles.container, styleStatus.styleContainer]}
        onPress={onPress}>
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
    marginBottom: Dims.smallSpace,
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 0,
    paddingHorizontal: Dims.bigSpace,
    borderColor: Colors.borderWhite,
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'MyriadPro-Semibold',
    lineHeight: 46,
    fontSize: Dims.window.width * 0.038,
    letterSpacing: 0.89,
    color: Colors.gray,
  },
  fondoV: {
    //marginBottom: Dims.bigSpace,
  },
  fondoI: {
    width: 18,
    left: '4%',
    resizeMode: 'contain',
  },
});
