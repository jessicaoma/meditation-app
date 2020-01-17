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

  /** @type {Player} */
  audio = null;

  refAudio = ref => {
    this.audio = ref;
  };

  render() {
    const {navigation} = this.props;
    /** @type {import('../utils/types').Meditación} */
    let meditacion = navigation.getParam('meditacion', {});
    return (
      <>
        <SafeAreaView>
          <ScreenBg
            source={{uri: meditacion.imagenFondo}}
            color={meditacion.color}
            // eslint-disable-next-line react-native/no-inline-styles
            styleImage={{resizeMode: 'cover'}}>
            <View style={styles.container}>
              <Player
                source={{
                  uri: meditacion.media,
                }}
                ref={this.refAudio}
                showControls
                //showPlayFrame
                shouldPlay
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
