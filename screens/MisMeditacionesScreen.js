import React, {Component} from 'react';
import {Button, Text, StyleSheet} from 'react-native';

export default class MisMeditacionesScreen extends Component {
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
        <Text>Mis Meditaciones</Text>
      </>
    );
  }
}

const styles = StyleSheet.create({});
