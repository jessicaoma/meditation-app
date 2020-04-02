import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import Buttom from '../components/Buttom';
import Logo from '../components/Logo';
import Cover from '../components/Cover';
import TabBarIcon from '../components/TabBarIcon';
import ScalableText from 'react-native-text';
import API, {user} from '../utils/API';
import ScreenBg from '../components/screenBg';
import colors from '../constants/Colors';
import {enumLoNuevo} from '../utils/types';

/**
 * Home Screen
 * @typedef {object} Props
 * @prop {import('react-navigation').NavigationScreenProp} [navigation]
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 * */
class Home extends Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {height: 68},
    headerLeft: (
      <View style={{marginLeft: 16}}>
        <Logo />
      </View>
    ),
    headerRight: (
      <TouchableOpacity
        style={{marginRight: 16}}
        onPress={() => {
          navigation.openDrawer();
        }}>
        <TabBarIcon name={'perfil'} />
      </TouchableOpacity>
    ),
  });

  state = {
    /** @type {import("../utils/types").Viaje[]} */
    enprogreso: [],
    /** @type {import("../utils/types").LoNuevo[]} */
    lonuevo: [],
    /** @type {import("../utils/types").Reflexión} */
    reflexion: {},
    /** @type {import("../utils/types").Video} */
    tutorial: {},
    /** @type {import("../utils/types").Video} */
    bienvenida: undefined,
  };

  componentDidMount = async () => {
    //const enprogreso = await API.getViajesEnProgreso(user);
    const enprogreso = [
      {
        key: '952bb5e2-726a-475c-8a09-c624f5feb1b1',
        tipo: 3,
        categoria: {
          key: 'cde55026-4557-47ed-90a2-c27a7be22c82',
          titulo: 'Ser feliz',
          media:
            'http://okoconnect.com/karim/assets/categorias/categoria-1/video.mp4',
          imagenFondo:
            'http://okoconnect.com/karim/assets/categorias/categoria-1/fondocategoria.png',
          color: '#fdd58d',
          imagenLista:
            'http://okoconnect.com/karim/assets/categorias/categoria-1/iconobubble.svg',
          imagenPrevia:
            'http://okoconnect.com/karim/assets/categorias/categoria-1/portada.jpg',
          isFree: true,
        },
      },
      {
        key: '579625e6-93f3-4c95-ab53-7ff7049ca1c7',
        tipo: 2,
        audiolibro: {
          key: '8dcf4ce0-2d3c-4c2b-9182-98c3624f9f0b',
          titulo: 'Aprendiendo a Meditar',
          imagenLista:
            'http://okoconnect.com/karim/assets/audiolibros/audiolibro-1/iconolistado.png',
          imagenFondo:
            'http://okoconnect.com/karim/assets/audiolibros/audiolibro-1/imagenaudio.png',
          color: '#50628e',
          media:
            'http://okoconnect.com/karim/assets/audiolibros/audiolibro-1/audio.mp3',
          progreso: 10000,
          isFree: true,
        },
      },
    ];
    //const lonuevo = await API.getLoNuevo();
    const lonuevo = [
      {
        key: '952bb5e2-726a-475c-8a09-c624f5feb1b1',
        tipo: 3,
        categoria: {
          key: 'cde55026-4557-47ed-90a2-c27a7be22c82',
          titulo: 'Ser feliz',
          media:
            'http://okoconnect.com/karim/assets/categorias/categoria-1/video.mp4',
          imagenFondo:
            'http://okoconnect.com/karim/assets/categorias/categoria-1/fondocategoria.png',
          color: '#fdd58d',
          imagenLista:
            'http://okoconnect.com/karim/assets/categorias/categoria-1/iconobubble.svg',
          imagenPrevia:
            'http://okoconnect.com/karim/assets/categorias/categoria-1/portada.jpg',
          isFree: true,
        },
      },
      {
        key: '9ec4c979-3655-4026-b4e2-957a3df37fc8',
        tipo: 0,
        meditacion: {
          key: '729d6e80-ceed-47c0-8c88-7c708bfc4217',
          titulo: 'Básica',
          imagenIntro:
            'http://okoconnect.com/karim/assets/meditaciones/meditacion-1/intro.png',
          imagenFondo:
            'http://okoconnect.com/karim/assets/meditaciones/meditacion-1/audio.png',
          color: '#7883a4',
          imagenLista:
            'http://okoconnect.com/karim/assets/meditaciones/meditacion-1/iconobubble.svg',
          intro:
            'http://okoconnect.com/karim/assets/meditaciones/meditacion-1/intro.mp4',
          media:
            'http://okoconnect.com/karim/assets/meditaciones/meditacion-1/audio.mp3',
          isFree: true,
        },
      },
      {
        key: '579625e6-93f3-4c95-ab53-7ff7049ca1c7',
        tipo: 2,
        audiolibro: {
          key: '8dcf4ce0-2d3c-4c2b-9182-98c3624f9f0b',
          titulo: 'Aprendiendo a Meditar',
          imagenLista:
            'http://okoconnect.com/karim/assets/audiolibros/audiolibro-1/iconolistado.png',
          imagenFondo:
            'http://okoconnect.com/karim/assets/audiolibros/audiolibro-1/imagenaudio.png',
          color: '#50628e',
          media:
            'http://okoconnect.com/karim/assets/audiolibros/audiolibro-1/audio.mp3',
          progreso: 0,
          isFree: true,
        },
      },
    ];
    const reflexion = await API.getReflexionDelDia();
    const tutorial = await API.getVideo('Tutorial');
    this.setState({enprogreso, lonuevo, reflexion, tutorial});
  };

  /** @param {{item: import("../utils/types").LoNuevo}} item*/
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
            type: 'SET_CATEGORIA',
            payload: {
              categoria: item.categoria,
            },
          });
          this.props.navigation.navigate('ViajeStack', {
            categoria: item.categoria.titulo,
          });
        };
        break;
      default:
        color = Colors.primaryDark;
        break;
    }
    return (
      <Buttom style={[{backgroundColor: color}, styles.box2]} onPress={onpress}>
        <ScalableText style={styles.title_tipo}>{tipo}</ScalableText>
        <ScalableText style={styles.title_boxes3}>{titulo}</ScalableText>
      </Buttom>
    );
  };

  /** @param {{item : import('../utils/types').Viaje}} item */
  _renderItemViajesProgreso = ({item}) => (
    <Buttom
      style={[{backgroundColor: item.color || Colors.primaryDark}, styles.box2]}
      onPress={() => {
        this.props.navigation.navigate('Viaje', {viaje: item});
      }}>
      <ScalableText style={styles.title_boxes2}>{item.titulo}</ScalableText>
    </Buttom>
  );

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
    //TODO verificar si ya esta en el redux, o consultar el server
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
    this.props.navigation.navigate('Premium');
  };

  _handelMusica = () => {
    this.props.navigation.navigate('Canciones');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <ScreenBg
            source={require('../assets/images/bg-inicio.png')}
            styleImage={{resizeMode: 'repeat'}}
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
              keyExtractor={item => item.key}
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
                  //renderItem={this._renderItemViajesProgreso}
                  renderItem={this._renderItemLonuevo}
                  keyExtractor={item => item.key}
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

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollView: {
    paddingHorizontal: Dimensions.regularSpace,
    paddingTop: Dimensions.regularSpace,
  },
  sectionTitle: {
    fontSize: Dimensions.paragraph,
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
    marginTop: Dimensions.smallSpace,
    marginBottom: Dimensions.bigSpace,
  },
  separador2: {
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 0,
    marginTop: Dimensions.smallSpace,
  },
  title_tipo: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'Kiona',
    textTransform: 'uppercase',
  },
  title_boxes: {
    color: '#fff',
    fontSize: Dimensions.bubbleTitle,
    letterSpacing: Dimensions.bubbleTitleSpacing,
    lineHeight: 20,
    textTransform: 'uppercase',
    alignSelf: 'center',
    fontFamily: 'MyriadPro-Regular',
    paddingTop: 5,
    paddingRight: 35,
  },
  title_boxes2: {
    color: '#81777A',
    fontSize: Dimensions.bubbleTitle,
    letterSpacing: Dimensions.bubbleTitleSpacing,
    lineHeight: 20,
    textTransform: 'uppercase',
    fontFamily: 'MyriadPro-Regular',
    alignSelf: 'center',
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingRight: 35,
  },
  title_boxes3: {
    color: '#fff',
    fontSize: 13,
    letterSpacing: Dimensions.bubbleTitleSpacing,
    lineHeight: 15,
    textTransform: 'uppercase',
    fontFamily: 'MyriadPro-Regular',
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

export default connect(null)(Home);
