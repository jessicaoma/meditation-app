import React, {Component} from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import Buttom from '../components/Buttom';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import API from '../utils/API';
import ScalableText from 'react-native-text';
import {SvgUri} from 'react-native-svg';
import {connect} from 'react-redux';

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Categorias'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Categorias'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class Categorias extends Component {
  /** @type {{categorias:import('../utils/types').Categoria[]}} */
  state = {
    categorias: [],
  };

  componentDidMount = async () => {
    const data = await API.getCategorias();
    this.setState({
      categorias: data,
    });
  };

  /** @param {import('../utils/types').Categoria} item */
  _handleClick = item => {
    this.props.navigation.navigate('ViajeStack', {
      titulo: item.titulo,
    });
    this.props.dispatch({
      type: 'SET_CATEGORIA',
      payload: {
        categoria: item,
      },
    });
  };
  /** @param {import('../utils/types').Categoria} item */
  keyExtractor = item => item.key;

  renderListHeader = () => <Text style={styles.sectionTitle}>Cursos</Text>;

  renderListEmpty = _ => (
    <ActivityIndicator size="large" color={Colors.primaryDark} />
  );

  /** @param {import('react-native').ListRenderItemInfo<import('../utils/types').Categoria>} info*/
  renderItem = ({item}) => (
    <Buttom
      style={{
        backgroundColor: item.color || Colors.primaryDark,
        position: 'relative',
      }}
      onPress={() => {
        this._handleClick(item);
      }}>
      <ScalableText style={styles.title_boxes}>{item.titulo}</ScalableText>
      <SvgUri style={styles.image} uri={item.imagenLista} />
    </Buttom>
  );
  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.statusBar} />
        <FlatList
          style={styles.container}
          data={this.state.categorias}
          ListHeaderComponent={this.renderListHeader}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.renderListEmpty}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusBar: {
    height: Platform.OS === 'android' ? Dims.statusBarHeight : 0,
  },
  container: {
    paddingHorizontal: Dims.regularSpace,
    zIndex: 1,
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
  title_boxes: {
    color: '#494c6b',
    fontSize: Dims.bubbleTitle,
    letterSpacing: Dims.bubbleTitleSpacing,
    lineHeight: 23,
    textTransform: 'uppercase',
    alignSelf: 'center',
    maxWidth: '65%',
    fontFamily: 'MyriadPro-Regular',
  },
  image: {
    resizeMode: 'cover',
    width: 'auto',
    height: 80,
  },
});

export default connect(null)(Categorias);
