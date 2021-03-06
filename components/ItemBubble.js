import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Dims from '../constants/Dimensions';
import Colors from '../constants/Colors';
import ScalableText from 'react-native-text';
import {getBrightness} from '../utils/convert';

let colorLetra = Colors.gray;
/**
 * A button whit border radius 30º
 * @typedef Props
 * @prop {string} color Primary color to used
 * @prop {(event: import('react-native').GestureResponderEvent) => void} [onPress] Handle press event
 * @prop {boolean} [disable] Indicates that the component border is gray. (not work with hasButton)
 * @prop {boolean} [fill] Indicates changing the color of the background. (not work with hasButton)
 * @prop {boolean} [bold] indicates that the text has fontWeight is bold.
 * @prop {number} [fontSize] Size of the font, default (Dims.window.width * 0.038)
 * @prop {boolean} [likeButton] Indicates use a look similar to Button
 * @prop {boolean} [notMargin] Indicates that remove all margin
 * @prop {string} children Text to show
 * @prop {import('react-native').TextStyle} [styleText] Style to apply on the Text
 * @extends {Component<Props>}
 */
export default class ItemBubble extends Component {
  render() {
    let {
      color,
      fill,
      disable,
      bold,
      fontSize,
      likeButton,
      onPress,
      notMargin,
    } = this.props;

    if (getBrightness(color) > 190) {
      colorLetra = Colors.gray;
    } else {
      colorLetra = '#fff';
    }

    let styleStatus = StyleSheet.create(
      likeButton
        ? {
            styleContainer: {
              borderColor: '#ffffff',
              backgroundColor: color,
              marginBottom: notMargin ? 0 : Dims.smallSpace,
            },
            styleText: {
              fontFamily: 'MyriadPro-Regular',
              color: 'white',
              fontSize: fontSize ? fontSize : Dims.window.width * 0.038,
            },
          }
        : {
            styleContainer: {
              borderColor: disable ? Colors.borderWhite : color,
              backgroundColor: fill ? color : 'white',
              marginBottom: notMargin ? 0 : Dims.smallSpace,
            },
            styleText: {
              fontFamily: 'MyriadPro-Regular',
              fontSize: fontSize ? fontSize : Dims.window.width * 0.038,
              color: fill ? colorLetra : Colors.gray,
            },
          },
    );

    return (
      <TouchableOpacity
        style={[styles.container, styleStatus.styleContainer]}
        onPress={onPress}>
        <ScalableText
          style={[styles.text, styleStatus.styleText, this.props.styleText]}>
          {this.props.children}
        </ScalableText>
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
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 60,
  },
  text: {
    fontFamily: 'MyriadPro-Semibold',
    lineHeight: 16,
    fontSize: 13,
    letterSpacing: 0.89,
    color: colorLetra,
    paddingHorizontal: 6,
    paddingTop: 4,
    flexWrap: 'wrap',
    flex: 1,
  },
});
