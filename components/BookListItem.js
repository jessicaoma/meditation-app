/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View, Text} from 'react-native';
import Colors from '../constants/Colors';

/**
 * Books List Item
 * @param {Props} props Props sended to the component
 */
const BookListItem = ({source, onPress, title, width, height}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, {width: width}]}>
        <View>
          <Image
            style={{
              width: width,
              resizeMode: 'contain',
              height: height,
              borderRadius: 10,
            }}
            source={source}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});