import React, {Component} from 'react';
import {Button, Text, StyleSheet} from 'react-native';

export default class MeditacionScreen extends Component {
  static navigationOptions = {
    title: 'Meditacion',
  };

  _handleClick = () => {
    //alert('This is a button!');
    //this.props.navigation.navigate('Paso');
  };

  render() {
    return (
      <>
        <Text>Meditacion</Text>
        <Button onPress={this._handleClick} title="Play" />
      </>
    );
  }
}

const styles = StyleSheet.create({});
