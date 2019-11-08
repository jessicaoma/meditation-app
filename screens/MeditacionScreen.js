import React, {Component} from 'react';
import ScreenBg from '../components/ScreenBg';
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
          source={{uri: meditacion.backgroundImage}}
          color={meditacion.color}
          resizeMode={'cover'}>
          <Player
            source={{
              uri: meditacion.media,
            }}
            isVideo={false}
          />
          {/* <Player
            source={{
              uri:
                'https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4',
            }}
            isVideo={true}
          /> */}
        </ScreenBg>
      </>
    );
  }
}
