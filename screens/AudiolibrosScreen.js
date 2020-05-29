import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import BookListItem from '../components/BookListItem';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import API from '../utils/API';
import {connect} from 'react-redux';

//Estoy restando los margenes laterales (16 + 16), y eso lo divido entre las columnas.
const widthItem = Dimensions.window.width - Dimensions.regularSpace * 2 - 0;

/**
 * @typedef Props
 * @prop {import('../utils/types').Categoria} categoria
 * @prop {import('../utils/types').Viaje} viaje
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Audiolibros'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Audiolibros'>} route
 * @prop {import('../utils/types').Usuario} usuario
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class AudiolibrosScreen extends Component {
  static navigationOptions = {};

  constructor(props) {
    super(props);
    this.state = {
      /** @type {import('../utils/types').Audiolibro[]} */
      audioLibros: [],
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.refeshData();
    });
  }

  async refeshData() {
    this.setState({
      audioLibros: [],
    });
    const data = await API.getAudiolibros(this.props.usuario.token);
    this.setState({
      audioLibros: data,
    });
  }

  _handleClick = item => {
    this.props.navigation.navigate('Audiolibro', {audiolibro: item});
  };
  /** @param {{item :import('../utils/types').Audiolibro}} item*/
  _renderItem = ({item}) => {
    return (
      <View style={{marginBottom: 10}}>
        <BookListItem
          source={{uri: item.imagenLista}}
          width={widthItem}
          height={widthItem * 0.4286}
          onPress={() => {
            this._handleClick(item);
          }}
        />
      </View>
    );
  };

  _renderEmtpy = () => (
    <ActivityIndicator size="large" color={Colors.primaryDark} />
  );
  _renderListHeader = () => (
    <Text style={styles.sectionTitle}>Audiolibros</Text>
  );

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.statusBar} />
        <FlatList
          data={this.state.audioLibros}
          renderItem={this._renderItem}
          ListEmptyComponent={this._renderEmtpy}
          keyExtractor={item => item.key.toString()}
          ListHeaderComponent={this._renderListHeader}
          style={styles.container}
        />
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    usuario: state.usuario,
  };
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: 'white'},
  statusBar: {
    height: Platform.OS === 'android' ? Dimensions.statusBarHeight : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: Dimensions.regularSpace,
  },
  sectionTitle: {
    fontSize: Dimensions.h2,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dimensions.regularSpace,
    marginRight: 0,
    marginBottom: 3,
    marginLeft: 0,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Bold',
  },
});

export default connect(mapStateToProps)(AudiolibrosScreen);
