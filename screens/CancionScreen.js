import React, {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Cancion'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Cancion'>} route
 * @extends {Component<Props>}
 */
export default class CancionScreen extends Component {
  /** @param {Props} param*/
  static navigationOptions = ({route}) => {
    return {title: (route.params?.cancion ?? {titulo: 'Cancion'}).titulo};
  };

  /** @param {import('expo-av/build/AV').AVPlaybackStatus} status */
  onEnd = status => {
    this.props.navigation.goBack();
  };

  render() {
    /** @type {import('../utils/types').Canción}*/
    // @ts-ignore
    let cancion = this.props.route.params?.cancion ?? {};
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
