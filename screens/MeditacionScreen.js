import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PlayVideoButton from '../components/playVideoButton';
import ScreenBg from '../components/ScreenBg';

const src = 'http://okoconnect.com/karim/images/meditar2-full.png';

export default class MeditacionScreen extends Component {
  static navigationOptions = {
    title: 'Meditacion',
  };

  render() {
    return (
      <>
        <ScreenBg source={{uri: src}}>
          <View style={styles.center}>
            <PlayVideoButton />
          </View>
        </ScreenBg>
      </>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
