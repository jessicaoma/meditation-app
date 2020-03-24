import React, {Component} from 'react';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import {SafeAreaView} from 'react-native';

/**
 * @typedef {object} Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class TutorialScreen extends Component {
  static navigationOptions = ({navigation}) => {
    /** @type {import("../utils/types").Video} */
    let video = navigation.getParam('video', {titulo: 'Turotial'});
    return {title: video.titulo, headerBackTitle: null};
  };

  /** @param {import('expo-av/build/AV').PlaybackStatus} status */
  onEnd = status => {
    this.props.navigation.goBack();
  };

  render() {
    /** @type {import("../utils/types").Video} */
    let video = this.props.navigation.getParam('video', {});
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScreenBg
          source={{uri: video.imagenFondo}}
          color={video.color}
          styleImage={{resizeMode: 'contain'}}>
          <Player
            source={{uri: video.media}}
            showControls
            shouldPlay
            isVideo
            onEnd={this.onEnd}
          />
        </ScreenBg>
      </SafeAreaView>
    );
  }
}
