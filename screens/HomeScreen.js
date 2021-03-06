import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  Platform,
  //DeviceInfo,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import Buttom from '../components/Buttom';
import Logo from '../components/Logo';
import Cover from '../components/Cover';
import TabBarIcon from '../components/TabBarIcon';
import ScalableText from 'react-native-text';
import API from '../utils/API';
import ScreenBg from '../components/screenBg';
import colors from '../constants/Colors';
import {enumLoNuevo} from '../utils/types';
import {getBrightness} from '../utils/convert';
import {SET_CATEGORIA} from '../reducers/types';

let colorLetra = '#fff';

const headerH =
  68 +
  (Platform.OS === 'android'
    ? dimensions.statusBarHeight
    : //: DeviceInfo.isIPhoneX_deprecated
      //? dimensions.statusBarHeight - 20
      dimensions.statusBarHeight);

/**
 * Home Screens
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Home'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Home'>} route
 * @prop {import('../utils/types').Usuario} usuario
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class Home extends Component {
  /**
   * @param {Props} props
   * @return {import('@react-navigation/stack/lib/typescript/src/types').StackHeaderOptions}
   */
  static navigationOptions = ({navigation}) => ({
    //title: '',
    headerStyle: {height: headerH},
    headerLeft: () => (
      <View style={{marginLeft: 16}}>
        <Logo style={{marginTop: 20,}} />
      </View>
    ),
    headerRight: () => (
      <TouchableOpacity
        style={{marginRight: 16}}
        onPress={() => {
          // @ts-ignore
          //navigation.openDrawer();
          navigation.navigate('PerfilDrawer');
        }}>
        <TabBarIcon name={'perfil'} />
      </TouchableOpacity>
    ),
  });

  state = {
    /** @type {import("../utils/types").EnProgreso[]} */
    enprogreso: [],
    /** @type {import("../utils/types").Destacado[]} */
    lonuevo: [],
    /** @type {import("../utils/types").Reflexión} */
    // @ts-ignore
    reflexion: {},
    /** @type {import("../utils/types").Video} */
    // @ts-ignore
    tutorial: {},
    /** @type {import("../utils/types").Video} */
    bienvenida: undefined,
  };

  componentDidMount = async () => {
    const enprogreso = await API.getEnProgreso(this.props.usuario.token);
    const lonuevo = await API.getDestacados(this.props.usuario.token);
    const reflexion = await API.getReflexionDelDia(this.props.usuario.token);
    const tutorial = await API.getVideo('Tutorial', this.props.usuario.token);
    this.setState({enprogreso, lonuevo, reflexion, tutorial});
    this.props.navigation.addListener('focus', () => {
      this.refeshData();
    });
  };

  async refeshData() {
    this.setState({
      enprogreso: [],
    });
    const enprogreso = await API.getEnProgreso(this.props.usuario.token);
    this.setState({
      enprogreso,
    });
  }

  /** @param {{item: import("../utils/types").Destacado}} item*/
  _renderItemLonuevo = ({item}) => {
    let color = '';
    let titulo = '';
    let onpress = null;
    let tipo = '';
    switch (item.tipo) {
      case enumLoNuevo.audiolibro:
        color = item.audiolibro.color;
        titulo = item.audiolibro.titulo;
        tipo = 'Audiolibro';

        onpress = () => {
          this.props.navigation.navigate('Audiolibro', {
            audiolibro: item.audiolibro,
          });
        };
        break;
      case enumLoNuevo.cancion:
        color = item.cancion.color;
        titulo = item.cancion.titulo;
        tipo = 'Música';

        onpress = () => {
          this.props.navigation.navigate('Cancion', {
            cancion: item.cancion,
          });
        };
        break;
      case enumLoNuevo.meditacion:
        color = item.meditacion.color;
        titulo = item.meditacion.titulo;
        tipo = 'Meditación';

        onpress = () => {
          this.props.navigation.navigate('MeditacionIntro', {
            meditacion: item.meditacion,
          });
        };
        break;
      case enumLoNuevo.categoria:
        color = item.categoria.color;
        titulo = item.categoria.titulo;
        tipo = 'Curso';

        onpress = () => {
          this.props.dispatch({
            type: SET_CATEGORIA,
            payload: {
              categoria: item.categoria,
            },
          });
          this.props.navigation.navigate('ViajeStack', {
            titulo: item.categoria.titulo,
          });
        };
        break;
      default:
        color = Colors.primaryDark;
        break;
    }

    var luma = getBrightness(color);

    if (luma > 150) {
      //255 es lo mas claro.
      colorLetra = Colors.textoViaje;
    } else {
      colorLetra = '#fff';
    }

    return (
      <Buttom style={[{backgroundColor: color}, styles.box2]} onPress={onpress}>
        <ScalableText style={[{color: colorLetra}, styles.title_tipo]}>
          {tipo}
        </ScalableText>
        <ScalableText style={[{color: colorLetra}, styles.title_boxes3]}>
          {titulo}
        </ScalableText>
      </Buttom>
    );
  };

  /** @param {{item : import('../utils/types').EnProgreso}} item */
  _renderItemViajesProgreso = ({item}) => {
    let color = '';
    let titulo = '';
    let onpress = null;
    let tipo = '';
    switch (item.tipo) {
      case enumLoNuevo.audiolibro:
        color = item.audiolibro.color;
        titulo = item.audiolibro.titulo;
        tipo = 'Audiolibro';
        onpress = () => {
          this.props.navigation.navigate('Audiolibro', {
            audiolibro: item.audiolibro,
          });
        };
        break;
      case enumLoNuevo.categoria:
        color = item.categoria.color;
        titulo = item.categoria.titulo;
        tipo = 'Curso';
        onpress = () => {
          this.props.dispatch({
            type: SET_CATEGORIA,
            payload: {
              categoria: item.categoria,
            },
          });
          this.props.navigation.navigate('ViajeStack', {
            titulo: item.categoria.titulo,
          });
        };
        break;
      default:
        color = Colors.primaryDark;
        break;
    }

    var luma = getBrightness(color);

    if (luma > 150) {
      //255 es lo mas claro.
      colorLetra = Colors.textoViaje;
    } else {
      colorLetra = '#fff';
    }

    return (
      <Buttom style={[{backgroundColor: color}, styles.box2]} onPress={onpress}>
        <ScalableText style={[{color: colorLetra}, styles.title_tipo]}>
          {tipo}
        </ScalableText>
        <ScalableText style={[{color: colorLetra}, styles.title_boxes3]}>
          {titulo}
        </ScalableText>
      </Buttom>
    );
  };

  _renderListEmpty = _ => (
    <Buttom style={[{backgroundColor: Colors.primary}, styles.box2]}>
      <ActivityIndicator size="large" color={colors.primaryDark} />
    </Buttom>
  );

  goReflexion = () => {
    this.props.navigation.navigate('Reflexion', {
      reflexion: this.state.reflexion,
    });
  };

  _handleEmociones = () => {
    this.props.navigation.navigate('EmocionesStack');
  };

  goPremium = () => {
    this.props.navigation.navigate('Suscribete');
  };

  goTutorial = () => {
    this.props.navigation.navigate('Tutorial', {
      video: this.state.tutorial,
    });
  };

  _handelPremium = () => {
    this.props.navigation.navigate('Suscribete');
  };

  _handelMusica = () => {
    this.props.navigation.navigate('Canciones');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <ScreenBg
            // @ts-ignore
            source={require('../assets/images/bg-inicio.png')}
            styleImage={{resizeMode: 'contain'}}
            styleView={styles.scrollView}
            color="#fff">
            <Cover
              source={{uri: this.state.reflexion.imagenPrevia}}
              onPress={this.goReflexion}
            />
            <Buttom
              style={{backgroundColor: Colors.second}}
              onPress={this._handleEmociones}>
              <ImageBackground
                resizeMode="contain"
                source={{
                  uri:
                    'http://okoconnect.com/karim/assets/images/home/bg-como-me-siento.png',
                }}
                style={styles.buttonBG}>
                <ScalableText style={styles.title_boxes}>
                  ¿Cómo te sientes hoy?
                </ScalableText>
              </ImageBackground>
            </Buttom>
            <Buttom
              style={{backgroundColor: Colors.second}}
              onPress={this._handelMusica}>
              <ImageBackground
                resizeMode="contain"
                source={{
                  uri:
                    'http://okoconnect.com/karim/assets/images/home/bg-musica.png',
                }}
                style={styles.buttonBG}>
                <ScalableText style={styles.title_boxes}>
                  Música para relajarte
                </ScalableText>
              </ImageBackground>
            </Buttom>
            <ScalableText style={styles.sectionTitle}>Destacados</ScalableText>
            <FlatList
              horizontal
              data={this.state.lonuevo}
              renderItem={this._renderItemLonuevo}
              keyExtractor={item => item.key.toString()}
              ListEmptyComponent={this._renderListEmpty}
            />
            {this.state.enprogreso.length > 0 && (
              <>
                <ScalableText style={styles.sectionTitle}>
                  En progreso
                </ScalableText>
                <FlatList
                  horizontal
                  data={this.state.enprogreso}
                  renderItem={this._renderItemViajesProgreso}
                  keyExtractor={item => item.key.toString()}
                  ListEmptyComponent={this._renderListEmpty}
                />
              </>
            )}

            <View style={styles.separador} />
            <Buttom
              style={{backgroundColor: Colors.second}}
              onPress={this.goPremium}>
              <ImageBackground
                resizeMode="contain"
                source={{
                  uri:
                    'http://okoconnect.com/karim/assets/images/home/bg-bienvenida.png',
                }}
                style={styles.buttonBG}>
                <ScalableText style={styles.title_boxes}>
                  Suscríbete
                </ScalableText>
              </ImageBackground>
            </Buttom>
            <Buttom
              style={{backgroundColor: Colors.second}}
              onPress={this.goTutorial}>
              <ImageBackground
                resizeMode="contain"
                source={{
                  uri:
                    'http://okoconnect.com/karim/assets/images/home/bg-tutorial.png',
                }}
                style={styles.buttonBG}>
                <ScalableText style={styles.title_boxes}>TUTORIAL</ScalableText>
              </ImageBackground>
            </Buttom>
            <View style={styles.separador2} />
          </ScreenBg>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  const {usuario} = state;
  return {
    usuario,
  };
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  scrollView: {
    paddingHorizontal: dimensions.regularSpace,
    paddingTop: dimensions.regularSpace,
  },
  sectionTitle: {
    fontSize: dimensions.paragraph,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginRight: 0,
    marginBottom: 3,
    marginLeft: 20,
    color: '#ABA0B5',
    fontFamily: 'MyriadPro-Regular',
  },
  buttonBG: {
    width: '100%',
    height: 85,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  separador: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    marginBottom: dimensions.smallSpace,
  },
  separador2: {
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 0,
    marginTop: dimensions.smallSpace,
  },
  title_tipo: {
    fontSize: 12.5,
    fontFamily: 'Kiona',
    textTransform: 'uppercase',
  },
  title_boxes: {
    color: '#fff',
    fontSize: dimensions.bubbleTitle,
    letterSpacing: dimensions.bubbleTitleSpacing,
    lineHeight: 20,
    textTransform: 'uppercase',
    alignSelf: 'center',
    fontFamily: 'MyriadPro-Regular',
    paddingTop: 5,
    paddingRight: 35,
  },
  title_boxes2: {
    color: '#81777A',
    fontSize: dimensions.bubbleTitle,
    letterSpacing: dimensions.bubbleTitleSpacing,
    lineHeight: 20,
    textTransform: 'uppercase',
    fontFamily: 'MyriadPro-Regular',
    alignSelf: 'center',
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingRight: 35,
  },
  title_boxes3: {
    fontSize: 13,
    letterSpacing: dimensions.bubbleTitleSpacing,
    lineHeight: 15,
    textTransform: 'uppercase',
    fontFamily: 'MyriadPro-Semibold',
    paddingTop: 3,
    textAlign: 'left',
  },
  box2: {
    minWidth: 198,
    maxWidth: 198,
    marginRight: 20,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default connect(mapStateToProps)(Home);
