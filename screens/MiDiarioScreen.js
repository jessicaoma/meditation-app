import React, {Component} from 'react';
import {Button, Text, StyleSheet} from 'react-native';

export default class MiDiarioScreen extends Component {
  static navigationOptions = {
    //title: 'Paso',
  };

  _handleClick = () => {
    //alert('This is a button!');
    //this.props.navigation.navigate('Viaje');
  };

  render() {
    return (
      <>
        <Text>Mi Diario</Text>
      </>
    );
  }
}

const styles = StyleSheet.create({});
