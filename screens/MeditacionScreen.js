import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';

export default class MeditacionScreen extends Component {
  static navigationOptions = ({navigation}) => {
    let meditacion = navigation.getParam('meditacion', {title: 'Meditación'});
    return {title: meditacion.title, headerBackTitle: null};
  };

  /** @type {Player} */
  audio = null;

  _handleEndIntro = status => {
    console.log('end intro');
    this.audio.setState({showControls: true, showPlayer: true});
    this.audio._onPlayPausePressed();
  };

  refAudio = ref => {
    this.audio = ref;
  };

  render() {
    const {navigation} = this.props;
    let meditacion = navigation.getParam('meditacion', {});
    return (
      <>
        <ScreenBg
          source={{uri: meditacion.backgroundImage}}
          color={meditacion.color}
          styleImage={{resizeMode: 'cover'}}>
          <View style={styles.container}>
            {/* <Player
              source={{
                uri: 'http://okoconnect.com/karim/videos/pre_meditacion.mp4',
                //uri: meditacion.media,
              }}
              isVideo
              resizeMode={'contain'}
              shouldPlay
              //showControls
              onEnd={this._handleEndIntro}
            /> */}
            {/* <View
              style={[
                styles.container,
                StyleSheet.absoluteFill,
                styles.border2,
              ]}> */}
            <Player
              source={{
                uri:
                  'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
                //uri: meditacion.media,
              }}
              //ref={this.refAudio}
              showControls
              showPlayFrame
            />
            {/* </View> */}
          </View>
        </ScreenBg>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  border1: {
    borderWidth: 1,
    borderColor: '#f00',
  },
  border2: {
    borderWidth: 1,
    borderColor: '#ff0',
  },
});
