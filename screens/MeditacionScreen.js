import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import API from '../utils/API';
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
  }

  // /** @type {Player} */
  // audio = null;
  // refAudio = ref => {
  //   this.audio = ref;
  // };
  /** @param {import('expo-av/build/AV').PlaybackStatus} status */
  onEnd = status => {
    // @ts-ignore
    API.postDiarioMeditacion(this.meditacion.key, status.durationMillis);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <ScreenBg
            source={{
              uri: this.meditacion.imagenFondo,
            }}
            color={this.meditacion.color}
            // eslint-disable-next-line react-native/no-inline-styles
            styleImage={{resizeMode: 'cover'}}>
            <View style={styles.container}>
              <Player
                source={{
                  uri: this.meditacion.media,
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
