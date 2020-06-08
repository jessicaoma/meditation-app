import React, {Component} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Dimensions from '../constants/Dimensions';
import API from '../utils/API';
import ScalableText from 'react-native-text';
import {connect} from 'react-redux';
import {HeaderBackButton} from '@react-navigation/stack';
import LogoCursoDone from '../constants/LogoCursoDone';
import {SET_MODULOS, SET_CATEGORIA} from '../reducers/types';

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'ViajesCompletados'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'ViajesCompletados'>} route
 * @prop {import('../utils/types').Usuario} usuario
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class ViajeCompletadosScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Módulos Finalizados',
    headerLeft: props => (
      <HeaderBackButton {...props} onPress={() => navigation.goBack()} />
    ),
  });
  state = {
    /** @type {import("../utils/types").Viaje[]} */
    viajes: [],
    isLoading: true,
  };
  componentDidMount = async () => {
    const data = await API.getViajesCompletados(this.props.usuario.token);
    if (data.errors === undefined) {
      this.setState({viajes: data, isLoading: false});
    } else {
      //TODO Falta manejar
    }
  };

  /** @param {import("../utils/types").Viaje} viaje*/
  _handleClick = viaje => {
    this.props.dispatch({
      type: SET_CATEGORIA,
      payload: {
        categoria: undefined,
      },
    });
    this.props.dispatch({
      type: SET_MODULOS,
      payload: {
        viajes: [viaje],
      },
    });
    this.props.navigation.navigate('PasoA', {
      position: 0,
      viajeIndex: 0,
      titulo: viaje.pasos[0].titulo,
      colorHeader: viaje.colorCabecera,
    });
  };

  /** @param {import('react-native').ListRenderItemInfo<import('../utils/types').Viaje>} item*/
  renderItem = ({item, index}) => {
    return (
      <View
        style={{
          paddingHorizontal: Dimensions.regularSpace,
          paddingTop: index === 0 ? Dimensions.regularSpace : 0,
        }}>
        <TouchableOpacity
          onPress={() => {
            this._handleClick(item);
          }}>
          <View style={styles.listItem}>
            <View style={[styles.itemNumber, {borderColor: item.color}]}>
              <ScalableText style={styles.itemNumberText} />
            </View>
            <View style={styles.infoSect}>
              <View style={styles.tituloSection}>
                <View>
                  <ScalableText style={styles.titulo}>
                    {item.titulo}
                  </ScalableText>
                </View>
                <View style={styles.statusIcon}>
                  <LogoCursoDone color={item.color} style={styles.statusIcon} />
                </View>
              </View>
              <View style={[styles.tiempoWrap, {backgroundColor: item.color}]}>
                <ScalableText style={styles.tiempo}>
                  {item.duracion}min
                </ScalableText>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  keyExtractor = item => item.key.toString();
  renderListEmpty = () => {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color={Colors.primaryDark} />;
    } else {
      return (
        <ScalableText style={styles.bigParagraph}>
          Al comenzar los cursos, verás aquí reflejados los módulos que has realizado para que puedas llevar un registro de lo aprendido.
        </ScalableText>
      );
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <FlatList
          data={this.state.viajes}
          renderItem={this.renderItem}
          ListHeaderComponent={() => (
            <>
              <Image
                resizeMode="cover"
                source={{
                  uri:
                    'http://okoconnect.com/karim/assets/images/viajes-completados.png',
                }}
                style={styles.image}
              />
              {!this.state.isLoading && this.state.viajes.length > 0 && (
                <>
                  <ScalableText style={styles.bigParagraph}>
                    Nunca te canses de buscar una mejor vida. Recuerda que la perseverancia siempre tiene su recompensa; sigue poco a poco avanzando en los cursos, hasta que alcances los objetivos propuestos. ¡Felicitaciones!
                  </ScalableText>
                </>
              )}
            </>
          )}
          ListEmptyComponent={this.renderListEmpty}
          keyExtractor={this.keyExtractor}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#fff'},
  scrollView: {},
  container: {},
  bigTitle: {
    fontSize: 22,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dims.regularSpace,
    marginRight: 0,
    marginBottom: 20,
    marginLeft: 0,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Bold',
    textAlign: 'center',
  },
  bigParagraph: {
    fontSize: 16,
    letterSpacing: 1.11,
    lineHeight: Dims.viajeParrafoLineHeight,
    marginBottom: 5,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'left',
    paddingHorizontal: Dims.bigSpace,
  },
  image: {
    flex: 1,
    width: Dims.window.width,
    height: Dims.window.width * 0.8,
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

function mapStateToProps(state) {
  return {
    usuario: state.usuario,
  };
}

export default connect(mapStateToProps)(ViajeCompletadosScreen);
