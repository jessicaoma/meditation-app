import React, {Component} from 'react';
import {StyleSheet, FlatList, ActivityIndicator, ScrollView, View, Text} from 'react-native';
import ItemBubble from '../components/ItemBubble';
import Cover from '../components/Cover';
import Colors from '../constants/Colors';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';


var categoria = {};

export default class Categoria extends Component {
  static navigationOptions = ({navigation}) => {
    return {title: navigation.getParam('title', 'Categoria')};
  };

  componentDidMount = () => {
    //aca la llamada al servicio para la categoria
  };

  componentWillUnmount() {
    //alert('un');
  }
  _goViaje = () => {
    //alert('This is a button!');
    this.props.navigation.navigate('Viaje');
  };
  renderItem = ({item}) => {
    return (
      <>
        {item.title !== undefined ? (
          <ItemBubble
            color={categoria.color}
            status={item.status}
            onPress={this._goViaje}>
            {item.title}
          </ItemBubble>
        ) : (
          <ScreenBg
            source={{
              uri:
                'http://okoconnect.com/karim/images/viaje-1-video-preview.png',
            }}
            styleView={[
              styles.containBG,
              {
                height: 210,
                marginBottom: 10
              },
            ]}
            styleImage={styles.imageBG}>
            <Player
              source={{
                uri: 'http://okoconnect.com/karim/videos/video2.mp4',
              }}
              isVideo={true}
              styleVideo={styles.video}
            />
          </ScreenBg>
        )}
      </>
    );
  };
  keyExtractor = item => item.id.toString() + 'viaje';
  render() {
    categoria = {
      id: 1,
      title: 'Categoria',
      cover: 'http://okoconnect.com/karim/images/viaje-1-video-preview.png',
      viajes: [
        {
          id: 1,
          title: '¿Qué es ser feliz?',
          status: 'done',
        },
        {
          id: 2,
          title: 'Viaja ligero',
          status: 'doing',
        },
        {
          id: 3,
          title: 'Conectar con el corazón',
          status: 'todo',
        },
        {
          id: 4,
          title: 'Vive incondicionalmente',
          status: 'todo',
        },
        {
          id: 5,
          title: 'Acepta radicalmente',
          status: 'todo',
        },
        {
          id: 6,
          title: 'Otro título',
          status: 'todo',
        },
      ],
      color: this.props.navigation.getParam('bg', Colors.primary),
      bgImg: 'http://okoconnect.com/karim/images/viaje-bg-1.png',
    };
    categoria.viajes.unshift({
      id: 'cover',
      source: {uri: categoria.cover},
      color: categoria.color,
    });

    return (
      <>
      <ScreenBg source={{uri: categoria.bgImg}} color={categoria.color}>
      <View style={styles.statusBar} />
      <ScrollView style={styles.container}>
        
        <FlatList
            data={categoria.viajes}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            style={styles.container}
          />
      </ScrollView>
      </ScreenBg>
    </>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    height: '100%',
  },
  imageBG: {
    resizeMode: 'cover',
    borderRadius: 10,
    height: 210,
    marginBottom: 5,
  },
});