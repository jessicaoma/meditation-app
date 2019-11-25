import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList, ScrollView} from 'react-native';
import Colors from '../constants/Colors';
import HalfCover from '../components/HalfCover';
import Dims from '../constants/Dimensions';

/**
 * @typedef {Object} Card
 * @prop {string} key
 * @prop {NodeRequire[]} faces
 */
/** @type {Card[]} */
const data = [
  {
    key: 'cartaA',
    // @ts-ignore
    faces: [require('../assets/images/emociones/emocion1.png')],
  },
  {
    key: 'cartaB',
    // @ts-ignore
    faces: [require('../assets/images/emociones/emocion2.png')],
  },
  {
    key: 'cartaC',
    // @ts-ignore
    faces: [require('../assets/images/emociones/emocion3.png')],
  },
  {
    key: 'cartaD',
    // @ts-ignore
    faces: [require('../assets/images/emociones/emocion4.png')],
  },
];

const numColumns = 2;

export default class EmocionesScreen extends Component {
  /**
   * @param {Card} item
   */
  _handleClick = item => {
    this.props.navigation.navigate('Emocion', {
      carta: item,
    });
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
    lineHeight: 20,
    textAlign: 'center',
    color: '#665e61',
    paddingVertical: 10,
  },
});
