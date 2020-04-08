import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import API from '../utils/API';
import SvgUri from '../components/SvgUri';
import ScalableText from 'react-native-text';

/**
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 */

//TODO registrar seleccion
const numColumns = 2;
const height = ((Dims.window.width - 40) / numColumns) * 1.5;
const width = (Dims.window.width - 40) / numColumns;

/** @extends {Component<Props>} */
export default class AngelCartasScreen extends Component {
  constructor(props) {
    super(props);
    this.angelMessage = undefined;
    this.state = {
      /**@type {import('../utils/types').CartaDelAngel[]} */
      cartas: [],
    };
  }

  componentDidMount = async () => {
    let cartas = await API.getAngelMessage();
    this.setState({
      cartas,
    });
  };

  /**
   * @param {import('../utils/types').CartaDelAngel} item
   */
  _handleClick = item => {
    this.props.navigation.navigate('Angel', {
      carta: item,
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
          <SvgUri width={width} height={height} source={{uri: item.reverso}} />
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    return (
      <ScalableText style={styles.suggestion}>Elige una carta para ver el mensaje de tu ángel</ScalableText>
    );
  };


  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.statusBar} />
        <View style={styles.container}>
          <FlatList
            data={this.state.cartas}
            renderItem={this.renderItem}
            ListFooterComponent={this.renderFooter}
            numColumns={numColumns}
          />
          
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusBar: {
    height: Dims.statusBarHeight,
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
    zIndex: 3
  },
  containercard: {
    marginBottom: 3,
    borderRadius: 20,
  },
});
