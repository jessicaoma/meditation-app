import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
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
