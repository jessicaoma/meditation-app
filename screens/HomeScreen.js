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

export default class Home extends Component {
  static navigationOptions = {
    headerTitle: (
      <Logo style={{width: 189, height: 47, resizeMode: 'contain'}} />
    ),
  };

  async componentDidMount() {
    // const data = await API.getMeditaciones();
    // this.setState({
    //   meditaciones: data,
    //   isLoading: false,
    // });
  }

  _handleClick = () => {
    //alert('This is a button!');
    //this.props.navigation.navigate('Viaje');
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
    this.props.navigation.navigate('Reflexion',{
      reflexion: {
        title : 'Reflexión del día',
        color: '#fff',
        media: 'http://okoconnect.com/karim/videos/v1_meditacion_1080.mp4'
      }
    });
  };

  _handleEmociones = item => {
    this.props.navigation.navigate('Emociones');
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
          <Buttom>
            <Text style={styles.title_boxes}>BIENVENIDA</Text>
            <Image source={{uri: uriflor1}} style={styles.itemImage} />
          </Buttom>
          <Buttom>
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