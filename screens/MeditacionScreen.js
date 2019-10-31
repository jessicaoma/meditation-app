import React, {Component} from 'react';
import ScreenBg from '../components/ScreenBg';
import Player from '../player/Player';

//const src = 'http://okoconnect.com/karim/images/meditar2-full.png';

export default class MeditacionScreen extends Component {
  static navigationOptions = ({navigation}) => {
    let meditacion = navigation.getParam('meditacion', {title: 'Meditación'});
    return {title: meditacion.title};
  };

  render() {
    const {navigation} = this.props;
    let meditacion = navigation.getParam('meditacion', {});
    return (
      <>
        <ScreenBg
          source={{uri: meditacion.backgroundImage}}
          color={meditacion.color}>
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
