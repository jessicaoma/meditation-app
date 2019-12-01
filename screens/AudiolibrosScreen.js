import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import HalfCover from '../components/HalfCover';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import Constants from 'expo-constants';
import API from '../utils/API';

const numColumns = 2;
//Estoy restando los margenes laterales (16 + 16), y eso lo divido entre las columnas.
const widthItem = (Dimensions.window.width - Dimensions.hugeSpace) / numColumns;

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
    //console.log(this.state.meditaciones[0]);
  }

  _handleClick = item => {
    this.props.navigation.navigate('Audiolibro', {audiolibro: item});
  };

  _renderItem = ({item}) => {
    return (
      <View>
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
  );
  _renderListHeader = () => (
    <Text style={styles.sectionTitle}>Audiolibros</Text>
  );

  render() {
    return (
      <>
        <SafeAreaView>
        <View style={styles.statusBar} />
        <FlatList
          data={this.state.audioLibros}
          renderItem={this._renderItem}
          numColumns={numColumns}
          columnWrapperStyle={styles.wrapperStyle}
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
  wrapperStyle: {
    marginBottom: Dimensions.bigSpace,
  },
});
