import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Audio} from 'expo-av';
import Controls from './Controls';
import ScreenView from './ScreenView';
import PlayVideoButton from '../components/playVideoButton';

//const VIDEO_CONTAINER_HEIGHT = (Dimensions.window.height * 2.0) / 5.0 - 14 * 2;
/**
 * Player componet for all media used in the app
 * @typedef {object} Props
 * @prop {import('expo-av/build/AV').PlaybackSource} source Source of the audio/video
 * @prop {boolean} isVideo True when the source is a video, false to audio
 * @prop {boolean} [showControls] Indicate that the controls most be show, default true
 * @prop {import('react-native').ViewStyle} [styleVideo] Style for the video
 * @prop {boolean} [showPlayFrame] Indicate that the incial play button controls most be show, default true
 * @prop {(status: import('expo-av/build/AV').PlaybackStatus) => void} [onEnd] Callback when media is ends
 * @prop {(event: import('expo-av/build/Video.types').ReadyForDisplayEvent) => any} [onReadyForDisplay] Call when the video is ready to play
 * @prop {import('expo-av/build/Video.types').ResizeMode | 'stretch' | 'cover' | 'contain'} [resizeMode] How the video should be scaled for display in the component, default 'stretch'
 * @prop {boolean} [shouldPlay] A boolean describing if the media is supposed to play
 *
 * @extends {Component<Props>}
 */
export default class Player extends Component {
  /**
   * Constuctor
   * @param {Props} props Initial Propertites
   */
  constructor(props) {
    super(props);
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.resizeMode = props.resizeMode || 'stretch';
    this.showControls = true; //default
    let showPlayer = false; //default

    if (props.showControls !== undefined) {
      this.showControls = props.showControls;
    }
    if (!this.showControls) {
      showPlayer = true;
    } else if (props.showPlayFrame !== undefined) {
      showPlayer = !props.showPlayFrame;
    }
    this.state = {
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: props.shouldPlay || false,
      isPlaying: false,
      isBuffering: false,
      //isLoading: props.shouldPlay || false,
      //videoWidth: Dimensions.window.width,
      //videoHeight: VIDEO_CONTAINER_HEIGHT,
      //poster: false,
      //useNativeControls: false,
      //fullscreen: false,
      showPlayer: showPlayer,
    };
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });
  }

  componentWillUnmount() {
    //console.log('unmound player')
    if (this.playbackInstance !== null) {
      this.playbackInstance.unloadAsync();
      //this.playbackInstance.setOnPlaybackStatusUpdate(null);
      //this.playbackInstance = null;
    }
  }

  //creacion de las intancias
  async _loadNewPlaybackInstance() {
    const source = this.props.source;
    // https://docs.expo.io/versions/v35.0.0/sdk/av/#default-initial-playbackstatustoset
    const initialStatus = {
      shouldPlay: this.state.shouldPlay,
      //rate: this.state.rate,
      //shouldCorrectPitch: this.state.shouldCorrectPitch,
      //volume: this.state.volume,
      //isMuted: this.state.muted,
      //isLooping: this.props.isLooping,
    };

    if (this.props.isVideo) {
      //console.log(this._onPlaybackStatusUpdate);
      await this._video.loadAsync(source, initialStatus);
      // this._video.onPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
      this.playbackInstance = this._video;
      //const status = await this._video.getStatusAsync();
    } else {
      const {sound, status} = await Audio.Sound.createAsync(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate,
      );
      this.playbackInstance = sound;
    }

    this.setState({isLoading: false});
  }

  /**
   * @param {import('expo-av/build/AV').PlaybackStatus} status
   */
  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        //rate: status.rate,
        //muted: status.isMuted,
        //volume: status.volume,
        //loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
        //shouldCorrectPitch: status.shouldCorrectPitch,
      });
      if (status.didJustFinish && this.props.onEnd !== undefined) {
        //console.log('toend');
        this.props.onEnd(status);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };
  /**
   * @param {import('expo-av').Video} component
   */
  _refVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance();
  };

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  //Callback cuando se comienza a mover el slider
  _onSeekSliderValueChange = value => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  //Callback cuando se termina de mover el slider
  _onSeekSliderSlidingComplete = async value => {
    if (this.playbackInstance != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.playbackInstanceDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        this.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return (
        this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration
      );
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return this._getMMSSFromMillis(this.state.playbackInstancePosition);
    }
    return '';
  }

  _startPlayer = () => {
    this.setState({
      showPlayer: true,
    });
    this._onPlayPausePressed();
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            display: this.state.showPlayer ? 'flex' : 'none',
            height: '100%',
          }}>
          <ScreenView
            refVideo={this._refVideo}
            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
            styleVideo={this.props.styleVideo}
            onReadyForDisplay={this.props.onReadyForDisplay}
            resizeMode={this.resizeMode}
            posterSource={this.props.posterSource}
            posterStyle={this.props.posterStyle}
          />
          {this.showControls && (
            <Controls
              isPlaying={this.state.isPlaying}
              onPress={this._onPlayPausePressed}
              currentTime={this._getTimestamp()}
              isLoading={this.state.isLoading}
              onSliderValueChange={this._onSeekSliderValueChange}
              onSlidingComplete={this._onSeekSliderSlidingComplete}
              seekSliderPosition={this._getSeekSliderPosition()}
            />
          )}
        </View>
        <PlayVideoButton
          isShow={!this.state.showPlayer}
          onPress={this._startPlayer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
