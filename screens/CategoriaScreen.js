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
import ScalableText from 'react-native-text';
import {HeaderBackButton} from 'react-navigation';
import {connect} from 'react-redux';

/**
 * @typedef {Object} ParamsNavigation
 * @prop {string} categoria
 *
 * @typedef Props
 * @prop {import('../utils/types').Categoria} categoria
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class Categoria extends Component {
  state = {
    /** @type {import('../utils/types').Viaje[]} */
    viajes: [],
    isLoading: true,
  };

  /** @param {{navigation : import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>}} props*/
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('categoria', 'Categoria'),
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    };
  };
  constructor(props) {
    super(props);
    /** @type {import('../utils/types').Categoria} */
    this.categoria = props.categoria;
    this.cantViajes = 0;
  }
  componentDidMount = async () => {
    this.props.navigation.addListener('willBlur', () => {
      if (this.player === null) {
        return;
      }
      if (this.player.state.isPlaying) {
        this.player._onPlayPausePressed();
      }
    });
    //TODO cambiar este comportamiento con el redux
    this.props.navigation.addListener('willFocus', async () => {
      const viajes = await API.getViajesCategoria(this.categoria.key, user);
      //const viajes = [this.props.viaje];
      this.setState({viajes, isLoading: false});
    });
  };

  _goViaje = index => {
    let viaje = this.state.viajes[index];
    if (
      viaje.estado === enumStatus.todo &&
      index > 0 &&
      this.state.viajes[index - 1].estado !== enumStatus.done
    ) {
      return;
    }
    this.props.dispatch({
      type: 'SET_VIAJE',
      payload: {
        viaje,
      },
    });
    let tipo = viaje.pasos[0].tipo;
    this.props.navigation.navigate(`Paso${String.fromCharCode(65 + tipo)}`, {
      position: 0,
      titulo: viaje.pasos[0].titulo,
    });
  };
  //TODO reiniciar el video al llegar al final
  /** @param {Player} ref*/
  refPlayer = ref => {
    this.player = ref;
  };

  renderListHeader = _ => {
    return (
      <>
        {!this.state.isLoading && (
          <View>
            <ScalableText style={styles.textoViajes}>
              En esta categoría vas a recorrer {this.state.viajes.length + ' '}
              secciones con una duración total de 10 horas con 22 min.
            </ScalableText>
          </View>
        )}
      </>
    );
  };

  renderHeader = _ => {
    return (
      <View style={styles.containerHeader}>
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
      </View>
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
            bold
            styleText={{textTransform: 'uppercase'}}>
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
            bold
            styleText={{textTransform: 'uppercase'}}>
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
            disable
            styleText={{textTransform: 'uppercase'}}>
            {item.titulo}
          </ItemBubble>
        );
    }
  };

  renderListEmpty = () => {
    return this.state.isLoading ? (
      <ActivityIndicator size="large" color={this.categoria.color} />
    ) : (
      <View>
        <ScalableText style={styles.textoVacio}>
          Amet commodo nulla facilisi nullam vehicula. Lectus proin nibh nisl
          condimentum. Duis ultricies lacus sed turpis tincidunt id. Enim nunc
          faucibus a pellentesque sit amet.{' '}
        </ScalableText>
      </View>
    );
  };
  keyExtractor = item => item.key;

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <ScreenBg source={{uri: this.categoria.imagenFondo}} color={'#fff'}>
          <View style={styles.container}>
            {this.renderHeader()}
            <FlatList
              ListHeaderComponent={this.renderListHeader}
              data={this.state.viajes}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ListEmptyComponent={this.renderListEmpty}
              style={styles.containerList}
            />
          </View>
        </ScreenBg>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    categoria: state.categoria,
  };
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: 'white'},
  container: {
    width: '100%',
    height: '100%',
  },
  containerHeader: {
    padding: Dimensions.regularSpace,
  },
  containerList: {
    paddingHorizontal: Dimensions.regularSpace,
    //paddingTop: Dimensions.regularSpace,
  },
  imageBG: {
    resizeMode: 'cover',
    borderRadius: 25,
  },
  containBG: {
    borderRadius: 25,
    //marginBottom: Dimensions.bigSpace,
  },
  cover: {
    height: 210,
    //marginBottom: 10,
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
    paddingTop: 20,
    color: '#665e61',
    lineHeight: 22,
    textAlign: 'center',
    fontSize: Dimensions.paragraph,
  },
  textoVacio: {
    padding: 40,
    color: '#665e61',
    lineHeight: 22,
    textAlign: 'center',
    fontSize: Dimensions.paragraph,
  },
});

export default connect(mapStateToProps)(Categoria);
