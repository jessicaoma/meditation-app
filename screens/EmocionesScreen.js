import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import API from '../utils/API';
import ScalableText from 'react-native-text';
import {connect} from 'react-redux';
import {SET_EMOCION} from '../reducers/types';

const numColumns = 2;
const width = (Dims.window.width - 40) / numColumns;
const height = (Dims.window.width / numColumns) * 1.5;

// datos que son fijos dentro de la app
const data = [
  {
    // @ts-ignore
    imagen: require('../assets/images/emociones/emocion-1.gif'),
  },
  {
    // @ts-ignore
    imagen: require('../assets/images/emociones/emocion-2.gif'),
  },
  {
    // @ts-ignore
    imagen: require('../assets/images/emociones/emocion-3.gif'),
  },
  {
    // @ts-ignore
    imagen: require('../assets/images/emociones/emocion-4.gif'),
  },
];

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Emociones'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Emociones'>} route
 * @prop {string} emocionTime
 * @prop {import('redux').Dispatch} [dispatch]
 * @prop {import('../utils/types').Usuario} usuario
 * @extends {Component<Props>}
 */
class EmocionesScreen extends Component {
  state = {
    emociones: [],
  };
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    let emociones = await API.getEmociones(this.props.usuario.token);
    if (emociones.errors !== undefined) {
      //TODO Preguntar que mostrar
    } else {
      emociones.forEach((emocion, index) => {
        let {imagen} = data[index];
        emocion.imagen = imagen;
      });
      this.setState({emociones});
    }
  };

  /**
   * @param {import('../utils/types').Emoción} item
   */
  _handleClick = item => {
    API.postRegistroEmocion(item.key, this.props.usuario.token).then(result => {
      if (result.errors) {
        //TODO Preguntar que mostrar
      } else {
        this.props.dispatch({
          type: SET_EMOCION,
          payload: {
            emocion: item,
            emocionTime: result.fecha,
          },
        });
      }
    });
  };

  /**
   * @param {import('react-native').ListRenderItemInfo<import('../utils/types').Emoción>} item
   */
  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        this._handleClick(item);
      }}>
      <View style={styles.carta}>
        <Image
          style={{
            width: width - 12,
            height: width - 12,
            resizeMode: 'contain',
          }}
          source={item.imagen}
        />
        <ScalableText style={[styles.cartaTitulo]}>{item.titulo}</ScalableText>
      </View>
    </TouchableOpacity>
  );

  renderListEmpty = _ => (
    <ActivityIndicator size="large" color={colors.meditacion} />
  );

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <FlatList
          data={this.state.emociones}
          renderItem={this.renderItem}
          numColumns={numColumns}
          ListEmptyComponent={this.renderListEmpty}
          keyExtractor={item => item.key}
          ListFooterComponent={() => (
            <View style={{paddingBottom: Dims.regularSpace}}>
              <ScalableText style={styles.suggestion}>
                ¿Cómo te sientes hoy?{'\n'}
                {'\n'}
                Llevando un registro de tus emociones podrás conocerte mejor.
              </ScalableText>
            </View>
          )}
          style={styles.scroll}
          ListHeaderComponent={() => (
            <View style={{paddingTop: Dims.regularSpace}} />
          )}
        />
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    usuario: state.usuario,
  };
}

export default connect(mapStateToProps)(EmocionesScreen);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    paddingHorizontal: Dims.regularSpace,
  },
  suggestion: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: '#665e61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    letterSpacing: 1,
  },
  carta: {
    margin: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: colors.meditacion,
    height: height,
    width: width - 5,
    alignSelf: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cartaTitulo: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
});
