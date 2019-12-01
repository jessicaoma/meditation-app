// @ts-nocheck
import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList, ScrollView, SafeAreaView} from 'react-native';
import Colors from '../constants/Colors';
import HalfCover from '../components/HalfCover';
import Dims from '../constants/Dimensions';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 *
 * @typedef {Object} Card
 * @prop {string} key
 * @prop {NodeRequire | {uri: string}} image
 */

//TODO cambiar la validacion pues ya no se usa expo snack
const envProd = process.env.NODE_ENV === 'production';
const numColumns = 2;

/** @type {Card[]} */
const data = [
  {
    key: 'cartaA',
    image: envProd
      ? {
          uri:
            'http://okoconnect.com/karim/assets/images/emociones/emocion1.png',
        }
      : require('../assets/images/emociones/emocion1.png'),
  },
  {
    key: 'cartaB',
    image: envProd
      ? {
          uri:
            'http://okoconnect.com/karim/assets/images/emociones/emocion2.png',
        }
      : require('../assets/images/emociones/emocion2.png'),
  },
  {
    key: 'cartaC',
    image: envProd
      ? {
          uri:
            'http://okoconnect.com/karim/assets/images/emociones/emocion3.png',
        }
      : require('../assets/images/emociones/emocion3.png'),
  },
  {
    key: 'cartaD',
    image: envProd
      ? {
          uri:
            'http://okoconnect.com/karim/assets/images/emociones/emocion4.png',
        }
      : require('../assets/images/emociones/emocion4.png'),
  },
];

/** @extends {Component<Props>} */
export default class EmocionesScreen extends Component {
  /**
   * @param {Card} item
   */
  _handleClick = item => {
    // TODO registrar selecion en el servidor
    this.props.navigation.navigate('Emocion', {
      carta: item,
    });
  };

  /**
   * @param {import('react-native').ListRenderItemInfo<Card>} item
   */
  renderItem = ({item}) => {
    return (
      <HalfCover
        source={item.image}
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
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Tus emociones </Text>
            <FlatList
              data={data}
              renderItem={this.renderItem}
              numColumns={numColumns}
            />
            <Text style={styles.suggestion}>
              ¿Cómo te sientes hoy?.{'\n'}
              Llevando un registro de tus emociones vas a concerte más a ti
              misma.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
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
    lineHeight: 20,
    textAlign: 'center',
    color: '#665e61',
    paddingVertical: 10,
  },
});