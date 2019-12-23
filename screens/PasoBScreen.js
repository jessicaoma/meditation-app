import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';

/**
 * Paso Tipo(B): Teoria
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
        <SafeAreaView style={{flex: 1}}>
          <ScreenBg
            source={{uri: 'http://okoconnect.com/karim/images/slider-bg-6.png'}}
            //color={'#fdd58d'}
            styleImage={{resizeMode: 'cover'}}>
            <Player
              source={{
                uri:
                  'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
              }}
              showPlayFrame
              showControls
              onEnd={this.nextStep}
            />
          </ScreenBg>
        </SafeAreaView>
      </>
    );
  }
}
