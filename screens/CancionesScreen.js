import React, {Component} from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Buttom from '../components/Buttom';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import ScalableText from 'react-native-text';
import API from '../utils/API';
import {SvgUri} from 'react-native-svg';

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Canciones'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Canciones'>} route
 * @extends {Component<Props>}
 */
export default class Canciones extends Component {
  static navigationOptions = {
    title: 'Música',
  };
  state = {
    /** @type {import('../utils/types').Canción[]} */
    canciones: [],
  };

  componentDidMount = async () => {
    const data = await API.getCanciones();
    this.setState({
      canciones: data,
    });
  };
  /** @param {import('../utils/types').Canción} item */
  _handleClick = item => {
    this.props.navigation.navigate('Cancion', {
      cancion: item,
    });
  };
  /** @param {import('../utils/types').Canción} item */
  keyExtractor = item => item.key;

  renderListHeader = () => <Text style={styles.sectionTitle}>Música</Text>;

  renderListEmpty = _ => <ActivityIndicator size="large" color={'#d9e0f9'} />;

  /** @param {import('react-native').ListRenderItemInfo<import('../utils/types').Canción>} info*/
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
        <FlatList
          style={styles.container}
          data={this.state.canciones}
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
    maxWidth: '75%',
  },
  image: {
    resizeMode: 'cover',
    width: 'auto',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
});
