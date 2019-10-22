import React, {Component} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import ItemBubble from '../components/ItemBubble';
import LayoutBg from '../components/LayoutBg';
import Cover from '../components/Cover';
import Colors from '../constants/Colors';

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
          <Cover source={item.source} color={item.color} />
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
        <LayoutBg source={{uri: categoria.bgImg}}>
          <FlatList
            data={categoria.viajes}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            style={styles.container}
          />
        </LayoutBg>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    height: '100%',
  },
});
