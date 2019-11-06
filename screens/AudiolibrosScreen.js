import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList, StatusBar} from 'react-native';
import HalfCover from '../components/HalfCover';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import API from '../utils/API';
import ActionBarImage from '../navigation/ActionBarImage';

const numColumns = 2;
//Estoy restando los margenes laterales (16 + 16), y eso lo divido entre las columnas.
const widthItem = (Dimensions.window.width - Dimensions.hugeSpace) / numColumns;

//Para la separación entre los elementos de una fila, debe hacerse manual.

export default class AudiolibrosScreen extends Component {
  
  static navigationOptions = {
    //title: 'AudioLibros',
    //header: null,
    tabBarIcon: ({focused}) => (
      <ActionBarImage uri='http://okoconnect.com/karim/images/icons/iconLibros.png' style={{opacity: 1}} />
    ),
  };

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
          color={'#fff'}
          width={widthItem}
        />
      </View>
    );
  };

  _renderEmtpy = () => <Text>No hay Audiolibros disponibles :(</Text>;

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
