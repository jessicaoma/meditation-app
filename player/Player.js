import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Audio} from 'expo-av';
import Controls from './Controls';
import ScreenView from './ScreenView';
import PlayVideoButton from '../components/playVideoButton';
import {millisToMinSeg} from '../utils/convert';
//TODO agregar llamada en play/pause
//TODO agregar posicion inicial para la reproduccion (audiolibro)

/**
 * Player componet for all media used in the app
 * @typedef {object} Props
 * @prop {import('expo-av/build/AV').PlaybackSource} source Source of the audio/video
 * @prop {boolean} [isVideo] Indicate that the source is a video
 * @prop {boolean} [showControls] Indicate that the controls most be show, default false
 * @prop {boolean} [showPlayFrame] Indicate that the incial play button controls most be show, default false
 * @prop {boolean} [shouldPlay] A boolean describing if the media is supposed to play
 * @prop {import('react-native').ViewStyle|import('react-native').StyleSheet.absoluteFill} [style] Style to aplie to View container
 * @prop {import('react-native').ViewStyle|import('react-native').ViewStyle[]} [styleVideo] Style for the video
 * @prop {(status: import('expo-av/build/AV').PlaybackStatus) => void} [onEnd] Callback when media is ends
 * @prop {(event: import('expo-av/build/Video.types').ReadyForDisplayEvent) => any} [onReadyForDisplay] Call when the video is ready to play
 * @prop {import('expo-av/build/Video.types').ResizeMode | 'stretch' | 'cover' | 'contain'} [resizeMode] How the video should be scaled for display in the component, default 'stretch'
 * @prop {number} [startPosition] Set the starting point
 * @prop {(isPlaying: boolean) => void} [onPlayPause] Callback when is press the button play/pause
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
    /** @type {Audio.Sound | import('expo-av').Video} */
    this.playbackInstance = null;
    this.resizeMode = props.resizeMode || 'stretch';

    this.state = {
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: true,
      isPlaying: false,
      isBuffering: true,
      isLoading: true,
      showPlayer: false,
      isFirstLoad: true,
      showControls: props.showControls,
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
    if (this.playbackInstance !== null) {
      this.playbackInstance.unloadAsync();
      if (!this.props.isVideo) {
        // @ts-ignore
        this.playbackInstance.setOnPlaybackStatusUpdate(null);
      }
      this.playbackInstance = null;
    }
  }

  async _loadNewPlaybackInstance() {
    const source = this.props.source;
    if (typeof source !== 'number' && source.uri === undefined) {
      return null;
    }
    // https://docs.expo.io/versions/v35.0.0/sdk/av/#default-initial-playbackstatustoset
    /** @type {import('expo-av/build/AV').PlaybackStatusToSet} */
    const initialStatus = {
      shouldPlay: this.props.shouldPlay,
      positionMillis: this.props.startPosition || 0,
      //isLooping: this.props.isLooping,
    };
    if (initialStatus.shouldPlay) {
      this.setState({showPlayer: true});
    }
    if (this.props.isVideo) {
      await this._video.loadAsync(source, initialStatus);
      this.playbackInstance = this._video;
      //const status = await this._video.getStatusAsync();
    } else {
      const {sound} = await Audio.Sound.createAsync(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate,
      );
      this.playbackInstance = sound;
      if (this.props.onReadyForDisplay !== undefined) {
        this.props.onReadyForDisplay({
          naturalSize: null,
          status: await sound.getStatusAsync(),
        });
      }
    }
    this.setState({isLoading: false});
  }

  /** @param {import('expo-av/build/AV').PlaybackStatus} status */
  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
      });
      if (status.didJustFinish && this.props.onEnd !== undefined) {
        this.props.onEnd(status);
      }
    } else {
      // @ts-ignore
      if (status.error) {
        // @ts-ignore
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };
  /** @param {import('expo-av').Video} component */
  _refVideo = component => {
    this._video = component;
    if (this.state.isFirstLoad) {
      this._loadNewPlaybackInstance();
      this.setState({isFirstLoad: false});
    }
  };

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
      if (this.props.onPlayPause !== undefined) {
        this.props.onPlayPause(this.state.isPlaying);
      }
    }
  };

  _onSeekSliderValueChange = () => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  /** @param {number} value */
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

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return millisToMinSeg(this.state.playbackInstancePosition);
    }
    return '';
  }

  _startPlayer = () => {
    if (!this.state.isLoading) {
      this.setState({
        showPlayer: true,
      });
      this._onPlayPausePressed();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.container,
            this.state.showPlayer ? styles.show : styles.hidden,
          ]}>
          <ScreenView
            refVideo={this._refVideo}
            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
            styleVideo={this.props.styleVideo}
            onReadyForDisplay={this.props.onReadyForDisplay}
            resizeMode={this.resizeMode}
            shouldPlay={this.props.shouldPlay}
          />
          {this.state.showControls && (
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
          isShow={this.props.showPlayFrame && !this.state.showPlayer}
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
  hidden: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
});
