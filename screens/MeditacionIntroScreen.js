import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import ScreenBg from '../components/screenBg';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import ScalableText from 'react-native-text';
import Player from '../player/Player';
//TODO comportamiento al finalizar video
/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{param:{meditacion:import('../utils/types').Meditación}}>} navigation
 * @extends {Component<Props>}
 */
export default class MeditacionIntroScreen extends Component {
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

  goPlayerMeditar = _ => {
    this.props.navigation.replace('Meditacion', {
      meditacion: this.meditacion,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <ScreenBg
          source={{
            uri: 'http://okoconnect.com/karim/images/crearcuenta-bg.png',
          }}
          color={Colors.second}
          styleImage={{resizeMode: 'cover'}}>
          <View style={styles.container}>
            <View style={styles.subcontainer}>
              <ScreenBg
                source={{
                  uri: this.meditacion.imagenIntro,
                }}
                styleView={[styles.containBG, styles.cover]}
                styleImage={styles.imageBG}>
                <Player
                  source={{
                    uri: this.meditacion.intro,
                  }}
                  isVideo
                  styleVideo={styles.video}
                  showControls
                  showPlayFrame
                  onEnd={this.goPlayerMeditar}
                />
              </ScreenBg>
              <ScalableText style={styles.texto}>
                Para iniciar esta meditación cierra los ojos y comienza a
                relajarte, inhala y exhala profundamente tres veces y mientras
                lo haces comienza a sumergirte en tu cuerpo.
              </ScalableText>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: Colors.primaryDark}]}
                onPress={this.goPlayerMeditar}>
                <ScalableText style={styles.title_boxes}>
                  Comenzar meditación
                </ScalableText>
              </TouchableOpacity>
            </View>
          </View>
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
  video: {},
  containBG: {},
  container: {
    width: '100%',
    height: '100%',
  },
  imageBG: {
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cover: {
    height: Dims.window.width - Dims.regularSpace - Dims.regularSpace,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.22,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'stretch',
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    height: 50,
    marginBottom: 15,
  },
  subcontainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingBottom: Dims.regularSpace,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: Dims.regularSpace,
  },
  texto: {
    padding: 20,
    textAlign: 'center',
    fontFamily: 'MyriadPro-Regular',
    color: Colors.primaryDark,
    fontSize: 16,
    lineHeight: 20,
  },
  title_boxes: {
    color: 'white',
    fontSize: Dims.bubbleTitle,
    letterSpacing: Dims.bubbleTitleSpacing,
    lineHeight: 16,
    textTransform: 'uppercase',
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'MyriadPro-Regular',
    maxWidth: '100%',
    textAlign: 'center',
  },
});
