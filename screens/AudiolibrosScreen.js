import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import BookListItem from '../components/BookListItem';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import Constants from 'expo-constants';
import API from '../utils/API';
import {NavigationEvents} from 'react-navigation';

//Estoy restando los margenes laterales (16 + 16), y eso lo divido entre las columnas.
const widthItem = (Dimensions.window.width - Dimensions.regularSpace * 2) - 0;

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 *
 * @extends {Component<Props>}
 */
export default class AudiolibrosScreen extends Component {
  static navigationOptions = {};

  constructor(props) {
    super(props);
    this.state = {
      /** @type {import('../utils/types').Audiolibro[]} */
      audioLibros: [],
    };
  }

  async refeshData() {
    this.setState({
      audioLibros: [],
    });
    const data = await API.getAudiolibros();
    //const data = [{"key":"5024d96b-5c0e-472a-b213-d43ccaf509b5","titulo":"Aprendiendo a Meditar","imagenLista":"http://okoconnect.com/karim/assets/audiolibros/audiolibro-1/iconolistado.png","imagenFondo":"http://okoconnect.com/karim/assets/audiolibros/audiolibro-1/imagenaudio.png","color":"#50628e","media":"http://okoconnect.com/karim/assets/audiolibros/audiolibro-1/audio.mp3","progreso":0,"isFree":true},{"key":"328799e1-d690-4dd4-bdc1-d9d970c6f4b8","titulo":"La aventura espiritual","imagenLista":"http://okoconnect.com/karim/assets/audiolibros/audiolibro-3/iconolistado.png","imagenFondo":"http://okoconnect.com/karim/assets/audiolibros/audiolibro-3/imagenaudio.png","color":"#82d3ea","media":"http://okoconnect.com/karim/assets/audiolibros/audiolibro-3/audio.mp3","progreso":0,"isFree":true},{"key":"22e64578-6aac-4aaa-81d3-85b61c3d63ac","titulo":"101 Frases para reflexionar","imagenLista":"http://okoconnect.com/karim/assets/audiolibros/audiolibro-2/iconolistado.png","imagenFondo":"http://okoconnect.com/karim/assets/audiolibros/audiolibro-2/imagenaudio.png","color":"#ffffff","media":"http://okoconnect.com/karim/assets/audiolibros/audiolibro-2/audio.mp3","progreso":0,"isFree":true}];
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      audioLibros: data,
    });
  }

  _handleClick = item => {
    this.props.navigation.navigate('Audiolibro', {audiolibro: item});
  };
  /** @param {{item :import('../utils/types').Audiolibro}} item*/
  _renderItem = ({item}) => {
    return (
      <View style={{marginBottom: 10}}
        // eslint-disable-next-line react-native/no-inline-styles
        >
        <BookListItem
          source={{uri: item.imagenLista}}
          width={widthItem}
          height={widthItem * 0.4286}
          
          onPress={() => {
            this._handleClick(item);
          }}
        />
      </View>
    );
  };

  _renderEmtpy = () => (
    <ActivityIndicator size="large" color={Colors.primaryDark} />
  );
  _renderListHeader = () => (
    <Text style={styles.sectionTitle}>Audiolibros</Text>
  );

  render() {
    return (
      <>
        <SafeAreaView
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flex: 1}}>
          <NavigationEvents
            onWillFocus={() => {
              this.refeshData();
            }}
          />
          <View style={styles.statusBar} />
          <FlatList
            data={this.state.audioLibros}
            renderItem={this._renderItem}
            ListEmptyComponent={this._renderEmtpy}
            keyExtractor={item => item.key}
            ListHeaderComponent={this._renderListHeader}
            style={styles.container}
          />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    paddingHorizontal: Dimensions.regularSpace,
  },
  sectionTitle: {
    fontSize: Dimensions.h2,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dimensions.regularSpace,
    marginRight: 0,
    marginBottom: 3,
    marginLeft: 0,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Bold',
  },
  shadowBook: {
    alignSelf: 'stretch',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.22,
    zIndex: 999,
    overflow: 'hidden',
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
});
