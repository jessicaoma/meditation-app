import React, {Component} from 'react';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 *
 * @extends {Component<Props>}
 */
export default class BienvenidaScreen extends Component {
  static navigationOptions = {
    title: 'Bienvenida',
    headerBackTitle: null,
  };

  render() {
    //const {navigation} = this.props;
    //let reflexion = navigation.getParam('reflexion', {});
    return (
      <>
        <ScreenBg
          source={{
            uri: 'http://okoconnect.com/karim/images/video-preview.jpeg',
          }}
          //color={reflexion.color}
          // eslint-disable-next-line react-native/no-inline-styles
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
      </>
    );
  }
}
