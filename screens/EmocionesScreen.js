// @ts-nocheck
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
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
//TODO registrar seleccion
const envProd = process.env.NODE_ENV === 'production';
const numColumns = 2;

/** @type {Card[]} */
const data = [
  {
    key: 'cartaA',
    bg: 'http://okoconnect.com/karim/assets/images/emociones/bg-emocion-1.png',
    header:
      'http://okoconnect.com/karim/assets/images/emociones/header-emocion-1.png',
    footer:
      'http://okoconnect.com/karim/assets/images/emociones/footer-emocion-1.png',
    headerH: 0.1,
    footerH: 0.35,
    image: envProd
      ? {
          uri:
            'http://okoconnect.com/karim/assets/images/emociones/emocion-1.png',
        }
      : require('../assets/images/emociones/emocion-1.png'),
  },
  {
    key: 'cartaB',
    bg: 'http://okoconnect.com/karim/assets/images/emociones/bg-emocion-2.png',
    header:
      'http://okoconnect.com/karim/assets/images/emociones/header-emocion-2.png',
    footer:
      'http://okoconnect.com/karim/assets/images/emociones/footer-emocion-2.png',
    headerH: 0.1,
    footerH: 0.3,
    image: envProd
      ? {
          uri:
            'http://okoconnect.com/karim/assets/images/emociones/emocion-2.png',
        }
      : require('../assets/images/emociones/emocion-2.png'),
  },
  {
    key: 'cartaC',
    bg: 'http://okoconnect.com/karim/assets/images/emociones/bg-emocion-3.png',
    header:
      'http://okoconnect.com/karim/assets/images/emociones/header-emocion-3.png',
    footer:
      'http://okoconnect.com/karim/assets/images/emociones/footer-emocion-3.png',
    headerH: 0.35,
    footerH: 0.35,
    image: envProd
      ? {
          uri:
            'http://okoconnect.com/karim/assets/images/emociones/emocion-3.png',
        }
      : require('../assets/images/emociones/emocion-3.png'),
  },
  {
    key: 'cartaD',
    bg: 'http://okoconnect.com/karim/assets/images/emociones/bg-emocion-4.png',
    header:
      'http://okoconnect.com/karim/assets/images/emociones/header-emocion-4.png',
    footer:
      'http://okoconnect.com/karim/assets/images/emociones/footer-emocion-4.png',
    headerH: 0.45,
    footerH: 0.2,
    image: envProd
      ? {
          uri:
            'http://okoconnect.com/karim/assets/images/emociones/emocion-4.png',
        }
      : require('../assets/images/emociones/emocion-4.png'),
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
      bg: item.bg,
      header: item.header,
      footer: item.footer,
      headerH: item.headerH,
      footerH: item.footerH,
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
        height={(Dims.window.width / numColumns) * 1.5}
        width={(Dims.window.width - 40) / numColumns}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{backgroundColor: '#9898e2'}}
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
