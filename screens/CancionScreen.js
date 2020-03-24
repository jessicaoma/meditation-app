import React, {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
//TODO comportamiento al finalizar el audio
/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 *
 * @extends {Component<Props>}
 */
export default class CancionScreen extends Component {
  /** @param {{navigation : import('react-navigation').NavigationScreenProp}} param*/
  static navigationOptions = ({navigation}) => {
    /** @type {import('../utils/types').Canción}*/
    let cancion = navigation.getParam('cancion', {titulo: 'Canción'});
    return {title: cancion.titulo};
  };

  /** @param {import('expo-av/build/AV').PlaybackStatus} status */
  onEnd = status => {
    this.props.navigation.goBack();
  };

  render() {
    const {navigation} = this.props;
    /** @type {import('../utils/types').Canción}*/
    let cancion = navigation.getParam('cancion', {});
    return (
      <SafeAreaView style={styles.safe}>
        <ScreenBg
          source={{uri: cancion.imagenFondo}}
          color={cancion.color}
          styleImage={styles.image}>
          <Player
            source={{
              uri: cancion.media,
            }}
            showControls
            shouldPlay
            onEnd={this.onEnd}
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
