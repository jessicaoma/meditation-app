import React, {Component} from 'react';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';

export default class ReflexionScreen extends Component {
  static navigationOptions = ({navigation}) => {
    let reflexion = navigation.getParam('reflexion', {title: 'Meditación'});
    return {title: reflexion.title, headerBackTitle: null};
  };

  render() {
    const {navigation} = this.props;
    let reflexion = navigation.getParam('reflexion', {});
    return (
      <>
        <ScreenBg
          source={{uri: reflexion.imagebg}}
          color={reflexion.color}
          styleImage={{resizeMode: 'contain'}}>
          <Player
            source={{
              uri: reflexion.media,
            }}
            showControls
            shouldPlay
          />
        </ScreenBg>
      </>
    );
  }
}
