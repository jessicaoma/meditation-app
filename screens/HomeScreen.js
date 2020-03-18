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
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import Buttom from '../components/Buttom';
import Logo from '../components/Logo';
import Cover from '../components/Cover';
import TabBarIcon from '../components/TabBarIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ScalableText from 'react-native-text';
import API, {user} from '../utils/API';
import ScreenBg from '../components/screenBg';
import colors from '../constants/Colors';
import {enumLoNuevo} from '../utils/types';

/**
 * Home Screen
 * @typedef {object} Props
 * @prop {import('react-navigation').NavigationScreenProp} [navigation]
 * @extends {Component<Props>}
 * */
export default class Home extends Component {
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
    const enprogreso = await API.getViajesEnProgreso(user);
    const lonuevo = await API.getLoNuevo();
    const reflexion = await API.getReflexionDelDia();
    const bienvenida = await API.getVideo('Bienvenida');
    const tutorial = await API.getVideo('Tutorial');
    this.setState({enprogreso, lonuevo, reflexion, bienvenida, tutorial});
  };

  /** @param {{item: import("../utils/types").LoNuevo}} item*/
  _renderItemLonuevo = ({item}) => {
    let color = '';
    let titulo = '';
    let onpress = null;
    switch (item.tipo) {
      case enumLoNuevo.audiolibro:
        color = item.audiolibro.color;
        titulo = item.audiolibro.titulo;
        onpress = () => {
          this.props.navigation.navigate('Audiolibro', {
            audiolibro: item.audiolibro,
          });
        };
        break;
      case enumLoNuevo.cancion:
        color = item.cancion.color;
        titulo = item.cancion.titulo;
        onpress = () => {
          this.props.navigation.navigate('Cancion', {
            cancion: item.cancion,
          });
        };
        break;
      case enumLoNuevo.meditacion:
        color = item.meditacion.color;
        titulo = item.meditacion.titulo;
        onpress = () => {
          this.props.navigation.navigate('MeditacionIntro', {
            meditacion: item.meditacion,
          });
        };
        break;
      case enumLoNuevo.viaje:
        color = item.viaje.color;
        titulo = item.viaje.titulo;
        onpress = () => {
          this.props.navigation.navigate('ViajeStack', {viaje: item.viaje});
        };
        break;
      default:
        color = Colors.primaryDark;
        break;
    }
    return (
      <Buttom style={[{backgroundColor: color}, styles.box2]} onPress={onpress}>
        <ScalableText style={styles.title_boxes}>{titulo}</ScalableText>
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

  goBienvenida = () => {
    this.props.navigation.navigate('Bienvenida', {
      video: this.state.bienvenida,
    });
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
                  ¿cómo me siento?
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
                <ScalableText style={styles.title_boxes}>MÚSICA</ScalableText>
              </ImageBackground>
            </Buttom>
            <ScalableText style={styles.sectionTitle}>Lo nuevo</ScalableText>
            <FlatList
              horizontal
              data={this.state.lonuevo}
              renderItem={this._renderItemLonuevo}
              keyExtractor={item => item.key}
              ListEmptyComponent={this._renderListEmpty}
            />
            <ScalableText style={styles.sectionTitle}>
              Viajes en progreso
            </ScalableText>
            <FlatList
              horizontal
              data={this.state.enprogreso}
              renderItem={this._renderItemViajesProgreso}
              keyExtractor={item => item.key}
              ListEmptyComponent={this._renderListEmpty}
            />
            <View style={styles.separador} />
            <Buttom
              style={{backgroundColor: Colors.second}}
              onPress={this.goBienvenida}>
              <ImageBackground
                resizeMode="contain"
                source={{
                  uri:
                    'http://okoconnect.com/karim/assets/images/home/bg-bienvenida.png',
                }}
                style={styles.buttonBG}>
                <ScalableText style={styles.title_boxes}>
                  BIENVENIDA
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
  cover: {
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
  box2: {
    minWidth: 198,
    maxWidth: 198,
    marginRight: 20,
  },
});
