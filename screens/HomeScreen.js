import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import Buttom from '../components/Buttom';
import Logo from '../components/Logo';
import Cover from '../components/Cover';
import TabBarIcon from '../components/TabBarIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';

const uriReflexion = 'http://okoconnect.com/karim/images/video-preview.jpeg';
const uricomomesiento = 'http://okoconnect.com/karim/images/comomesiento.png';
const uriflor1 = 'http://okoconnect.com/karim/images/flor1.png';
const uriflor3 = 'http://okoconnect.com/karim/images/flor3.png';

const dataLonuevo = [
  {
    id: 1,
    title: 'La aventura espiritual',
    img: 'http://okoconnect.com/karim/images/lock.png',
    bg: '#83d4e9',
  },
  {
    id: 2,
    title: 'Viaje Ligero',
    img: 'http://okoconnect.com/karim/images/lock.png',
    bg: '#fdd58d',
  },
];
const dataViajesenprogreso = [
  {id: 1, title: 'Aprende a cambiar', bg: '#f3ebf9'},
  {id: 2, title: 'crear buenos Habitos', bg: '#cbe3e2'},
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
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1,justifyContent: 'flex-start',marginLeft:16, }}>
        <Logo style={{width: 173, height: 43, resizeMode: 'contain', paddingBottom:2}} />
      </View>
    ),
    headerRight: (
      <TouchableOpacity
        style={{marginRight: 16}}
        onPress={() => {
          navigation.openDrawer();
        }}>
        <TabBarIcon name={'perfil'} style={{
          height: 24
        }} />
      </TouchableOpacity>
    ),
  });

  async componentDidMount() {
    // const data = await API.getMeditaciones();
    // this.setState({
    //   meditaciones: data,
    //   isLoading: false,
    // });
  }

  _handleClick = () => {
    this.props.navigation.navigate('ViajeStack');
  };

  _renderItemLonuevo = ({item}) => (
    <Buttom
      style={[{backgroundColor: item.bg || Colors.primaryDark}, styles.box2]}>
      <Text style={styles.title_boxes2}>{item.title}</Text>
      {/* <Image style={styles.itemCandado} source={{uri: item.img}} /> */}
    </Buttom>
  );

  _renderItemViajesProgreso = ({item}) => (
    <Buttom
      style={[{backgroundColor: item.bg || Colors.primaryDark}, styles.box2]}
      onPress={this._handleClick}>
      <Text style={styles.title_boxes2}>{item.title}</Text>
    </Buttom>
  );

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

  render() {
    return (
      <>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Cover source={{uri: uriReflexion}} onPress={this._handleReflexion} />
          <Buttom onPress={this._handleEmociones}>
            <Text style={styles.title_boxes}>¿como me siento?</Text>
            <Image source={{uri: uricomomesiento}} style={styles.itemImage} />
          </Buttom>
          <Text style={styles.sectionTitle}>Lo nuevo</Text>
          <FlatList
            horizontal
            data={dataLonuevo}
            renderItem={this._renderItemLonuevo}
            keyExtractor={item => 'lonuevo' + item.id}
          />
          <Text style={styles.sectionTitle}>Viajes en progreso</Text>
          <FlatList
            horizontal
            data={dataViajesenprogreso}
            renderItem={this._renderItemViajesProgreso}
            keyExtractor={item => 'viajesenprogreso' + item.id}
          />
          <View style={styles.separador} />
          <Buttom onPress={this._handelBienvenida}>
            <Text style={styles.title_boxes}>BIENVENIDA</Text>
            <Image source={{uri: uriflor1}} style={styles.itemImage} />
          </Buttom>
          <Buttom onPress={this._handleTutorial}>
            <Text style={styles.title_boxes}>TUTORIAL</Text>
            <Image source={{uri: uricomomesiento}} style={styles.itemImage} />
          </Buttom>
          <Buttom>
            <Text style={styles.title_boxes}>CONVIERTETE EN PREMIUM</Text>
            <Image source={{uri: uriflor3}} style={styles.itemImage} />
          </Buttom>
          <View style={styles.separador2} />
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: Dimensions.regularSpace,
    paddingTop: Dimensions.regularSpace,
  },
  sectionTitle: {
    fontSize: 20,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: 10,
    marginRight: 0,
    marginBottom: 3,
    marginLeft: 0,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Bold',
  },
  title_boxes: {
    color: '#494c6b',
    fontSize: Dimensions.window.width * 0.038,
    letterSpacing: 0.055,
    lineHeight: 20,
    textTransform: 'uppercase',
    alignSelf: 'center',
    fontFamily: 'MyriadPro-Regular',
  },
  itemImage: {
    resizeMode: 'cover',
    width: 76,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  separador: {
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1,
    marginTop: Dimensions.smallSpace,
    marginBottom: Dimensions.bigSpace,
  },
  separador2: {
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 0,
    marginTop: Dimensions.smallSpace,
  },
  itemCandado: {
    resizeMode: 'contain',
    width: 18,
  },
  title_boxes2: {
    color: '#494c6b',
    fontSize: Dimensions.window.width * 0.038,
    letterSpacing: 0.99,
    lineHeight: 20,
    textTransform: 'uppercase',
    alignSelf: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  box2: {
    minWidth: 198,
    maxWidth: 198,
    marginRight: 20,
  },
});
