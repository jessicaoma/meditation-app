import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
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
    };
  };

  componentDidMount = async () => {
    const {steps, position} = this.props.navigation.state.params;
    const paso = steps[position];
    API.putDiarioPaso(paso.key, enumStatus.doing, null, user);
  };

  nextStep = () => {
    const {steps, position} = this.props.navigation.state.params;
    const {tipo} = steps[position + 1];
    const paso = steps[position];
    API.putDiarioPaso(paso.key, enumStatus.done, null, user);
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
