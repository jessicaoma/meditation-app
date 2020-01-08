import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import ItemBubble from '../components/ItemBubble';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import Dimensions from '../constants/Dimensions';
import API from '../utils/API';
import {enumStatus} from '../utils/types';

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
      title: navigation.getParam('categoria', {title: 'Categoria'}).title,
    };
  };
  constructor(props) {
    super(props);
    /** @type {import('../utils/types').Categoria} */
    this.categoria = props.navigation.state.params.categoria;
  }

  componentDidMount = async () => {
    // TODO cambiar forma de obtener el correo del usuario
    const viajes = await API.getViajesCategoria(
      this.categoria.key,
      'example@example.com',
    );
    this.setState({viajes});
    //console.log(viajes);
  };

  _goViaje = index => {
    let viaje = this.state.viajes[index];
    viaje.color = this.categoria.color;
    this.props.navigation.navigate('ViajeStack', {
      viaje,
    });
  };

  renderListHeader = _ => {
    return (
      <ScreenBg
        source={{
          uri: this.categoria.imagenPrevia,
        }}
        styleView={[styles.containBG, styles.cover]}
        styleImage={styles.imageBG}>
        <Player
          source={{
            uri: this.categoria.media,
          }}
          isVideo
          showControls
          showPlayFrame
          styleVideo={styles.video}
        />
      </ScreenBg>
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
});
