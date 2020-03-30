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
import {connect} from 'react-redux';

//TODO control de que viaje visitar dado su estado
//TODO compartir color de la categoria
//TODO comportamiento al finalizar el video
/**
 * @typedef {Object} ParamsNavigation
 * @prop {import('../utils/types').Categoria} categoria
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 *
 * @extends {Component<Props>}
 */
class Categoria extends Component {
  state = {
    /** @type {import('../utils/types').Viaje[]} */
    viajes: [],
    isLoading: true,
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
    console.log(props.categoria);
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
      this.setState({viajes, isLoading: false});
    });
  };

  _goViaje = index => {
    let viaje = this.state.viajes[index];
    if (
      this.state.viajes[index].estado === enumStatus.todo &&
      index > 0 &&
      this.state.viajes[index - 1].estado !== enumStatus.done
    ) {
      return;
    }

    viaje.color = this.categoria.color;
    this.props.navigation.navigate('ViajeStack', {
      viaje,
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
        {this.state.viajes.length > 0 && this.state.viajes.length < 3 && (
          <View>
            <ScalableText style={styles.textoViajes}>
              Amet commodo nulla facilisi nullam vehicula. Lectus proin nibh
              nisl condimentum. Duis ultricies lacus sed turpis tincidunt id.
              Enim nunc faucibus a pellentesque sit amet.{' '}
            </ScalableText>
          </View>
        )}
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

  renderListEmpty = () => {
    return this.state.isLoading ? (
      <ActivityIndicator size="large" color={this.categoria.color} />
    ) : (
      <View>
        <ScalableText style={styles.textoViajes}>
          Amet commodo nulla facilisi nullam vehicula. Lectus proin nibh nisl
          condimentum. Duis ultricies lacus sed turpis tincidunt id. Enim nunc
          faucibus a pellentesque sit amet.{' '}
        </ScalableText>
      </View>
    );
  };
  keyExtractor = item => item.key;

  render() {
    this.categoria = this.props.navigation.state.params.categoria;
    return (
      <SafeAreaView>
        <ScreenBg source={{uri: this.categoria.imagenFondo}} color={'#fff'}>
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

function mapStateToProps(state) {
  return {
    categoria: state.categoria,
  };
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

export default connect(mapStateToProps)(Categoria)
