import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Audio} from 'expo-av';
import Controls from './Controls';
import ScreenView from './ScreenView';
import PlayVideoButton from '../components/playVideoButton';

//const VIDEO_CONTAINER_HEIGHT = (Dimensions.window.height * 2.0) / 5.0 - 14 * 2;

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: true,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      //videoWidth: Dimensions.window.width,
      //videoHeight: VIDEO_CONTAINER_HEIGHT,
      //poster: false,
      //useNativeControls: false,
      //fullscreen: false,
      showPlayer: false,
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

  /*componentWillUnmount() {
    if (this.playbackInstance !== null) {
      this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }
  }*/

  //creacion de las intancias
  async _loadNewPlaybackInstance(playing) {
    const source = this.props.source;
    // https://docs.expo.io/versions/v35.0.0/sdk/av/#default-initial-playbackstatustoset
    const initialStatus = {
      shouldPlay: playing,
      //rate: this.state.rate,
      //shouldCorrectPitch: this.state.shouldCorrectPitch,
      //volume: this.state.volume,
      //isMuted: this.state.muted,
      // isLooping: this.state.loopingType === LOOPING_TYPE_ONE
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
    };

    if (this.props.isVideo) {
      console.log(this._onPlaybackStatusUpdate);
      await this._video.loadAsync(source, initialStatus);
      // this._video.onPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
      this.playbackInstance = this._video;
      const status = await this._video.getStatusAsync();
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
        shouldCorrectPitch: status.shouldCorrectPitch,
      });
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _refVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance(false);
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
    console.log('change');
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  //Callback cuando se termina de mover el slider
  _onSeekSliderSlidingComplete = async value => {
    console.log('complete');
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
          />
          <Controls
            isPlaying={this.state.isPlaying}
            onPress={this._onPlayPausePressed}
            currentTime={this._getTimestamp()}
            isLoading={this.state.isLoading}
            onSliderValueChange={this._onSeekSliderValueChange}
            onSlidingComplete={this._onSeekSliderSlidingComplete}
            seekSliderPosition={this._getSeekSliderPosition()}
          />
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
