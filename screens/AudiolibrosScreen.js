import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import BookListItem from '../components/BookListItem';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import Constants from 'expo-constants';
import API from '../utils/API';

//Estoy restando los margenes laterales (16 + 16), y eso lo divido entre las columnas.
const widthItem = Dimensions.window.width - (Dimensions.regularSpace * 2);

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 *
 * @extends {Component<Props>}
 */
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
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      audioLibros: data,
    });
  }

  _handleClick = item => {
    this.props.navigation.navigate('Audiolibro', {audiolibro: item});
  };

  _renderItem = ({item}) => {
    return (
      <View style={{alignSelf: 'stretch'}}>
        <BookListItem
          source={{uri: item.itemImage}}
          width={widthItem}
          height={widthItem * 0.4286}
          onPress={() => {
            this._handleClick(item);
          }}
          onLoad={event => {
            const {height, url, width} = event.nativeEvent.source;
            console.log(height + ' ' + width);
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
      <>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.statusBar} />
          <FlatList
            data={this.state.audioLibros}
            renderItem={this._renderItem}
            ListEmptyComponent={this._renderEmtpy}
            keyExtractor={item => item.id}
            ListHeaderComponent={this._renderListHeader}
            style={styles.container}
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
