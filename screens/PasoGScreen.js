import React, {Component} from 'react';
import {Button, Text, StyleSheet} from 'react-native';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class PasoGScreen extends Component {
  static navigationOptions = {
    title: 'Paso',
  };

  _handleClick = () => {
    //alert('This is a button!');
    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <>
        <Text>Paso C</Text>
        {/* <Text>{}</Text> */}
        <Button onPress={this._handleClick} title="Regresar al viaje" />
      </>
    );
  }
}

const styles = StyleSheet.create({});
