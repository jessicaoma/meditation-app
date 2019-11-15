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
          //source={{uri: meditacion.backgroundImage}}
          color={reflexion.color}
          //styleImage={{resizeMode: 'cover'}}
        >
          <Player
            source={{
              uri: reflexion.media,
            }}
            isVideo={true}
            resizeMode={'contain'}
            showPlayFrame={false}
          />
        </ScreenBg>
      </>
    );
  }
}
