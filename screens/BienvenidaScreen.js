import React, {Component} from 'react';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import {SafeAreaView} from 'react-native';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class BienvenidaScreen extends Component {
  static navigationOptions = ({navigation}) => {
    /** @type {import("../utils/types").Video} */
    let video = navigation.getParam('video', {titulo: 'Bienvenida'});
    return {title: video.titulo, headerBackTitle: null};
  };

  render() {
    /** @type {import("../utils/types").Video} */
    let video = this.props.navigation.getParam('video', {});
    return (
      <SafeAreaView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1}}>
        <ScreenBg
          source={{uri: video.imagenFondo}}
          color={video.color}
          // eslint-disable-next-line react-native/no-inline-styles
          styleImage={{resizeMode: 'contain'}}>
          <Player source={{uri: video.media}} showControls shouldPlay isVideo />
        </ScreenBg>
      </SafeAreaView>
    );
  }
}
