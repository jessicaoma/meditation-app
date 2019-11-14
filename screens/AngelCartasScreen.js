import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList, Dimensions} from 'react-native';
import Colors from '../constants/Colors';
import HalfCover from '../components/HalfCover';
import Constants from 'expo-constants';
import Dims from '../constants/Dimensions';


const data = [
  {
    key: 'A',
    uri: 'http://okoconnect.com/karim/images/angel1.png',
  },
  {
    key: 'B',
    uri: 'http://okoconnect.com/karim/images/angel2.png',
  },
  {
    key: 'C',
    uri: 'http://okoconnect.com/karim/images/angel3.png',
  },
  {
    key: 'C',
    uri: 'http://okoconnect.com/karim/images/angel4.png',
  },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 2;

export default class AngelCartasScreen extends Component {
  static navigationOptions = {
    title: 'Tu ángel',
    header: null,
  };

  _handleClick = () => {
    //alert('This is a button!2');
    this.props.navigation.navigate('Angel');
  };

  renderItem = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <HalfCover
          source={{uri: item.uri}}
          onPress={this._handleClick}
          height={Dimensions.get('window').height / numColumns - 100}
          width={Dimensions.get('window').width / numColumns - Dims.smallSpace}
          color={'transparent'}
        />
      </View>
    );
  };

  render() {
    return (
      <>
        <View style={styles.statusBar} />
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Tu Ángel del día</Text>
          <FlatList
            data={formatData(data, numColumns)}
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
  item: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dims.window.width - 280,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
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
    lineHeight: 28,
    textAlign: 'center',
    color: '#665e61',
  },
});
