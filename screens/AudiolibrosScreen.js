import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import HalfCover from '../components/HalfCover';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import Constants from 'expo-constants';
import API from '../utils/API';

const numColumns = 2;
//Estoy restando los margenes laterales (16 + 16), y eso lo divido entre las columnas.
const widthItem = (Dimensions.window.width - Dimensions.hugeSpace) / numColumns;

//Para la separación entre los elementos de una fila, debe hacerse manual.

export default class AudiolibrosScreen extends Component {
  static navigationOptions = {};

  constructor(props) {
    super(props);
    this.state = {
      audioLibros: [],
    };
  }
  async componentDidMount() {
    const data = await API.getAudiolibros();
    this.setState({
      audioLibros: data,
    });
    //console.log(this.state.meditaciones[0]);
  }

  _handleClick = item => {
    this.props.navigation.navigate('Audiolibro', {audiolibro: item});
  };

  _renderItem = ({item}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <HalfCover
          source={{uri: item.itemImage}}
          onPress={() => {
            this._handleClick(item);
          }}
          title={item.title}
          width={widthItem}
          height={widthItem}
        />
      </View>
    );
  };

  _renderEmtpy = () => (
    <ActivityIndicator size="large" color={Colors.primaryDark} />
  ); //<Text>No hay Audiolibros disponibles :(</Text>;

  render() {
    return (
      <>
        <View style={styles.statusBar} />
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Audiolibros</Text>
          <FlatList
            data={this.state.audioLibros}
            renderItem={this._renderItem}
            numColumns={numColumns}
            columnWrapperStyle={styles.wrapperStyle}
            ListEmptyComponent={this._renderEmtpy}
            keyExtractor={item => item.id}
          />
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
    paddingHorizontal: Dimensions.regularSpace,
  },
  sectionTitle: {
    fontSize: 17,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dimensions.regularSpace,
    marginRight: 0,
    marginBottom: 3,
    marginLeft: 0,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Bold',
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
