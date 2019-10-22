import React, {Component} from 'react';
import {Button, Text, StyleSheet} from 'react-native';

export default class AudiolibrosScreen extends Component {
  static navigationOptions = {
    title: 'AudioLibros',
    header: null,
  };

  _handleClick = () => {
    //alert('This is a button!');
    this.props.navigation.navigate('Audiolibro');
  };

  render() {
    return (
      <>
        <Text>AudioLibros</Text>
        <Button onPress={this._handleClick} title="Audiolibro 1" />
        <Button onPress={this._handleClick} title="Audiolibro 2" />
        <Button onPress={this._handleClick} title="Audiolibro 3" />
      </>
    );
  }
}

const styles = StyleSheet.create({});
