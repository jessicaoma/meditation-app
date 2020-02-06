import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Dims from '../constants/Dimensions';
import Colors from '../constants/Colors';
import ScalableText from 'react-native-text';

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
        <ScalableText style={[styles.text, styleStatus.styleText]}>
          {' '}
          {this.props.children}{' '}
        </ScalableText>
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
    alignItems: 'center',
    flex: 1,
    height: 60,

  },
  text: {
    fontFamily: 'MyriadPro-Semibold',
    lineHeight: 15,
    fontSize: 13,
    letterSpacing: 0.89,
    color: Colors.gray,
    paddingHorizontal: 6,
    paddingTop: 4,
    textTransform: 'capitalize',
    flexWrap: 'wrap',
    flex: 1,
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
