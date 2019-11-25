import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  View,
  ScrollView,
} from 'react-native';
import ScreenBg from '../components/screenBg';
import ItemBubble from '../components/ItemBubble';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Dimensions from '../constants/Dimensions';
import {HeaderBackButton} from 'react-navigation';

/**
 * @typedef Paso
 * @prop {string} id
 * @prop {string} title
 * @prop {string} status
 *
 * @typedef {Object} DataItemSeparator
 * @prop {boolean} highlighted
 * @prop {Paso[]} leadingItem
 *
 * @typedef {object} Props
 * @prop {import('react-navigation').NavigationScreenProp} [navigation]
 */

/**
 * Viaje Screen
 * @extends {Component<Props>}
 * */
export default class ViajeCompletadosScreen extends Component {
  viaje = {
    id: 1,
    title: 'Ser Feliz',
    pasos: [
      {
        id: 'via1',
        status: 'viajeTitle',
        title: '¿Qué es ser feliz?',
        color: '#fdd58d',
      },
      {
        id: 'via2',
        title: 'Vive Incondicionalmente',
        status: 'viajeTitle',
        color: '#cbe3e2',
      },
      {
        id: 'via3',
        title: 'Un Viaje de Autoestima',
        color: '#f1dee1',
        status: 'viajeTitle',
      },
      {
        id: 'via4',
        title: 'Un Viaje de Vida Saludable',
        color: '#f1dee1',
        status: 'viajeTitle',
      },
      {
        id: 'via5',
        title: 'Otro Viaje',
        status: 'viajeTitle',
        color: '#a8aed4',
      },
    ],
    color: this.props.navigation.getParam('bg', '#fdd58d'),
    bgImg: 'http://okoconnect.com/karim/images/tuangel-bg.png',
  };

  static navigationOptions = ({navigation}) => ({
    title: 'Viajes Completados',
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  });

  _handleClick = () => {
    //alert('This is a button!');
    this.props.navigation.navigate('Paso');
  };
  renderItem = ({item}) => {
    return (
      <>
        <ItemBubble
          color={item.color}
          status={item.status}
          onPress={this._handleClick}>
          {item.title}
        </ItemBubble>
      </>
    );
  };

  keyExtractor = item => item.id;
  render() {
    return (
      <ScreenBg
        source={{uri: this.viaje.bgImg}}
        color={this.viaje.color}
        styleView={styles.fullscreen}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Text style={styles.bigTitle}>¡Vas muy bien!</Text>
          <Text style={styles.bigParagraph}>
            Has completado viajes en estas categorías. Presiona en cada una para
            ver tu progreso.
          </Text>
          <FlatList
            data={this.viaje.pasos}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            style={styles.container}
          />
        </ScrollView>
      </ScreenBg>
    );
  }
}

const styles = StyleSheet.create({
  fullscreen: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    paddingBottom: 50,
    paddingTop: Dimensions.regularSpace,
  },
  container: {
    paddingHorizontal: Dimensions.regularSpace,
    paddingTop: Dimensions.regularSpace,
    //justifyContent: 'center',
  },
  bigTitle: {
    fontSize: 22,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dims.regularSpace,
    marginRight: 0,
    marginBottom: 20,
    marginLeft: 0,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Bold',
    textAlign: 'center',
  },
  bigParagraph: {
    fontSize: 18,
    letterSpacing: 1.11,
    lineHeight: 28,
    marginBottom: 5,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'center',
    paddingHorizontal: Dims.regularSpace,
  },
});
