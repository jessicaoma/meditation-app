import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import Colors from '../constants/Colors';
import HalfCover from '../components/HalfCover';

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
          color={'transparent'}
          width={Dimensions.get('window').width / numColumns}
          height={Dimensions.get('window').height / numColumns}
        />
      </View>
    );
  };

  render() {
    return (
      <>
        <View style={styles.statusBar} />
        <Text style={styles.sectionTitle}>Tu Ángel del día</Text>
        <FlatList
          data={formatData(data, numColumns)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width - 80,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 20,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dimensions.regularSpace,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    color: Colors.grey,
    fontFamily: 'MyriadPro-Bold',
  },
});
