import React, {Component} from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Buttom from '../components/Buttom';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import ScalableText from 'react-native-text';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class Canciones extends Component {
  static navigationOptions = {};
  state = {
    canciones: [
      {
        id: 'can1',
        title: 'Canción 1',
        media: 'http://okoconnect.com/karim/canciones/brisadeotono.wav',
        backgroundImage:
          'http://okoconnect.com/karim/assets/images/musica/musica1-preview.png',
        color: '#d9e0f9',
        itemImage:
          'http://okoconnect.com/karim/assets/images/musica/musica1.png',
      },
      {
        id: 'can2',
        title: 'Canción 2',
        media: 'http://okoconnect.com/karim/canciones/brisasuave.wav',
        backgroundImage:
          'http://okoconnect.com/karim/assets/images/musica/musica2-preview.png',
        color: '#d9e0f9',
        itemImage:
          'http://okoconnect.com/karim/assets/images/musica/musica2.png',
      },
      {
        id: 'can3',
        title: 'Canción 3',
        media: 'http://okoconnect.com/karim/canciones/debajodelviento.wav',
        backgroundImage:
          'http://okoconnect.com/karim/assets/images/musica/musica3-preview.png',
        color: '#d9e0f9',
        itemImage:
          'http://okoconnect.com/karim/assets/images/musica/musica3.png',
      },
      {
        id: 'can4',
        title: 'Canción 4',
        color: '#d9e0f9',
        media: 'http://okoconnect.com/karim/canciones/ecos.wav',
        backgroundImage:
          'http://okoconnect.com/karim/assets/images/musica/musica4-preview.png',
        itemImage:
          'http://okoconnect.com/karim/assets/images/musica/musica4.png',
      },
      {
        id: 'can5',
        title: 'Canción 5',
        color: '#d9e0f9',
        media: 'http://okoconnect.com/karim/canciones/lluviadeabril.wav',
        backgroundImage:
          'http://okoconnect.com/karim/assets/images/musica/musica5-preview.png',
        itemImage:
          'http://okoconnect.com/karim/assets/images/musica/musica5.png',
      },
      {
        id: 'can6',
        title: 'Canción 6',
        color: '#d9e0f9',
        media: 'http://okoconnect.com/karim/canciones/miradaalcielo.wav',
        backgroundImage:
          'http://okoconnect.com/karim/assets/images/musica/musica6-preview.png',
        itemImage:
          'http://okoconnect.com/karim/assets/images/musica/musica6.png',
      },
      {
        id: 'can7',
        title: 'Canción 7',
        color: '#d9e0f9',
        media: 'http://okoconnect.com/karim/canciones/musica6.mp3',
        backgroundImage:
          'http://okoconnect.com/karim/assets/images/musica/musica7-preview.png',
        itemImage:
          'http://okoconnect.com/karim/assets/images/musica/musica7.png',
      },
      {
        id: 'can8',
        title: 'Canción 8',
        color: '#d9e0f9',
        media: 'http://okoconnect.com/karim/canciones/musica7.wav',
        backgroundImage:
          'http://okoconnect.com/karim/assets/images/musica/musica8-preview.png',
        itemImage:
          'http://okoconnect.com/karim/assets/images/musica/musica8.png',
      },
      {
        id: 'can9',
        title: 'Canción 9',
        color: '#d9e0f9',
        media: 'http://okoconnect.com/karim/canciones/unnuevoamanecer.wav',
        backgroundImage:
          'http://okoconnect.com/karim/assets/images/musica/musica9-preview.png',
        itemImage:
          'http://okoconnect.com/karim/assets/images/musica/musica9.png',
      },
      {
        id: 'can10',
        title: 'Canción 10',
        color: '#d9e0f9',
        media: 'http://okoconnect.com/karim/canciones/vientosdepaz.wav',
        backgroundImage:
          'http://okoconnect.com/karim/assets/images/musica/musica10-preview.png',
        itemImage:
          'http://okoconnect.com/karim/assets/images/musica/musica10.png',
      },
    ],
  };

  /** @param {import('../utils/types').Categoria} item */
  _handleClick = item => {
    this.props.navigation.navigate('Cancion', {
      cancion: item,
    });
  };
  /** @param {import('../utils/types').Categoria} item */
  keyExtractor = item => item.id;

  renderListHeader = () => <Text style={styles.sectionTitle}>Música</Text>;

  renderListEmpty = _ => (
    <ActivityIndicator size="large" color={'#d9e0f9'} />
  );

  /** @param {import('react-native').ListRenderItemInfo<import('../utils/types').Categoria>} info*/
  renderItem = ({item}) => (
    <Buttom
      style={{
        backgroundColor: item.color || Colors.primaryDark,
        position: 'relative',
      }}
      onPress={() => {
        this._handleClick(item);
      }}>
      <ScalableText style={styles.title_boxes}>{item.title}</ScalableText>
      <Image style={styles.image} source={{uri: item.itemImage}} />
    </Buttom>
  );
  render() {
    return (
      <>
        <SafeAreaView>
          <FlatList
            style={styles.container}
            data={this.state.canciones}
            ListHeaderComponent={this.renderListHeader}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ListEmptyComponent={this.renderListEmpty}
          />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Dims.regularSpace,
  },
  sectionTitle: {
    fontSize: Dims.h2,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dims.regularSpace,
    marginRight: 0,
    marginBottom: 3,
    marginLeft: 0,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Bold',
  },
  title_boxes: {
    color: '#494c6b',
    fontSize: Dims.bubbleTitle,
    letterSpacing: Dims.bubbleTitleSpacing,
    lineHeight: 23,
    textTransform: 'uppercase',
    alignSelf: 'center',
    maxWidth: '75%',
  },
  image: {
    resizeMode: 'contain',
    width: 90,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
});
