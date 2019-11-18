import React, {Component} from 'react';
import {StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import ItemBubble from '../components/ItemBubble';
import Colors from '../constants/Colors';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import Dimensions from '../constants/Dimensions';

export default class Categoria extends Component {
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

  static navigationOptions = ({navigation}) => {
    return {title: navigation.getParam('title', 'Categoria')};
  };

  componentDidMount = () => {
    //aca la llamada al servicio para la categoria
  };

  _goViaje = () => {
    //alert('This is a button!');
    this.props.navigation.navigate('Viaje');
  };

  renderListHeader = _ => {
    return (
      <ScreenBg
        source={{
          uri: 'http://okoconnect.com/karim/images/viaje-1-video-preview.png',
        }}
        styleView={[styles.containBG, styles.cover]}
        styleImage={styles.imageBG}>
        <Player
          source={{
            uri: 'http://okoconnect.com/karim/videos/video2.mp4',
          }}
          isVideo
          showControls
          showPlayFrame
          styleVideo={styles.video}
        />
      </ScreenBg>
    );
  };

  renderItem = ({item}) => {
    return (
      <ItemBubble
        key={`viaje${item.id}`}
        color={this.categoria.color}
        status={item.status}
        onPress={this._goViaje}>
        {item.title}
      </ItemBubble>
    );
  };

  renderListEmpty = _ => {
    return <ActivityIndicator size="large" color={this.categoria.color} />;
  };
  keyExtractor = item => item.id.toString() + 'viaje';

  render() {
    return (
      <ScreenBg
        source={{uri: this.categoria.bgImg}}
        color={this.categoria.color}>
        <FlatList
          ListHeaderComponent={this.renderListHeader}
          data={this.categoria.viajes}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          style={styles.container}
          ListEmptyComponent={this.renderListEmpty}
        />
      </ScreenBg>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Dimensions.regularSpace,
    paddingTop: Dimensions.regularSpace,
    height: '100%',
  },
  imageBG: {
    resizeMode: 'cover',
    borderRadius: 10,
    //height: 210,
    //marginBottom: 5,
  },
  containBG: {
    borderRadius: 20,
    marginBottom: Dimensions.bigSpace,
  },
  cover: {
    height: 210,
    marginBottom: 10,
  },
  video: {
    borderRadius: 10,
  },
});
