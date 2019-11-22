import React, {Component} from 'react';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';

export default class BienvenidaScreen extends Component {
  static navigationOptions = ({navigation}) => {
    //let reflexion = navigation.getParam('reflexion', {title: 'Meditación'});
    return {title: 'Bienvenida', headerBackTitle: null};
  };

  render() {
    const {navigation} = this.props;
    let reflexion = navigation.getParam('reflexion', {});
    return (
      <>
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
      </>
    );
  }
}
