import React, {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import API from '../utils/API';
import {enumStatus} from '../utils/types';
import {connect} from 'react-redux';

const timer = 10000; // 10 sec

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Audiolibro'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Audiolibro'>} route
 * @prop {import('../utils/types').Usuario} usuario
 * @extends {Component<Props>}
 */
class AudiolibroScreen extends Component {
  /** @param {Props} props*/
  static navigationOptions = props => {
    return {
      title: (props.route.params?.audiolibro ?? {titulo: 'Audilibro'}).titulo,
    };
  };

  /** @param {Props} props*/
  constructor(props) {
    super(props);
    /** @type {import('../utils/types').Audiolibro } */
    this.audiolibro = props.route.params.audiolibro;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /** @param {import('expo-av/build/AV').AVPlaybackStatus} status */
  onEnd = status => {
    API.putDiarioAudiolibro(
      this.audiolibro.key,
      0,
      enumStatus.done,
      this.props.usuario.token,
    );
    this.props.navigation.goBack();
  };

  _callApi = async () => {
    API.putDiarioAudiolibro(
      this.audiolibro.key,
      // @ts-ignore
      (await this.player.playbackInstance.getStatusAsync()).positionMillis,
      enumStatus.doing,
      this.props.usuario.token,
    );
  };

  /** @param {import('expo-av/build/Video.types').VideoReadyForDisplayEvent} event*/
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

function mapStateToProps(state) {
  return {
    usuario: state.usuario,
  };
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {resizeMode: 'cover'},
});

export default connect(mapStateToProps)(AudiolibroScreen);
