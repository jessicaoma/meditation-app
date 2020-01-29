import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import ScreenBg from '../components/screenBg';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import ScalableText from 'react-native-text';
import Player from '../player/Player';

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

  goPlayerMeditar = isIntro => {
    this.props.navigation.replace('Meditacion', {
      meditacion: this.meditacion,
      isIntro,
    });
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <ScreenBg
            source={{uri: 'http://okoconnect.com/karim/images/crearcuenta-bg.png'}}
            color={Colors.second}
            // eslint-disable-next-line react-native/no-inline-styles
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
                    uri: 'http://okoconnect.com/karim/videos/video2.mp4',
                  }}
                  isVideo
                  styleVideo={styles.video}
                  showControls
                  showPlayFrame
                />
              </ScreenBg>
                <ScalableText style={styles.texto}>
                    Para iniciar esta meditación cierra los ojos y comienza a relajarte, inhala y exhala profundamente tres veces y mientras lo haces comienza a sumergirte en tu cuerpo
                  </ScalableText>

                
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: Colors.primaryDark}]}
                  onPress={() => {
                    this.goPlayerMeditar(false);
                  }}>
                  <ScalableText style={styles.title_boxes}>
                    Comenzar meditación
                  </ScalableText>
                </TouchableOpacity>
              </View>
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
  sectionTitle: {
    fontSize: Dims.h2,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dims.regularSpace,
    marginRight: 0,
    marginBottom: 3,
    marginLeft: 0,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Bold',
    textAlign: 'center',
  },
  imageBG: {
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cover: {
    height: 210,
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
    width: '90%',
    paddingVertical: 50,
  },
  texto: {
    padding: 20,
    textAlign: 'center',
    fontFamily: 'MyriadPro-Regular',
    color: Colors.primaryDark,
    fontSize: Dims.paragraph,
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
