import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList, Dimensions} from 'react-native';
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
 * @typedef {Object} AngelMessage
 * @prop {string} id Id
 * @prop {string} sentence Message of the angel
 * @prop {string} title Title of the angel
 */

/**@type {Card[]} */
const data = [
  {
    key: 'cartaA',
    faces: [
      require('../assets/images/angel/angel1.png'),
      require('../assets/images/angel/angelreve1-vacio.png'),
    ],
  },
  {
    key: 'cartaB',
    faces: [
      require('../assets/images/angel/angel2.png'),
      require('../assets/images/angel/angelreve2-vacio.png'),
    ],
  },
  {
    key: 'cartaC',
    faces: [
      require('../assets/images/angel/angel3.png'),
      require('../assets/images/angel/angelreve3-vacio.png'),
    ],
  },
  {
    key: 'cartaD',
    faces: [
      require('../assets/images/angel/angel4.png'),
      require('../assets/images/angel/angelreve4-vacio.png'),
    ],
  },
];

const numColumns = 2;

export default class AngelCartasScreen extends Component {
  // static navigationOptions = {
  //   title: 'Tu ángel',
  //   header: null,
  // };

  constructor(props) {
    super(props);
    this.angelMessage = undefined;
  }

  async componentDidMount() {
    this.angelMessage = await API.getAngelMessage();

    // this.setState({
    //   audioLibros: data,
    // });
    //console.log(this.state.meditaciones[0]);
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
    // if (item.empty === true) {
    //   return <View style={[styles.item, styles.itemInvisible]} />;
    // }
    return (
      <HalfCover
        source={item.faces[0]}
        onPress={() => {
          this._handleClick(item);
        }}
        height={((Dims.window.width - 40) / numColumns) * 1.5}
        width={(Dims.window.width - 40) / numColumns}
        //color={'transparent'}
      />
    );
  };

  render() {
    return (
      <>
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
  item: {},
  // itemInvisible: {
  //   backgroundColor: 'transparent',
  // },
  sectionTitle: {
    fontSize: 17,
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
