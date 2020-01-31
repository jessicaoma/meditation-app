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
  //TODO registrar en pause/play el progreso
  //TODO registrar al finalizar el audiolibro a 0

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

  onPlayPause = isPlaing => {};

  /** @param {Player} ref*/
  refPlayer = ref => {
    this.player = ref;
  };
  render() {
    const {navigation} = this.props;
    /** @type {import('../utils/types').Audiolibro} */
    let audiolibro = navigation.getParam('audiolibro', {});
    return (
      <>
        <SafeAreaView>
          <ScreenBg
            source={{uri: audiolibro.imagenFondo}}
            color={audiolibro.color}
            styleImage={styles.image}>
            <Player
              ref={this.refPlayer}
              source={{
                uri: audiolibro.media,
              }}
              startPosition={audiolibro.progreso}
              showControls
              //showPlayFrame
              shouldPlay
              onEnd={this.onEnd}
              onReadyForDisplay={this.onReady}
            />
          </ScreenBg>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  image: {resizeMode: 'cover'},
});
