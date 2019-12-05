import React, {Component} from 'react';
import {Button, Text, StyleSheet} from 'react-native';

/**
 * Paso Tipo(G): Cierre
 * @typedef {Object} ParamsNavigation
 * @prop {import('../utils/types').Paso[]} steps
 * @prop {number} position
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 *
 * @extends {Component<Props>}
 */
export default class PasoGScreen extends Component {
  static navigationOptions = ({navigation}) => {
    /** @type {ParamsNavigation} */
    const {steps, position} = navigation.state.params;
    return {
      title: steps[position].title,
      headerStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },
    };
  };

  returnJourney = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <>
        <Text>Paso C</Text>
        {/* <Text>{}</Text> */}
        <Button onPress={this.returnJourney} title="Regresar al viaje" />
      </>
    );
  }
}

const styles = StyleSheet.create({});
