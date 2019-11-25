/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View, Text} from 'react-native';
import Colors from '../constants/Colors';

/**
 * @typedef {Object} Props Properties of the component
 * @property {import('react-native').ImageSourcePropType} source Source of the image to render
 * @property {(event: import('react-native').GestureResponderEvent) => void} [onPress] Callback used when the component is Press
 * @property {string} [title] Title of the component
 * @property {number} width Componenet width, is a square
 * @property {number} height Componenet height, is a rectangle
 */

/**
 * A image half cover
 * @param {Props} props Props sended to the component
 */
const HalfCover = ({source, onPress, title, width, height}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.halfCoverContainer, {width: width}]}>
        <View style={styles.button}>
          <Image
            style={{
              width: width - 10,
              height: height - 10,
              resizeMode: 'contain',
            }}
            source={source}
          />
        </View>
        <Text style={[styles.title]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HalfCover;

const styles = StyleSheet.create({
  halfCoverContainer: {
    //flex: 1,
    //flexDirection: 'row',
  },
  button: {
    margin: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  title: {
    marginHorizontal: 5,
    color: Colors.gray,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});
