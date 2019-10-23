import React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
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
    minHeight: '100vh',
  },
  image: {
    resizeMode: 'cover',
  },
});

export default ScreenBg;