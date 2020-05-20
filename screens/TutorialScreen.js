import React, {Component} from 'react';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import {SafeAreaView} from 'react-native';

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Tutorial'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Tutorial'>} route
 * @extends {Component<Props>}
 */
export default class TutorialScreen extends Component {
  /** @param {Props} props*/
  static navigationOptions = ({route}) => {
    return {
      title: (route.params?.video ?? {titulo: 'Turotial'}).titulo,
    };
  };

  /** @param {import('expo-av/build/AV').AVPlaybackStatus} status */
  onEnd = status => {
    this.props.navigation.goBack();
  };

  render() {
    /** @type {import("../utils/types").Video} */
    // @ts-ignore
    let video = this.props.route.params?.video ?? {};
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
