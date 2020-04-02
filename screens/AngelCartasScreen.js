import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import HalfCover from '../components/HalfCover';
import Dims from '../constants/Dimensions';
import API from '../utils/API';
import SvgUri from '../components/SvgUri';

/**
 * @typedef {Object} Card
 * @prop {string} key Key used to identiface
 * @prop {import('react-native').ImageSourcePropType[]} faces Array of images, in the index 0 is on the back side of the card, and index 1 is on the front side of the card
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 */

//TODO registrar seleccion
const numColumns = 2;
const height = ((Dims.window.width - 40) / numColumns) * 1.5;
const width = (Dims.window.width - 40) / numColumns;

/**@type {Card[]} */
const data = [
  {
    key: 'cartaA',
    faces: [
      'http://okoconnect.com/karim/assets/angeles/angel1.svg',
      'http://okoconnect.com/karim/assets/angeles/carta1.svg',
    ],
  },
  {
    key: 'cartaB',
    faces: [
      'http://okoconnect.com/karim/assets/angeles/angel2.svg',
      'http://okoconnect.com/karim/assets/angeles/carta2.svg',
    ],
  },
  {
    key: 'cartaC',
    faces: [
      'http://okoconnect.com/karim/assets/angeles/angel3.svg',
      'http://okoconnect.com/karim/assets/angeles/carta3.svg',
    ],
  },
  {
    key: 'cartaD',
    faces: [
      'http://okoconnect.com/karim/assets/angeles/angel4.svg',
      'http://okoconnect.com/karim/assets/angeles/carta4.svg',
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
        angel: this.angelMessage,
      });
    }
  };

  /**
   * @param {import('react-native').ListRenderItemInfo<Card>} item
   */
  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this._handleClick(item);
        }}>
        <View style={styles.containercard}>
          <SvgUri width={width} height={height} source={{uri: item.faces[0]}} />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.statusBar} />
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Mensajes</Text>
          <FlatList
            data={data}
            renderItem={this.renderItem}
            numColumns={numColumns}
          />

          <Text style={styles.suggestion}>Elige una carta para descubrir</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusBar: {
    height: Dims.statusBarHeight,
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
  containercard: {
    marginBottom: 3,
    borderRadius: 20,
  },
});
