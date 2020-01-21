import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
//TODO regsitrar meditacion completada
/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{param:{meditacion:import('../utils/types').Meditación}}>} navigation
 * @extends {Component<Props>}
 */
export default class MeditacionScreen extends Component {
  static navigationOptions = ({navigation}) => {
    /** @type {import('../utils/types').Meditación} */
    let meditacion = navigation.getParam('meditacion', {titulo: 'Meditación'});
    return {title: meditacion.titulo, headerBackTitle: null};
  };

  constructor(props) {
    super(props);
    /** @type {import('../utils/types').Meditación} */
    this.meditacion = props.navigation.getParam('meditacion', {});
    this.isIntro = props.navigation.getParam('isIntro', false);
  }

  // /** @type {Player} */
  // audio = null;
  // refAudio = ref => {
  //   this.audio = ref;
  // };
  /** @param {import('expo-av/build/AV').PlaybackStatus} status */
  onEnd = status => {
    if (this.isIntro) {
      this.props.navigation.replace('Meditacion', {
        meditacion: this.meditacion,
        isIntro: false,
      });
    } else {
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <ScreenBg
            source={{
              uri: this.isIntro
                ? this.meditacion.imagenIntro
                : this.meditacion.imagenFondo,
            }}
            color={this.meditacion.color}
            // eslint-disable-next-line react-native/no-inline-styles
            styleImage={{resizeMode: 'cover'}}>
            <View style={styles.container}>
              <Player
                source={{
                  uri: this.isIntro
                    ? this.meditacion.intro
                    : this.meditacion.media,
                }}
                //ref={this.refAudio}
                showControls
                //showPlayFrame
                shouldPlay
                onEnd={this.onEnd}
              />
            </View>
          </ScreenBg>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  // border1: {
  //   borderWidth: 1,
  //   borderColor: '#f00',
  // },
  // border2: {
  //   borderWidth: 1,
  //   borderColor: '#ff0',
  // },
});
