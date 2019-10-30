import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList, StatusBar} from 'react-native';
import HalfCover from '../components/HalfCover';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';

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

/*const formatData = (data, numColumns) => {
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
};*/

const numColumns = 2;
//Estoy restando los margenes laterales (16 + 16), y eso lo divido entre las columnas.
const widthItem = (Dimensions.window.width - Dimensions.hugeSpace) / numColumns;

//Para la separación entre los elementos de una fila, debe hacerse manual.

export default class AudiolibrosScreen extends Component {
  static navigationOptions = {
    title: 'AudioLibros',
    header: null,
  };

  _handleClick = () => {
    this.props.navigation.navigate('Audiolibro');
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
          title={item.title}
          color={'#fff'}
          width={widthItem}
        />
      </View>
    );
  };

  render() {
    return (
      <>
        <View style={styles.statusBar} />
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Audiolibros</Text>
          <FlatList
            //en android me funciono sin agregar elementos vacios, confirmar en iOS
            //data={formatData(data, numColumns)}
            data={data}
            renderItem={this.renderItem}
            numColumns={numColumns}
            columnWrapperStyle={styles.wrapperStyle}
          />
        </View>
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
    paddingHorizontal: Dimensions.regularSpace,
  },
  sectionTitle: {
    fontSize: 20,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dimensions.regularSpace,
    marginRight: 0,
    marginBottom: 3,
    marginLeft: 0,
    color: Colors.grey,
  },
  item: {
    //alignItems: 'flex-start',
    //justifyContent: 'center',
    //flex: 1,
    //margin: 1,
    //height: Dimensions.window.width / numColumns + 70,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  //Estilo entre las filas
  wrapperStyle: {
    marginBottom: Dimensions.bigSpace,
  },
});
