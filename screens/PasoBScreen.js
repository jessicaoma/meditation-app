import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
//TODO comportamiento al finalizar video
//TODO registrar avance
/**
 * Paso Tipo(B): Teoría
 * @typedef {Object} ParamsNavigation
 * @prop {import('../utils/types').Paso[]} steps
 * @prop {number} position
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 *
 * @extends {Component<Props>}
 */
export default class PasoBScreen extends Component {
  static navigationOptions = ({navigation}) => {
    /** @type {ParamsNavigation} */
    const {steps, position} = navigation.state.params;
    return {
      title: steps[position].titulo,
      headerStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },
    };
  };

  nextStep = () => {
    const {steps, position} = this.props.navigation.state.params;
    const {tipo} = steps[position + 1];
    // @ts-ignore
    this.props.navigation.replace(`Paso${String.fromCharCode(65 + tipo)}`, {
      steps,
      position: position + 1,
    });
  };

  render() {
    const {steps, position} = this.props.navigation.state.params;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScreenBg
          source={{uri: steps[position].imagenFondo}}
          color={steps[position].color}
          styleImage={{resizeMode: 'cover'}}>
          <Player
            source={{
              uri: steps[position].media,
            }}
            showPlayFrame
            showControls
            onEnd={this.nextStep}
          />
        </ScreenBg>
      </SafeAreaView>
    );
  }
}
