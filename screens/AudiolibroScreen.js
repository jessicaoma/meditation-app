import React, {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import API from '../utils/API';
import {enumStatus} from '../utils/types';

const timer = 10000; // 10 sec

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 *
 * @extends {Component<Props>}
 */
export default class AudiolibroScreen extends Component {
  /** @param {{navigation : import('react-navigation').NavigationScreenProp}} param*/
  static navigationOptions = ({navigation}) => {
    /** @type {import('../utils/types').Audiolibro} */
    let audiolibro = navigation.getParam('audiolibro', {titulo: 'Audiolibro'});
    console.log(audiolibro.progreso);
    return {title: audiolibro.titulo};
  };

  constructor(props) {
    super(props);
    /** @type {import('../utils/types').Audiolibro} */
    this.audiolibro = props.navigation.getParam('audiolibro', {});
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /** @param {import('expo-av/build/AV').PlaybackStatus} status */
  onEnd = status => {
    API.putDiarioAudiolibro(this.audiolibro.key, 0, enumStatus.done);
    this.props.navigation.goBack();
  };

  _callApi = async () => {
    API.putDiarioAudiolibro(
      this.audiolibro.key,
      // @ts-ignore
      (await this.player.playbackInstance.getStatusAsync()).positionMillis,
      enumStatus.doing,
    );
  };

  /** @param {import('expo-av/build/Video.types').ReadyForDisplayEvent} event*/
  onReady = event => {
    this.interval = setInterval(() => {
      this._callApi();
    }, timer);
  };

  onPlayPause = isPlaying => {
    if (isPlaying) {
      clearInterval(this.interval);
      this._callApi();
    } else {
      this.interval = setInterval(() => {
        this._callApi();
      }, timer);
    }
  };

  /** @param {Player} ref*/
  refPlayer = ref => {
    this.player = ref;
  };
  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <ScreenBg
          source={{uri: this.audiolibro.imagenFondo}}
          color={this.audiolibro.color}
          styleImage={styles.image}>
          <Player
            ref={this.refPlayer}
            source={{
              uri: this.audiolibro.media,
            }}
            startPosition={this.audiolibro.progreso}
            showControls
            //showPlayFrame
            shouldPlay
            onEnd={this.onEnd}
            onReadyForDisplay={this.onReady}
            onPlayPause={this.onPlayPause}
          />
        </ScreenBg>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {resizeMode: 'cover'},
});
