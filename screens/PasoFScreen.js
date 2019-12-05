import React, {Component} from 'react';
import {Button, Text, StyleSheet} from 'react-native';

/**
 * Paso Tipo(F): Diario
 * @typedef {Object} ParamsNavigation
 * @prop {import('../utils/types').Paso[]} steps
 * @prop {number} position
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 *
 * @extends {Component<Props>}
 */
export default class PasoFScreen extends Component {
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

  nextStep = () => {
    const {steps, position} = this.props.navigation.state.params;
    const {type} = steps[position + 1];
    this.props.navigation.replace(`Paso${type}`, {
      steps,
      position: position + 1,
    });
  };

  render() {
    return (
      <>
        <Text>Paso F</Text>
        {/* <Text>{}</Text> */}
        <Button onPress={this.nextStep} title="Paso G" />
      </>
    );
  }
}

const styles = StyleSheet.create({});
