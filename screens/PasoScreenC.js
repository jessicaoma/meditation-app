import React, {Component} from 'react';
import {Button, Text, StyleSheet} from 'react-native';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class PasoScreenC extends Component {
  static navigationOptions = {
    title: 'Paso',
  };

  _handleClick = () => {
    //alert('This is a button!');

    this.props.navigation.replace('PasoD');
  };

  render() {
    return (
      <>
        <Text>Paso C</Text>
        {/* <Text>{}</Text> */}
        <Button onPress={this._handleClick} title="Paso D" />
      </>
    );
  }
}

const styles = StyleSheet.create({});
