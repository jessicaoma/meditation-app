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
import API, {user} from '../utils/API';
import ScalableText from 'react-native-text';
import {connect} from 'react-redux';
import {SET_EMOCION} from '../reducers/types';

//TODO registrar seleccion
const numColumns = 2;
const width = (Dims.window.width - 40) / numColumns;
const height = (Dims.window.width / numColumns) * 1.5;

// datos que son fijos dentro de la app
const data = [
  {
    imagenFondo:
      'http://okoconnect.com/karim/assets/images/emociones/bg-emocion-1.png',
    header:
      'http://okoconnect.com/karim/assets/images/emociones/header-emocion-1.png',
    footer:
      'http://okoconnect.com/karim/assets/images/emociones/footer-emocion-1.png',
    headerH: 0.1,
    footerH: 0.35,
    // @ts-ignore
    imagen: require('../assets/images/emociones/emocion-1.gif'),
  },
  {
    imagenFondo:
      'http://okoconnect.com/karim/assets/images/emociones/bg-emocion-2.png',
    header:
      'http://okoconnect.com/karim/assets/images/emociones/header-emocion-2.png',
    footer:
      'http://okoconnect.com/karim/assets/images/emociones/footer-emocion-2.png',
    headerH: 0.1,
    footerH: 0.3,
    // @ts-ignore
    imagen: require('../assets/images/emociones/emocion-2.gif'),
  },
  {
    imagenFondo:
      'http://okoconnect.com/karim/assets/images/emociones/bg-emocion-3.png',
    header:
      'http://okoconnect.com/karim/assets/images/emociones/header-emocion-3.png',
    footer:
      'http://okoconnect.com/karim/assets/images/emociones/footer-emocion-3.png',
    headerH: 0.35,
    footerH: 0.35,
    // @ts-ignore
    imagen: require('../assets/images/emociones/emocion-3.gif'),
  },
  {
    imagenFondo:
      'http://okoconnect.com/karim/assets/images/emociones/bg-emocion-4.png',
    header:
      'http://okoconnect.com/karim/assets/images/emociones/header-emocion-4.png',
    footer:
      'http://okoconnect.com/karim/assets/images/emociones/footer-emocion-4.png',
    headerH: 0.45,
    footerH: 0.2,
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
 * @extends {Component<Props>}
 */
class EmocionesScreen extends Component {
  state = {
    emociones: [],
  };
  constructor(props) {
    super(props);
    var now = new Date();
    var check = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var emocionTime = new Date(props.emocionTime);
    this.mustJump = check.getTime() <= emocionTime.getTime();
  }

  componentDidMount = async () => {
    let emociones = await API.getEmociones();
    emociones.forEach((emocion, index) => {
      let {imagenFondo, header, footer, headerH, footerH, imagen} = data[index];
      emocion.imagenFondo = imagenFondo;
      emocion.imagen = imagen;
      emocion.header = header;
      emocion.footer = footer;
      emocion.headerH = headerH;
      emocion.footerH = footerH;
    });
    this.setState({emociones});
  };

  /**
   * @param {import('../utils/types').Emoción} item
   */
  _handleClick = item => {
    API.postRegistroEmocion(item.key, user);
    let now = new Date();
    this.props.dispatch({
      type: SET_EMOCION,
      payload: {
        emocion: item,
        emocionTime: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
        ).toJSON(),
      },
    });
    // @ts-ignore
    this.props.navigation.replace('Emocion');
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
    if (!this.mustJump) {
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
    } else {
      // @ts-ignore
      this.props.navigation.replace('Emocion');
      return <SafeAreaView style={styles.safe} />;
    }
  }
}

function mapStateToProps(state) {
  return {
    emocionTime: state.emocionTime,
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
