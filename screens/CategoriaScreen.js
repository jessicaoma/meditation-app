import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import ItemBubble from '../components/ItemBubble';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import Dimensions from '../constants/Dimensions';
import API from '../utils/API';
import {enumStatus} from '../utils/types';

/**
 * @typedef {Object} ParamsNavigation
 * @prop {import('../utils/types').Categoria} categoria
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 *
 * @extends {Component<Props>}
 */
export default class Categoria extends Component {
  /** @type {import('../utils/types').Categoria} */
  categoria = {
    id: 'cat1',
    color: '#fdd58d',
    itemImage: 'http://okoconnect.com/karim/images/cat1.png',
    title: 'Ser feliz',
    cover: 'http://okoconnect.com/karim/images/viaje-1-video-preview.png',
    media: 'http://okoconnect.com/karim/videos/video2.mp4',
    backgroundImage: 'http://okoconnect.com/karim/images/viaje-bg-1.png',
  };
  state = {
    /** @type {import('../utils/types').Viaje[]} */
    viajes: [],
  };

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('categoria', {title: 'Categoria'}).title,
    };
  };

  componentDidMount = async () => {
    const viajes = await API.getViajesCategoria(
      this.props.navigation.state.params.categoria.id,
      'example@example.com',
    );
    this.setState({viajes});
    //console.log(viajes);
  };

  _goViaje = () => {
    this.props.navigation.navigate('ViajeStack');
  };

  renderListHeader = _ => {
    return (
      <ScreenBg
        source={{
          uri: this.categoria.cover,
        }}
        styleView={[styles.containBG, styles.cover]}
        styleImage={styles.imageBG}>
        <Player
          source={{
            uri: this.categoria.media,
          }}
          isVideo
          showControls
          showPlayFrame
          styleVideo={styles.video}
        />
      </ScreenBg>
    );
  };

  /** @type {import('react-native').ListRenderItem<import('../utils/types').Viaje>} */
  renderItem = ({item}) => {
    switch (item.status) {
      case enumStatus.doing:
        return (
          <ItemBubble color={this.categoria.color} onPress={this._goViaje} bold>
            {item.title}
          </ItemBubble>
        );
      case enumStatus.done:
        return (
          <ItemBubble
            color={this.categoria.color}
            onPress={this._goViaje}
            fill
            bold>
            {item.title}
          </ItemBubble>
        );
      default:
        return (
          <ItemBubble
            color={this.categoria.color}
            onPress={this._goViaje}
            disable>
            {item.title}
          </ItemBubble>
        );
    }
  };

  renderListEmpty = _ => {
    return <ActivityIndicator size="large" color={this.categoria.color} />;
  };
  keyExtractor = item => item.id.toString() + 'viaje';

  render() {
    this.categoria = this.props.navigation.state.params.categoria;
    return (
      <SafeAreaView>
        <ScreenBg
          source={{uri: this.categoria.backgroundImage}}
          color={this.categoria.color}>
          <FlatList
            ListHeaderComponent={this.renderListHeader}
            data={this.state.viajes}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            style={styles.container}
            ListEmptyComponent={this.renderListEmpty}
          />
        </ScreenBg>
      </SafeAreaView>
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
