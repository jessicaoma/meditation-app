import React, {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 *
 * @extends {Component<Props>}
 */
export default class CancionScreen extends Component {
  /** @param {{navigation : import('react-navigation').NavigationScreenProp}} param*/
  static navigationOptions = ({navigation}) => {
    let cancion = navigation.getParam('cancion', {title: 'Canción'});
    return {title: cancion.title};
  };

  render() {
    const {navigation} = this.props;
    let cancion = navigation.getParam('cancion', {});
    return (
      <>
        <SafeAreaView>
          <ScreenBg
            source={{uri: cancion.backgroundImage}}
            color={cancion.color}
            styleImage={styles.image}>
            <Player
              source={{
                uri: cancion.media,
              }}
              showControls
              //showPlayFrame
              shouldPlay
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
