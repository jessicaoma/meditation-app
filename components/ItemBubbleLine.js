import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import Dims from '../constants/Dimensions';
import Colors from '../constants/Colors';

export default class ItemBubbleLine extends Component {
  render() {
    let {color, status, onPress} = this.props;
    let styleStatus = {};
    if (status === 'done') {
      styleStatus = StyleSheet.create({
        styleContainer: {
          borderColor: color,
        },
        styleText: {
          fontWeight: 'bold',
        },
        circle: {
          borderColor: Colors.primaryDark,
        },
        checkedCircle: {
          backgroundColor: color,
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
        circle: {
          borderColor: Colors.primaryDark,
        },
        checkedCircle: {
          backgroundColor: Colors.borderWhite,
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
        circle: {
          display: 'none',
        },
      });
    }
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
    //justifyContent: 'left',
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
    borderColor: '#919394',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginVertical: 12,
  },
  checkedCircle: {
    width: 11,
    height: 11,
    borderRadius: 7,
    backgroundColor: 'white',
  },
});
