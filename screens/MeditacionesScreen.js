import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import Buttom from '../components/Buttom';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import API from '../utils/API';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import ScalableText from 'react-native-text';
import {SvgUri} from 'react-native-svg';

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Meditaciones'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Meditaciones'>} route
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
      // @ts-ignore
      video: {},
    };
  }
  componentDidMount = async () => {
    this.props.navigation.addListener('blur', () => {
      if (this.player === null) {
        return;
      }
      if (this.player.state.isPlaying) {
        this.player._onPlayPausePressed();
      }
    });
    const data = await API.getMeditaciones();
    const video = await API.getVideo('Meditaciones');
    this.setState({
      meditaciones: data,
      video,
    });
    this.player._loadNewPlaybackInstance();
  };
  //TODO reiniciar el video al finalizar
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
        <SvgUri style={styles.image} uri={item.imagenLista} />
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
  _keyExtractor = item => item.key.toString();

  render = () => (
    <SafeAreaView style={styles.mainContainer}>
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
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusBar: {
    height: Platform.OS === 'android' ? Dims.statusBarHeight : 0,
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
    resizeMode: 'contain',
    width: 115,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
