import React, {Component} from 'react';
import {Button, Text, StyleSheet, Image} from 'react-native';
import PlayVideoButton from '../components/playVideoButton';
import ScreenBg from '../components/screenBg';
import Cover from '../components/Cover';

const src = 'http://okoconnect.com/karim/images/meditar2-full.png';
const resizeMode = 'center';

export default class MeditacionScreen extends Component {
  static navigationOptions = {
    title: 'Meditacion',
  };

  render() {

    return (
      <>
        <ScreenBg source={{uri: src}}>
          <PlayVideoButton />
          
        </ScreenBg>
      </>
    );
  }
}

const styles = StyleSheet.create({
  
});
