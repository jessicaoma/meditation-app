import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Buttom from '../components/Buttom';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Constants from 'expo-constants';
import API from '../utils/API';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import ScalableText from 'react-native-text';
import {NavigationEvents} from 'react-navigation';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class MeditacionesScreen extends Component {
  static navigationOptions = {};
  constructor(props) {
    super(props);
    this.state = {
      /** @type {import('../utils/types').Meditación[]} */
      meditaciones: [],
      /** @type {import('../utils/types').Video} */
      video: {},
    };
  }
  async componentDidMount() {
    const data = await API.getMeditaciones();
    const video = await API.getVideo('Meditaciones');
    // const data =
    // [{"key":"med1","titulo":"Básica","imagenIntro":"http://okoconnect.com/karim/images/meditar1-intro.png","imagenFondo":"http://okoconnect.com/karim/images/meditar1-full.png","color":"#7883a4","imagenLista":"http://okoconnect.com/karim/images/meditar1.png","media":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3","intro":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3","isFree":true},
    // {"key":"med2","titulo":"El perdón","imagenIntro":"http://okoconnect.com/karim/images/meditar2-intro.png","imagenFondo":"http://okoconnect.com/karim/images/meditar2-full.png","color":"#7883a4","imagenLista":"http://okoconnect.com/karim/images/meditar2.png","media":"http://okoconnect.com/karim/meditaciones/3_MeditacionParaPerdonar.mp3", "intro":"http://okoconnect.com/karim/meditaciones/3_MeditacionParaPerdonar.mp3","isFree":true},
    // {"key":"med3","titulo":"Gratitud","imagenIntro":"http://okoconnect.com/karim/images/meditar3-intro.png","imagenFondo":"http://okoconnect.com/karim/images/meditar3-full.png","color":"#7883a4","imagenLista":"http://okoconnect.com/karim/images/meditar3.png","media":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3", "intro":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3","isFree":true},
    // {"key":"med4","titulo":"Conecta con tu corazón","imagenIntro":"http://okoconnect.com/karim/images/meditar4-intro.png","imagenFondo":"http://okoconnect.com/karim/images/meditar4-full.png","color":"#7883a4","imagenLista":"http://okoconnect.com/karim/images/meditar4.png","media":"http://okoconnect.com/karim/meditaciones/2_MeditacionParaconectarconelcorazon.mp3", "intro":"http://okoconnect.com/karim/meditaciones/2_MeditacionParaconectarconelcorazon.mp3","isFree":true},
    // {"key":"med5","titulo":"Conecta con tus ángeles","imagenIntro":"http://okoconnect.com/karim/images/meditar5-intro.png","imagenFondo":"http://okoconnect.com/karim/images/meditar5-full.png","color":"#7883a4","imagenLista":"http://okoconnect.com/karim/images/meditar5.png","media":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3", "intro":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3","isFree":true},
    // {"key":"med6","titulo":"Habla con tu ira","imagenIntro":"http://okoconnect.com/karim/images/meditar6-intro.png","imagenFondo":"http://okoconnect.com/karim/images/meditar6-full.png","color":"#7883a4","imagenLista":"http://okoconnect.com/karim/images/meditar6.png","media":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3","intro":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3","isFree":true},
    // {"key":"med7","titulo":"Vuelve a tu centro","imagenIntro":"http://okoconnect.com/karim/images/meditar7-intro.png","imagenFondo":"http://okoconnect.com/karim/images/meditar7-full.png","color":"#7883a4","imagenLista":"http://okoconnect.com/karim/images/meditar7.png","media":"https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3","intro":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3","isFree":true},
    // {"key":"med8","titulo":"Visualiza tus deseos","imagenIntro":"http://okoconnect.com/karim/images/meditar8-intro.png","imagenFondo":"http://okoconnect.com/karim/images/meditar8-full.png","color":"#7883a4","imagenLista":"http://okoconnect.com/karim/images/meditar8.png","media":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3","intro":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3","isFree":true},
    // {"key":"med9","titulo":"Equilibra tus chakras","imagenIntro":"http://okoconnect.com/karim/images/meditar9-intro.png","imagenFondo":"http://okoconnect.com/karim/images/meditar9-full.png","color":"#7883a4","imagenLista":"http://okoconnect.com/karim/images/meditar9.png","media":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3","intro":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3","isFree":true},
    // {"key":"med10","titulo":"Conecta con tu respiración","imagenIntro":"http://okoconnect.com/karim/images/meditar10-intro.png","imagenFondo":"http://okoconnect.com/karim/images/meditar10-full.png","color":"#7883a4","imagenLista":"http://okoconnect.com/karim/images/meditar10.png","media":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3","intro":"http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3","isFree":true}];
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      meditaciones: data,
      video,
    });
    this.player._loadNewPlaybackInstance();
  }

  /** @param {Player} ref*/
  refPlayer = ref => {
    this.player = ref;
  };

  /** @param {import('../utils/types').Meditación} item */
  _handleClick = item => {
    this.props.navigation.navigate('MeditacionIntro', {
      meditacion: item,
    });
  };

  /** @param {{item : import('../utils/types').Meditación}} item */
  _renderItem = ({item}) => {
    return (
      <Buttom
        style={[
          styles.button,
          {backgroundColor: item.color || Colors.primaryDark},
        ]}
        onPress={() => {
          this._handleClick(item);
        }}>
        <ScalableText style={styles.title_boxes}>{item.titulo}</ScalableText>
        <Image style={styles.image} source={{uri: item.imagenLista}} />
      </Buttom>
    );
  };

  _renderListHeader = _ => {
    //TODO el video cambiara de localizacion
    return (
      <View>
        <Text style={styles.sectionTitle}>Meditaciones</Text>
        <ScreenBg
          source={{
            //uri: 'http://okoconnect.com/karim/images/viaje-1-video-preview.png',
            uri: this.state.video.imagenFondo,
          }}
          styleView={[styles.containBG, styles.cover]}
          styleImage={styles.imageBG}>
          <Player
            ref={this.refPlayer}
            source={{
              //uri: 'http://okoconnect.com/karim/videos/video2.mp4',
              uri: this.state.video.media,
            }}
            isVideo
            styleVideo={styles.video}
            showControls
            showPlayFrame
          />
        </ScreenBg>
      </View>
    );
  };

  _renderListEmpty = _ => {
    return <ActivityIndicator size="large" color={Colors.primaryDark} />;
  };
  /** @param {import('../utils/types').Meditación} item */
  _keyExtractor = item => item.key;

  render = () => (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <NavigationEvents
          onWillBlur={payload => {
            console.log("willblur")
            if (this.player.state.isPlaying) {
              this.player._onPlayPausePressed();
            }
          }}
        />
        <View style={styles.statusBar} />
        <FlatList
          data={this.state.meditaciones}
          renderItem={this._renderItem}
          ListHeaderComponent={this._renderListHeader}
          ListEmptyComponent={this._renderListEmpty}
          style={styles.container}
          keyExtractor={this._keyExtractor}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  statusBar: {
    height: Constants.statusBarHeight,
  },
  container: {
    paddingHorizontal: Dims.regularSpace,
    flex: 1,
  },
  button: {
    paddingRight: 0,
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
  },
  title_boxes: {
    color: 'white',
    fontSize: Dims.bubbleTitle,
    letterSpacing: Dims.bubbleTitleSpacing,
    lineHeight: 16,
    textTransform: 'uppercase',
    alignSelf: 'center',
    maxWidth: '65%',
    fontFamily: 'MyriadPro-Regular',
  },
  image: {
    resizeMode: 'cover',
    width: 92,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  containBG: {
    borderRadius: 20,
    marginBottom: Dims.bigSpace,
  },
  imageBG: {
    resizeMode: 'cover',
    borderRadius: 10,
  },
  video: {
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
});
