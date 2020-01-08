/* eslint-disable react-native/no-inline-styles */
// @ts-nocheck
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
import API from '../utils/API';
import ScreenBg from '../components/screenBg';

const uriReflexion = 'http://okoconnect.com/karim/images/video-preview.jpeg';

const dataLonuevo = [
  {
    id: 1,
    title: 'Aventura espiritual',
    img: 'http://okoconnect.com/karim/images/lock.png',
    bg: '#DADFF8',
  },
  {
    id: 2,
    title: 'Viaje Ligero',
    img: 'http://okoconnect.com/karim/images/lock.png',
    bg: '#FCD48C',
  },
];
const dataViajesenprogreso = [
  {id: 1, title: 'Aprende a cambiar', bg: '#97a3ce'},
  {id: 2, title: 'crear buenos Habitos', bg: '#97a3ce'},
];

/**
 * @typedef {object} Props
 * @prop {import('react-navigation').NavigationScreenProp} [navigation]
 */

/**
 * Home Screen
 * @extends {Component<Props>}
 * */
export default class Home extends Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {height: 68},
    headerLeft: (
      <View style={{flex: 1, justifyContent: 'flex-start', marginLeft: 16}}>
        <Logo
          style={{
            width: 173,
            height: 43,
            resizeMode: 'contain',
            paddingBottom: 2,
          }}
        />
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
    enprogreso: [],
  };

  async componentDidMount() {
    // TODO cambiar forma de obtener el correo del usuario 'example@example.com'
    // const viajes = await API.getViajesEnProgreso('example@example.com');
    // this.setState({enprogreso: viajes});
  }

  _handleClick = () => {
    this.props.navigation.navigate('ViajeStack');
  };

  _renderItemLonuevo = ({item}) => (
    <Buttom
      style={[{backgroundColor: item.bg || Colors.primaryDark}, styles.box2]}>
      <ScalableText style={styles.title_boxes2}>{item.title}</ScalableText>
      {/* <Image style={styles.itemCandado} source={{uri: item.img}} /> */}
    </Buttom>
  );

  _renderItemViajesProgreso = ({item}) => (
    <Buttom
      style={[{backgroundColor: item.bg || Colors.primaryDark}, styles.box2]}
      onPress={this._handleClick}>
      <ScalableText style={styles.title_boxes}>{item.title}</ScalableText>
    </Buttom>
  );

  _renderListEmpty = _ => {
    return <ActivityIndicator size="large" color={this.categoria.color} />;
  };

  _handleReflexion = () => {
    this.props.navigation.navigate('Reflexion', {
      reflexion: {
        title: 'Reflexión del día',
        color: 'rgb(248, 247, 243)',
        imagebg: uriReflexion,
        media: 'http://okoconnect.com/karim/meditaciones/Meditacion-Basica.mp3',
      },
    });
  };

  _handleEmociones = () => {
    this.props.navigation.navigate('EmocionesStack');
  };

  _handelBienvenida = () => {
    this.props.navigation.navigate('Bienvenida');
  };

  _handleTutorial = () => {
    this.props.navigation.navigate('Tutorial');
  };

  _handelPremium = () => {
    this.props.navigation.navigate('Premium');
  };

  _handelMusica = () => {
    this.props.navigation.navigate('Canciones');
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <ScreenBg
              source={{
                uri: 'http://okoconnect.com/karim/assets/images/bg-inicio.png',
              }}
              styleImage={{resizeMode: 'repeat'}}
              color="white">
              <Cover
                source={{uri: uriReflexion}}
                onPress={this._handleReflexion}
                style={styles.cover}
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
              <ScalableText style={styles.sectionTitle}>Lo nuevo</ScalableText>
              <FlatList
                horizontal
                data={dataLonuevo}
                renderItem={this._renderItemLonuevo}
                keyExtractor={item => 'lonuevo' + item.id}
              />
              <ScalableText style={styles.sectionTitle}>
                Viajes en progreso
              </ScalableText>
              <FlatList
                horizontal
                data={dataViajesenprogreso}
                renderItem={this._renderItemViajesProgreso}
                keyExtractor={item => 'viajesenprogreso' + item.id}
              />
              <View style={styles.separador} />
              <Buttom
                style={{backgroundColor: Colors.second}}
                onPress={this._handelBienvenida}>
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
                onPress={this._handleTutorial}>
                <ImageBackground
                  resizeMode="contain"
                  source={{
                    uri:
                      'http://okoconnect.com/karim/assets/images/home/bg-tutorial.png',
                  }}
                  style={styles.buttonBG}>
                  <ScalableText style={styles.title_boxes}>
                    TUTORIAL
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
              <View style={styles.separador2} />
            </ScreenBg>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
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
    flex: 1,
    paddingTop: 5,
    paddingRight: 35,
  },
  box2: {
    minWidth: 198,
    maxWidth: 198,
    marginRight: 20,
  },
});
