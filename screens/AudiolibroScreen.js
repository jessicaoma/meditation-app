import React, {Component} from 'react';
import ScreenBg from '../components/ScreenBg';
import Player from '../player/Player';

export default class AudiolibroScreen extends Component {
  static navigationOptions = ({navigation}) => {
    let audiolibro = navigation.getParam('audiolibro', {title: 'Audiolibro'});
    return {title: audiolibro.title};
  };

  render() {
    const {navigation} = this.props;
    let audiolibro = navigation.getParam('audiolibro', {});
    return (
      <>
        <ScreenBg
          source={{uri: audiolibro.backgroundImage}}
          color={audiolibro.color}
          resizeMode={'contain'}>
          <Player
            source={{
              uri: audiolibro.media,
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
