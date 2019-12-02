import React, {Component} from 'react';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import {SafeAreaView} from 'react-native';

/**
 * @typedef {object} Props
 * @prop {import('react-navigation').NavigationScreenProp} [navigation]
 * @extends {Component<Props>}
 */
export default class TutorialScreen extends Component {
  static navigationOptions = ({navigation}) => {
    //let reflexion = navigation.getParam('reflexion', {title: 'Meditación'});
    return {title: 'Tutorial', headerBackTitle: null};
  };

  render() {
    const {navigation} = this.props;
    let reflexion = navigation.getParam('reflexion', {});
    return (
      <>
        <SafeAreaView>
          <ScreenBg
            source={{
              uri: 'http://okoconnect.com/karim/images/video-preview.jpeg',
            }}
            color={reflexion.color}
            styleImage={{resizeMode: 'contain'}}>
            <Player
              source={{
                uri:
                  'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
              }}
              showControls
              shouldPlay
            />
          </ScreenBg>
        </SafeAreaView>
      </>
    );
  }
}
