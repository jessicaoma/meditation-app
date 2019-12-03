import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Dims from '../constants/Dimensions';
import Colors from '../constants/Colors';

/**
 * A button whit border radius 30º
 * @typedef Props
 * @prop {string} color Primary color to used
 * @prop {(event: import('react-native').GestureResponderEvent) => void} [onPress] Handle press event
 * @prop {boolean} [disable] Indicates that the component border is gray. (not work whit hasButton)
 * @prop {boolean} [fill] Indicates changing the color of the background. (not work whit hasButton)
 * @prop {boolean} [bold] indicates that the text has fontWeight is bold.
 * @prop {number} [fontSize] Size of the font, default (Dims.window.width * 0.038)
 * @prop {boolean} [likeButton] Indicates use a look similar to Button
 * @prop {string} children Text to show
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
    } = this.props;
    let styleStatus = StyleSheet.create(
      likeButton
        ? {
            styleContainer: {
              borderColor: '#ffffff',
              backgroundColor: color,
              borderRadius: 10,
              paddingVertical: Dims.regularSpace,
            },
            styleText: {
              fontFamily: 'MyriadPro-Regular',
              color: 'white',
              lineHeight: 20,
              fontSize: fontSize ? fontSize : Dims.window.width * 0.038,
              fontWeight: bold ? 'bold' : 'normal',
            },
          }
        : {
            styleContainer: {
              borderColor: disable ? Colors.borderWhite : color,
              backgroundColor: fill ? color : 'white',
            },
            styleText: {
              fontFamily: 'MyriadPro-Semibold',
              fontSize: fontSize ? fontSize : Dims.window.width * 0.038,
              fontWeight: bold ? 'bold' : 'normal',
            },
          },
    );

    // if (status === enumStatus.done) {
    //   styleStatus = StyleSheet.create({
    //     styleContainer: {
    //       borderColor: color,
    //       backgroundColor: color,
    //     },
    //     styleText: {
    //       fontWeight: 'bold',
    //     },
    //   });
    // } else if (status === enumStatus.doing) {
    //   styleStatus = StyleSheet.create({
    //     styleContainer: {
    //       borderColor: color,
    //       backgroundColor: 'white',
    //     },
    //     styleText: {
    //       fontWeight: 'bold',
    //     },
    //   });
    // } else if (status === 'viajeTitle') {
    //   styleStatus = StyleSheet.create({
    //     styleContainer: {
    //       borderColor: color,
    //       backgroundColor: color,
    //     },
    //     styleText: {
    //       fontWeight: 'bold',
    //       fontSize: 18,
    //     },
    //   });
    // } else if (status === 'viajeDiario') {
    //   styleStatus = StyleSheet.create({
    //     styleContainer: {
    //       borderColor: color,
    //       backgroundColor: color,
    //     },
    //     styleText: {
    //       fontWeight: 'bold',
    //     },
    //   });
    // } else if (status === 'meditar-audiolibro') {
    //   styleStatus = StyleSheet.create({
    //     styleContainer: {
    //       borderColor: '#ffffff',
    //       backgroundColor: color,
    //       borderRadius: 10,
    //       paddingVertical: Dims.regularSpace,
    //     },
    //     styleText: {
    //       //fontWeight: 'regular',
    //       fontFamily: 'MyriadPro-Regular',
    //       color: 'white',
    //       lineHeight: 20,
    //     },
    //   });
    //   console.log(styleStatus);
    // }

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
});
