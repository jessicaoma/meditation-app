import React, {Component} from 'react';
import {Button, Text, StyleSheet} from 'react-native';

export default class AngelScreen extends Component {
  static navigationOptions = {
    title: 'Tu ángel',
  };

  _handleClick = () => {
    //alert('This is a button!');
    //this.props.navigation.navigate('Paso');
  };

  render() {
    return (
      <>
        <Text>Angel</Text>
      </>
    );
  }
}

const styles = StyleSheet.create({});
