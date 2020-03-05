import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  View,
} from 'react-native';
import ItemBubble from '../components/ItemBubble';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import Dimensions from '../constants/Dimensions';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import {NavigationEvents} from 'react-navigation';
import ScalableText from 'react-native-text';

//TODO control de que viaje visitar dado su estado
//TODO compartir color de la categoria
/**
 * @typedef {Object} ParamsNavigation
 * @prop {import('../utils/types').Categoria} categoria
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 *
 * @extends {Component<Props>}
 */
export default class Categoria extends Component {
  state = {
    /** @type {import('../utils/types').Viaje[]} */
    viajes: [],
  };

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('categoria', {title: 'Categoria'}).titulo,
    };
  };
  constructor(props) {
    super(props);
    /** @type {import('../utils/types').Categoria} */
    this.categoria = props.navigation.state.params.categoria;
    this.cantViajes = 0;
  }

  componentDidMount = async () => {
    let viajes = await API.getViajesCategoria(this.categoria.key, user);
    this.setState({viajes});
    console.log(this.state.viajes.length);
  };

  _goViaje = index => {
    let viaje = this.state.viajes[index];
    viaje.color = this.categoria.color;
    this.props.navigation.navigate('ViajeStack', {
      viaje,
    });
  };
  /** @param {Player} ref*/
  refPlayer = ref => {
    this.player = ref;
  };

  renderListHeader = _ => {
    return (
      <>
      <ScreenBg
        source={{
          uri: this.categoria.imagenPrevia,
        }}
        styleView={[styles.containBG, styles.cover]}
        styleImage={styles.imageBG}
        color={this.categoria.color}>
        <Player
          ref={this.refPlayer}
          source={{
            uri: this.categoria.media,
          }}
          isVideo
          showControls
          showPlayFrame
          styleVideo={styles.video}
        />
      </ScreenBg>
      {this.state.viajes.length < 3 ? (
          <View>
            <ScalableText style={styles.textoViajes}>Amet commodo nulla facilisi nullam vehicula. Lectus proin nibh nisl condimentum. Duis ultricies lacus sed turpis tincidunt id. Enim nunc faucibus a pellentesque sit amet. </ScalableText></View>
        ) : 
        (
          <View />
        )
      }
      </>
    );
  };

  /** @type {import('react-native').ListRenderItem<import('../utils/types').Viaje>} */
  renderItem = ({item, index}) => {
    switch (item.estado) {
      case enumStatus.doing:
        return (
          <ItemBubble
            color={this.categoria.color}
            onPress={() => {
              this._goViaje(index);
            }}
            bold>
            {item.titulo}
          </ItemBubble>
        );
      case enumStatus.done:
        return (
          <ItemBubble
            color={this.categoria.color}
            onPress={() => {
              this._goViaje(index);
            }}
            fill
            bold>
            {item.titulo}
          </ItemBubble>
        );
      default:
        return (
          <ItemBubble
            color={this.categoria.color}
            onPress={() => {
              this._goViaje(index);
            }}
            disable>
            {item.titulo}
          </ItemBubble>
        );
    }
  };

  renderListEmpty = _ => {
    return <ActivityIndicator size="large" color={this.categoria.color} />;
  };
  keyExtractor = item => item.key;

  render() {
    this.categoria = this.props.navigation.state.params.categoria;
    return (
      <SafeAreaView>
        <NavigationEvents
          onWillBlur={payload => {
            if (this.player.state.isPlaying) {
              this.player._onPlayPausePressed();
            }
          }}
        />
        <ScreenBg
          source={{uri: this.categoria.imagenFondo}}
          // color={this.categoria.color}>
          color={'#fff'}>

          <FlatList
            ListHeaderComponent={this.renderListHeader}
            data={this.state.viajes}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            style={styles.container}
            ListEmptyComponent={this.renderListEmpty}
          />
        </ScreenBg>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Dimensions.regularSpace,
    paddingTop: Dimensions.regularSpace,
    height: '100%',
  },
  imageBG: {
    resizeMode: 'cover',
    borderRadius: 25,
  },
  containBG: {
    borderRadius: 25,
    marginBottom: Dimensions.bigSpace,
  },
  cover: {
    height: 210,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.22,
  },
  video: {
    borderRadius: 10,
  },
  textoViajes: {
    padding: 40,
    color: '#665e61',
    lineHeight: 22,
    textAlign: 'center',
    fontSize: Dimensions.paragraph,
  },
});
