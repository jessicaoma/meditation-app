import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet, FlatList, View} from 'react-native';
import ScreenBg from '../components/screenBg';
import ItemBubbleLine from '../components/ItemBubbleLine';
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
export default class ViajeScreen extends Component {
  viaje = {
    id: 1,
    title: 'Ser Feliz',
    pasos: [
      {
        id: 'title',
        status: 'viajeTitle',
        title: '¿Qué es ser feliz?',
      },
      {
        id: 1,
        title: 'Highlight',
        status: 'done',
      },
      {
        id: 2,
        title: 'Teoría 1',
        status: 'todo',
      },
      {
        id: 3,
        title: 'Reflexiones',
        status: 'todo',
      },
      {
        id: 4,
        title: 'Ejercicio',
        status: 'todo',
      },
      {
        id: 5,
        title: 'Recomendaciones',
        status: 'todo',
      },
      {
        id: 6,
        title: 'Diario',
        status: 'todo',
      },
      {
        id: 7,
        title: 'Cierre',
        status: 'todo',
      },
    ],
    color: this.props.navigation.getParam('bg', '#fdd58d'),
    bgImg: 'http://okoconnect.com/karim/images/viaje-bg-2.png',
  };

  static navigationOptions = ({navigation}) => ({
    title: '¿Qué es ser Feliz?',
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  });

  _handleClick = () => {
    //alert('This is a button!');
    this.props.navigation.navigate('Paso');
  };
  renderItem = ({item}) => {
    return (
      <>
        <ItemBubbleLine
          color={this.viaje.color}
          status={item.status}
          onPress={this._handleClick}>
          {item.title}
        </ItemBubbleLine>
      </>
    );
  };

  /**
   * @param {DataItemSeparator} data
   */
  renderSeparator = data => {
    let styleStatus = {};
    let {color, status} = this.props;
    if (status === 'done') {
      styleStatus = StyleSheet.create({
        styleLine: {
          backgroundColor: color,
        },
      });
    } else if (status === 'doing') {
      styleStatus = StyleSheet.create({
        styleLine: {
          backgroundColor: Colors.borderWhite,
        },
      });
    } else if (status === 'viajeTitle') {
      styleStatus = StyleSheet.create({
        styleLine: {
          backgroundColor: this.viaje.color,
          height: 20,
        },
      });
    }
    return (
      <View style={[styles.containerLine]}>
        <View style={[styles.line, styleStatus.styleLine]} />
      </View>
    );
  };

  keyExtractor = item => item.id.toString() + 'viaje';
  render() {
    return (
      <>
        <ScreenBg source={{uri: this.viaje.bgImg}} color={this.viaje.color}>
          <FlatList
            data={this.viaje.pasos}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            style={styles.container}
            ItemSeparatorComponent={this.renderSeparator}
          />
          <TouchableOpacity
            //onPress={this.handleContinue}
            style={[styles.button]}>
            <Text style={styles.buttonLabel}>Continuar mi viaje</Text>
          </TouchableOpacity>
        </ScreenBg>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Dimensions.regularSpace,
    paddingTop: Dimensions.regularSpace,
    height: '100%',
  },
  button: {
    backgroundColor: Colors.second,
    borderRadius: 30,
    alignSelf: 'stretch',
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonLabel: {
    color: 'white',
    fontSize: Dims.window.width * 0.041,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.5,
    lineHeight: 50,
    fontFamily: 'MyriadPro-Regular',
  },
  containerLine: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 15,
    width: 3,
    margin: 'auto',
    backgroundColor: Colors.borderWhite,
  },
});
