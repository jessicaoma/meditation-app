import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Dims from '../constants/Dimensions';
import Colors from '../constants/Colors';

export default class ItemBubble extends Component {
  render() {
    let {color, status, onPress} = this.props;
    let styleStatus = {};
    if (status === 'done') {
      styleStatus = StyleSheet.create({
        styleContainer: {
          borderColor: color,
          backgroundColor: color,
        },
        styleText: {
          fontWeight: 'bold',
        },
      });
    } else if (status === 'doing') {
      styleStatus = StyleSheet.create({
        styleContainer: {
          borderColor: color,
        },
        styleText: {
          fontWeight: 'bold',
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
    marginBottom: Dims.bigSpace,
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 0,
    paddingHorizontal: Dims.bigSpace,
    borderColor: Colors.borderWhite,
  },
  text: {
    //font-family: "MyriadPro-Regular",
    lineHeight: 56,
    fontSize: 16,
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
