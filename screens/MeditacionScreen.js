import React, {Component} from 'react';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';

export default class MeditacionScreen extends Component {
  static navigationOptions = ({navigation}) => {
    let meditacion = navigation.getParam('meditacion', {title: 'Meditación'});
    return {title: meditacion.title, headerBackTitle: null};
  };

  render() {
    const {navigation} = this.props;
    let meditacion = navigation.getParam('meditacion', {});
    return (
      <>
        <ScreenBg
          //source={{uri: meditacion.backgroundImage}}
          color={meditacion.color}
          //styleImage={{resizeMode: 'cover'}}
        >
          <Player
            source={{
              uri: meditacion.media,
            }}
            isVideo={true}
            resizeMode={'contain'}
            showPlayFrame={false}
            shouldPlay
          />
        </ScreenBg>
      </>
    );
  }
}
