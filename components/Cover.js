import React from 'react';
import {TouchableHighlight, Image, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';

/**
 * @typedef {Object} Props Properties of the component
 * @property {string} [color] Backgroud color for the image, default value Colors.primary
 * @property {import('react-native').ImageSourcePropType} source Source of the image to render
 * @property {(event: any) => void} [onPress] Callback used when the component is Press
 */

/**
 * A image cover
 * @param {Props} props Props sended to the component
 */
const Cover = ({source, onPress, color}) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <Image
        source={source}
        style={[styles.image, {backgroundColor: color || Colors.primary}]}
      />
    </TouchableHighlight>
  );
};

export default Cover;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    minHeight: 366,
    resizeMode: 'cover',
    borderRadius: 20,
    marginBottom: Dims.bigSpace,
  },
});
