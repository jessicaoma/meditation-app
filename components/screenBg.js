import React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import Colors from '../constants/Colors';

const ScreenBg = ({source, color, children}) => {
  return (
    <SafeAreaView>
      <ImageBackground
        source={source}
        style={styles.container}
        imageStyle={styles.image, {backgroundColor: color || Colors.primary}}>
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    minHeight: Dimensions.get('window').height,
  },
  image: {
    resizeMode: 'cover',
  },
});

export default ScreenBg;