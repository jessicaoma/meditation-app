import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList, Dimensions} from 'react-native';
import HalfCover from '../components/HalfCover';

const data = [
  { 
    key: 'A', 
    uri: 'http://okoconnect.com/karim/images/libro1.png',
    title: '101 Frases para reflexionar 101',
  },
  { 
    key: 'B', 
    uri: 'http://okoconnect.com/karim/images/libro2.png',
    title: 'Aprendiendo a meditar',
  },
  { 
    key: 'C', 
    uri: 'http://okoconnect.com/karim/images/libro3.png',
    title: 'La aventura espiritual',
  },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 2;

export default class AudiolibrosScreen extends Component {
  static navigationOptions = {
    title: 'AudioLibros',
    header: null,
  };

  _handleClick = () => {
    this.props.navigation.navigate('Audiolibro');
  };
  
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item} >
        <HalfCover 
          source= {{uri: item.uri}}
          onPress= {this._handleClick}
          title= {item.title}
          color= {'#fff'}
          minHeight={((Dimensions.get('window').width / numColumns))} />
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={formatData(data, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    alignItems: 'left',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: (Dimensions.get('window').width / numColumns) + 70, 
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});

