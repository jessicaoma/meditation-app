import React, {Component} from 'react';
import {Button, Text, StyleSheet} from 'react-native';

export default class ViajeScreen extends Component {
  static navigationOptions = {
    title: 'Viaje',
  };

  _handleClick = () => {
    //alert('This is a button!');
    this.props.navigation.navigate('Paso');
  };

  render() {
    return (
      <>
        <Text>Viaje</Text>
        <Button onPress={this._handleClick} title="Paso" />
      </>
    );
  }
}

const styles = StyleSheet.create({});
