import React, {Component} from 'react';

import ScreenBg from '../components/ScreenBg';

import Player from '../player/Player';

const src = 'http://okoconnect.com/karim/images/meditar2-full.png';

export default class MeditacionScreen extends Component {
  static navigationOptions = {
    title: 'Meditacion',
  };

  render() {
    return (
      <>
        <ScreenBg source={{uri: src}}>
          <Player
            source={{
              uri:
                'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
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
