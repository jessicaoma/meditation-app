import React, {Component} from 'react';
import {Button, Text, StyleSheet} from 'react-native';

export default class AudiolibroScreen extends Component {
  static navigationOptions = {
    title: 'AudioLibros',
  };

  _handleClick = () => {
    //alert('This is a button!');
    //this.props.navigation.navigate('Audiolibro');
  };

  render() {
    return (
      <>
        <Text>AudioLibro</Text>
        <Button onPress={this._handleClick} title="Play" />
      </>
    );
  }
}

const styles = StyleSheet.create({});
