import React, {Component} from 'react';
import {Button, Text, StyleSheet} from 'react-native';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class PasoScreenF extends Component {
  static navigationOptions = {
    title: 'Paso',
  };

  _handleClick = () => {
    //alert('This is a button!');
    this.props.navigation.replace('PasoG');
  };

  render() {
    return (
      <>
        <Text>Paso F</Text>
        {/* <Text>{}</Text> */}
        <Button onPress={this._handleClick} title="Paso G" />
      </>
    );
  }
}

const styles = StyleSheet.create({});
