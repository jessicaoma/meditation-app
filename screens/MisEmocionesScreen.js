import React, {Component} from 'react';
import {Button, Text, StyleSheet, Image} from 'react-native';
import {DrawerNavigator} from 'react-navigation';

export default class MisEmocionesScreen extends Component {
  static navigationOptions = {
    
  };

  _handleClick = () => {
    //alert('This is a button!');
    //this.props.navigation.navigate('Viaje');
  };

  render() {
    return (
      <>
        <Text>Mis Emociones</Text>
      </>
    );
  }
}


