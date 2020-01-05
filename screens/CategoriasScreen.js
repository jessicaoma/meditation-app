import React, {Component} from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Buttom from '../components/Buttom';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import API from '../utils/API';
import Constants from 'expo-constants';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class Categorias extends Component {
  static navigationOptions = {
    header: null,
  };
  /** @type {{categorias:import('../utils/types').Categoria[]}} */
  state = {
    categorias: [],
  };

  async componentDidMount() {
    const data = await API.getCategorias();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      categorias: data,
    });
  }

  /** @param {import('../utils/types').Categoria} item */
  _handleClick = item => {
    this.props.navigation.navigate('Categoria', {
      categoria: item,
    });
  };
  /** @param {import('../utils/types').Categoria} item */
  keyExtractor = item => item.id;

  renderListHeader = () => <Text style={styles.sectionTitle}>Categorías</Text>;

  renderListEmpty = _ => (
    <ActivityIndicator size="large" color={Colors.primaryDark} />
  );

  /** @param {import('react-native').ListRenderItemInfo<import('../utils/types').Categoria>} info*/
  renderItem = ({item}) => (
    <Buttom
      style={{backgroundColor: item.color || Colors.primaryDark}}
      onPress={() => {
        this._handleClick(item);
      }}>
      <ScalableText style={styles.title_boxes}>{item.title}</ScalableText>
      <Image style={styles.image} source={{uri: item.itemImage}} />
    </Buttom>
  );
  render() {
    return (
      <>
        <SafeAreaView style={{flex: 1}}>
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
      </>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
  container: {
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
  title_boxes: {
    color: '#494c6b',
    fontSize: Dims.bubbleTitle,
    letterSpacing: Dims.bubbleTitleSpacing,
    lineHeight: 23,
    textTransform: 'uppercase',
    alignSelf: 'center',
    maxWidth: '65%',
  },
  image: {
    resizeMode: 'cover',
    width: 83,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
});
