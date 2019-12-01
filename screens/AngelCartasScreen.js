// @ts-nocheck
import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList, SafeAreaView} from 'react-native';
import Colors from '../constants/Colors';
import HalfCover from '../components/HalfCover';
import Constants from 'expo-constants';
import Dims from '../constants/Dimensions';
import API from '../utils/API';

/**
 * @typedef {Object} Card
 * @prop {string} key Key used to identiface
 * @prop {NodeRequire[]} faces Array of images, in the index 0 is on the back side of the card, and index 1 is on the front side of the card
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 */

//TODO cambiar la validacion pues ya no se usa expo snack
const envProd = process.env.NODE_ENV === 'production';
const numColumns = 2;

/**@type {Card[]} */
const data = [
  {
    key: 'cartaA',
    faces: [
      envProd
        ? {uri: 'http://okoconnect.com/karim/assets/images/angel/angel1.png'}
        : require('../assets/images/angel/angel1.png'),
      envProd
        ? {
            uri:
              'http://okoconnect.com/karim/assets/images/angel/angelreve1-vacio.png',
          }
        : require('../assets/images/angel/angelreve1-vacio.png'),
    ],
  },
  {
    key: 'cartaB',
    faces: [
      envProd
        ? {uri: 'http://okoconnect.com/karim/assets/images/angel/angel2.png'}
        : require('../assets/images/angel/angel2.png'),
      envProd
        ? {
            uri:
              'http://okoconnect.com/karim/assets/images/angel/angelreve2-vacio.png',
          }
        : require('../assets/images/angel/angelreve2-vacio.png'),
    ],
  },
  {
    key: 'cartaC',
    faces: [
      envProd
        ? {uri: 'http://okoconnect.com/karim/assets/images/angel/angel3.png'}
        : require('../assets/images/angel/angel3.png'),
      envProd
        ? {
            uri:
              'http://okoconnect.com/karim/assets/images/angel/angelreve3-vacio.png',
          }
        : require('../assets/images/angel/angelreve3-vacio.png'),
    ],
  },
  {
    key: 'cartaD',
    faces: [
      envProd
        ? {uri: 'http://okoconnect.com/karim/assets/images/angel/angel4.png'}
        : require('../assets/images/angel/angel4.png'),
      envProd
        ? {
            uri:
              'http://okoconnect.com/karim/assets/images/angel/angelreve4-vacio.png',
          }
        : require('../assets/images/angel/angelreve4-vacio.png'),
    ],
  },
];

/** @extends {Component<Props>} */
export default class AngelCartasScreen extends Component {
  constructor(props) {
    super(props);
    this.angelMessage = undefined;
  }

  async componentDidMount() {
    this.angelMessage = await API.getAngelMessage();
  }

  /**
   * @param {Card} item
   */
  _handleClick = item => {
    if (this.angelMessage !== undefined) {
      this.props.navigation.navigate('Angel', {
        carta: item,
        mensaje: this.angelMessage,
      });
    }
  };

  /**
   * @param {import('react-native').ListRenderItemInfo<Card>} item
   */
  renderItem = ({item}) => {
    return (
      <HalfCover
        source={item.faces[0]}
        onPress={() => {
          this._handleClick(item);
        }}
        height={((Dims.window.width - 40) / numColumns) * 1.5}
        width={(Dims.window.width - 40) / numColumns}
      />
    );
  };

  render() {
    return (
      <>
        <SafeAreaView>
        <View style={styles.statusBar} />
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Tu Ángel del día </Text>
          <FlatList
            data={data}
            renderItem={this.renderItem}
            numColumns={numColumns}
          />
          <Text style={styles.suggestion}>Elige una carta para descubrir</Text>
        </View>
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
  suggestion: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 16,
    lineHeight: 28,
    textAlign: 'center',
    color: '#665e61',
  },
});
