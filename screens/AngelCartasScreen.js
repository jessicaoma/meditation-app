import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import API from '../utils/API';
import {SvgUri} from 'react-native-svg';
import ScalableText from 'react-native-text';
import {connect} from 'react-redux';
import {SET_ANGEL} from '../reducers/types';

const numColumns = 2;
const height = ((Dims.window.width - 40) / numColumns) * 1.5;
const width = (Dims.window.width - 40) / numColumns;

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Cartas'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Cartas'>} route
 * @prop {string} angelTime
 * @prop {import('../utils/types').Usuario} usuario
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class AngelCartasScreen extends Component {
  /** @param {Props} props */
  constructor(props) {
    super(props);
    this.state = {
      /**@type {import('../utils/types').CartaDelAngel[]} */
      cartas: [],
    };
  }

  componentDidMount = async () => {
    let cartas = await API.getAngelMessage(this.props.usuario.token);
    this.setState({
      cartas,
    });
  };

  /**
   * @param {import('../utils/types').CartaDelAngel} item
   */
  _handleClick = item => {
    let now = new Date();
    this.props.dispatch({
      type: SET_ANGEL,
      payload: {
        angel: item,
        angelTime: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
        ).toJSON(),
      },
    });
  };

  /**
   * @param {import('react-native').ListRenderItemInfo<import('../utils/types').CartaDelAngel>} item
   */
  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this._handleClick(item);
        }}>
        <View style={styles.containercard}>
          <SvgUri width={width} height={height} uri={item.reverso} />
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    return (
      <ScalableText style={styles.suggestion}>
        Elige una carta para ver el mensaje de tu ángel
      </ScalableText>
    );
  };

  renderListEmpty = _ => (
    <ActivityIndicator size="large" color={Colors.primaryDark} />
  );

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.statusBar} />
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Mensajes de tus ángeles</Text>
          <FlatList
            data={this.state.cartas}
            renderItem={this.renderItem}
            ListFooterComponent={this.renderFooter}
            numColumns={numColumns}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={this.renderListEmpty}
          />
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    angelTime: state.angelTime,
    usuario: state.usuario,
  };
}

export default connect(mapStateToProps)(AngelCartasScreen);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusBar: {
    height: Platform.OS === 'android' ? Dims.statusBarHeight : 0,
  },
  container: {
    flex: 1,
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
  suggestion: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    color: '#665e61',
    padding: 5,
    zIndex: 3,
  },
  containercard: {
    marginBottom: 3,
    borderRadius: 20,
  },
});
