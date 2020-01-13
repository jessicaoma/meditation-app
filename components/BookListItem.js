import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from 'react-native';

/**
 * @typedef Props
 * @property {import('react-native').ImageSourcePropType} source Source of the image to render
 * @property {(event: import('react-native').GestureResponderEvent) => void} [onPress] Handle press event
 * @property {number} width Componenet width
 * @property {number} height Componenet height
 * Books List Item
 * @param {Props} props Props sended to the component
 */
const BookListItem = ({source, onPress, width, height}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, {width: width}]}>
        <View>
          <Image
            style={[
              styles.image,
              {
                width: width,
                height: height,
              },
            ]}
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
  image: {
    resizeMode: 'contain',
    borderRadius: 20,
  },
});
