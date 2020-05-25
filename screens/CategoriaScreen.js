import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import Dimensions from '../constants/Dimensions';
import LogoCursoDone from '../constants/LogoCursoDone';
import LogoCursoNext from '../constants/LogoCursoNext';
import LogoCursoDoing from '../constants/LogoCursoDoing';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import ScalableText from 'react-native-text';
import {HeaderBackButton} from '@react-navigation/stack';
import {connect} from 'react-redux';
import colors from '../constants/Colors';
import {SET_MODULOS} from '../reducers/types';

/**
 * @typedef Props
 * @prop {import('../utils/types').Categoria} categoria
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Categoria'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Categoria'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class Categoria extends Component {
  state = {
    /** @type {import('../utils/types').Viaje[]} */
    viajes: [],
    isLoading: true,
  };

  /** @param {Props} props */
  static navigationOptions = ({route, navigation}) => {
    return {
      title: route.params?.titulo ?? 'Categoria',
      headerLeft: props => (
        <HeaderBackButton {...props} onPress={() => navigation.goBack()} />
      ),
    };
  };
  constructor(props) {
    super(props);
    /** @type {import('../utils/types').Categoria} */
    this.categoria = props.categoria;
    this.cantViajes = 0;
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
    //TODO cambiar este comportamiento con el redux
    this.props.navigation.addListener('focus', async () => {
      const viajes = await API.getViajesCategoria(this.categoria.key, user);
      this.setState({viajes, isLoading: false});
      this.props.dispatch({
        type: SET_MODULOS,
        payload: {
          viajes,
        },
      });
    });
  };

  /**
   * @param {import('../utils/types').Viaje} viaje
   */
  determinarPaso = viaje => {
    let posicion = 0;

    if (viaje.estado === enumStatus.done || viaje.estado === enumStatus.todo) {
      posicion = 0;
    } else {
      posicion = viaje.pasos.findIndex(
        paso =>
          paso.estado === enumStatus.doing || paso.estado === enumStatus.todo,
      );
    }
    posicion = posicion < 0 ? 0 : posicion;
    return posicion;
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
    let position = this.determinarPaso(viaje);
    let tipo = viaje.pasos[position].tipo;
    // @ts-ignore
    this.props.navigation.navigate(`Paso${String.fromCharCode(65 + tipo)}`, {
      viajeIndex: index,
      position,
      titulo: viaje.pasos[position].titulo,
      colorHeader: this.categoria.colorCabecera,
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
              {this.categoria.textoIntroductorio}
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

  renderStatus = estado => {
    switch (estado) {
      case enumStatus.doing:
        return (
          <LogoCursoDoing
            color={this.categoria.color}
            style={styles.statusIcon}
          />
        );
      case enumStatus.done:
        return (
          <LogoCursoDone
            color={this.categoria.color}
            style={styles.statusIcon}
          />
        );
      default:
        return <LogoCursoNext style={styles.statusIcon} />;
    }
  };

  /** @type {import('react-native').ListRenderItem<import('../utils/types').Viaje>} */
  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this._goViaje(index);
        }}>
        <View style={styles.listItem}>
          <View
            style={[styles.itemNumber, {borderColor: this.categoria.color}]}>
            <ScalableText style={styles.itemNumberText}>
              {index + 1}.
            </ScalableText>
          </View>
          <View style={styles.infoSect}>
            <View style={styles.tituloSection}>
              <View>
                <ScalableText style={styles.titulo}>{item.titulo}</ScalableText>
              </View>
              <View style={styles.statusIcon}>
                {this.renderStatus(item.estado)}
              </View>
            </View>

            <View>
              <ScalableText style={styles.explicacion}>
                {item.descripcion}
              </ScalableText>
            </View>
            <View
              style={[
                styles.tiempoWrap,
                {backgroundColor: this.categoria.color},
              ]}>
              <ScalableText style={styles.tiempo}>
                {item.duracion}min
              </ScalableText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderListEmpty = () => {
    return this.state.isLoading ? (
      <ActivityIndicator size="large" color={this.categoria.color} />
    ) : (
      <View>
        <ScalableText style={styles.textoVacio}>
          {this.categoria.textoIntroductorio}
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
    paddingHorizontal: Dimensions.smallSpace,
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
    padding: 5,
    paddingTop: 20,
    color: colors.textoViaje,
    lineHeight: 22,
    textAlign: 'left',
    fontSize: 16,
    letterSpacing: 1,
    marginBottom: 20,
  },
  textoVacio: {
    padding: 40,
    color: '#665e61',
    lineHeight: 22,
    textAlign: 'center',
    fontSize: Dimensions.paragraph,
  },
  listItem: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 25,
  },
  infoSect: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    maxWidth: '100%',
    flex: 1,
  },
  itemNumber: {
    borderRightWidth: 2,
    paddingRight: 5,
  },
  itemNumberText: {
    fontFamily: 'MyriadPro-Semibold',
    lineHeight: 22,
    fontSize: 15,
    color: '#85787B',
  },
  tituloSection: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
    marginBottom: 3,
  },
  titulo: {
    fontFamily: 'MyriadPro-Semibold',
    lineHeight: 18,
    fontSize: 17,
    color: '#85787B',
    letterSpacing: 1.06,
    flex: 0.8,
    flexWrap: 'wrap',
    paddingRight: 28,
    marginTop: 5,
  },
  statusIcon: {
    marginLeft: 5,
    marginTop: -3,
    position: 'absolute',
    right: 0,
  },
  explicacion: {
    fontFamily: 'MyriadPro-Regular',
    lineHeight: 16,
    fontSize: 14,
    color: '#85787B',
    width: '100%',
    letterSpacing: 0.88,
  },
  tiempoWrap: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    maxWidth: 60,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  tiempo: {
    fontSize: 11,
    letterSpacing: 0.69,
    lineHeight: 11,
    color: '#333',
    fontFamily: 'MyriadPro-Regular',
  },
});

export default connect(mapStateToProps)(Categoria);
