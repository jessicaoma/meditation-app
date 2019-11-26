import React, {Component} from 'react';
import {Button, Text, StyleSheet} from 'react-native';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class PasoScreen extends Component {
  static navigationOptions = {
    title: 'Paso',
  };

  _handleClick = () => {
    //alert('This is a button!');
    //this.props.navigation.navigate('Viaje');
  };

  render() {
    return (
      <>
        <Text>Paso</Text>
        <Button onPress={this._handleClick} title="Paso?" />
      </>
    );
  }
}

const styles = StyleSheet.create({});
