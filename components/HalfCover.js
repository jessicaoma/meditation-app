import React from 'react';
import {TouchableHighlight, Image, StyleSheet, View, Text} from 'react-native';
import Colors from '../constants/Colors';

/**
 * @typedef {Object} Props Properties of the component
 * @property {string} [color] Backgroud color for the image, default value Colors.primary
 * @property {import('react-native').ImageSourcePropType} source Source of the image to render
 * @property {(event: any) => void} [onPress] Callback used when the component is Press
 * @property {string} [title] Title of the component
 * @property {number} width Componenet width, is a square
 * @property {number} height Componenet height, is a rectangle
 */

/**
 * A image half cover
 * @param {Props} props Props sended to the component
 */
const HalfCover = ({source, onPress, color, title, width, height}) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={[styles.halfCoverContainer, {width: width}]}>
        <Image
          style={[
            styles.image,
            {
              backgroundColor: color || Colors.primary,
              width: width - 10,
              height: height - 10,
            },
          ]}
          source={source}
        />
        <Text style={[styles.title]}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default HalfCover;

const styles = StyleSheet.create({
  halfCoverContainer: {
    flex: 1,
    //flexDirection: 'row',
  },
  image: {
    margin: 5,
    resizeMode: 'contain',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  title: {
    marginHorizontal: 5,
    color: Colors.grey,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});
