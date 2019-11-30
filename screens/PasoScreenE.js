import React, {Component} from 'react';
import {Button, Text, StyleSheet} from 'react-native';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class PasoScreenE extends Component {
  static navigationOptions = {
    title: 'Paso',
  };

  _handleClick = () => {
    //alert('This is a button!');
    this.props.navigation.replace('PasoF');
  };

  render() {
    return (
      <>
        <Text>Paso E</Text>
        {/* <Text>{}</Text> */}
        <Button onPress={this._handleClick} title="Paso F" />
      </>
    );
  }
}

const styles = StyleSheet.create({});
