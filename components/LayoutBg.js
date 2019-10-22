import React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';

const LayoutBg = ({source, children}) => {
  return (
    <SafeAreaView>
      <ImageBackground
        source={source}
        style={styles.container}
        imageStyle={styles.imagen}>
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  imagen: {
    resizeMode: 'cover',
  },
});

export default LayoutBg;
