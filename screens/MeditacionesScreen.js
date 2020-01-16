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
    };
  }
  async componentDidMount() {
    const data = await API.getMeditaciones();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      meditaciones: data,
    });
  }

  /** @param {import('../utils/types').Meditación} item */
  _handleClick = item => {
    this.props.navigation.navigate('Meditacion', {
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
            uri: 'http://okoconnect.com/karim/images/viaje-1-video-preview.png',
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
    lineHeight: 25,
    textTransform: 'uppercase',
    alignSelf: 'center',
    maxWidth: '70%',
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
  },
});
