import React, {Component} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
} from 'react-native';
import ScreenBg from '../components/screenBg';
import ItemBubble from '../components/ItemBubble';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Dimensions from '../constants/Dimensions';
import {HeaderBackButton} from 'react-navigation';
import {enumStatus} from '../utils/types';
import CheckItem from '../components/CheckItem';
import API, {user} from '../utils/API';
import ScalableText from 'react-native-text';

//TODO verificar que cada paso obtenga sus datos
//TODO control dado el estado de los pasos
/**
 * @typedef {Object} DataItemSeparator
 * @prop {boolean} highlighted
 * @prop {import('../utils/types').Paso} leadingItem Item superior del separador
 *
 * @typedef {object} Props
 * @prop {import('react-navigation').NavigationScreenProp} [navigation]
 */

/**
 * Viaje Screen
 * @extends {Component<Props>}
 * */
export default class ViajeScreen extends Component {
  state = {
    /** @type {import('../utils/types').Paso[]} */
    pasos: [],
    isLoading: true,
  };

  constructor(props) {
    super(props);

    /** @type {import('../utils/types').Viaje} */
    this.viaje = props.navigation.state.params.viaje;
  }

  componentDidMount = async () => {
    const pasos = await API.getPasosDelViaje(this.viaje.key, user);
    pasos.forEach(paso => {
      paso.color = this.viaje.color;
    });
    this.setState({pasos, isLoading: false});
  };

  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('viaje', {title: 'Viaje'}).titulo,
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  });

  _handleClick = index => {
    const {tipo} = this.state.pasos[index];
    // @ts-ignore
    this.props.navigation.navigate(`Paso${String.fromCharCode(65 + tipo)}`, {
      steps: this.state.pasos,
      position: index,
    });
  };

  /** @type {import('react-native').ListRenderItem<import('../utils/types').Paso>} */
  renderItem = ({item, index}) => {
    switch (item.estado) {
      case enumStatus.done:
        return (
          <CheckItem
            color={this.viaje.color}
            onPress={() => {
              this._handleClick(index);
            }}
            checked>
            {item.titulo}
          </CheckItem>
        );
      case enumStatus.doing:
        return (
          <CheckItem
            color={this.viaje.color}
            onPress={() => {
              this._handleClick(index);
            }}>
            {item.titulo}
          </CheckItem>
        );
      default:
        return (
          <CheckItem
            color={this.viaje.color}
            onPress={() => {
              this._handleClick(index);
            }}
            disable>
            {item.titulo}
          </CheckItem>
        );
    }
  };

  /**
   * @param {DataItemSeparator} data
   */
  renderSeparator = data => (
    <View style={styles.containerLine}>
      <View
        style={[
          styles.line,
          {
            backgroundColor:
              data.leadingItem.estado === enumStatus.done
                ? this.viaje.color
                : Colors.borderWhite,
          },
        ]}
      />
    </View>
  );

  renderHeader = () => (
    <View style={styles.containerHeader}>
      <ItemBubble color={this.viaje.color} fill bold fontSize={18} notMargin>
        {this.viaje.titulo}
      </ItemBubble>
      <View style={[styles.containerLine]}>
        <View
          style={[styles.line, {backgroundColor: this.viaje.color, height: 20}]}
        />
      </View>
    </View>
  );
  renderListEmpty = _ => {
    return this.state.isLoading ? (
      <ActivityIndicator size="large" color={this.viaje.color} />
    ) : (
      <View>
        <ScalableText style={styles.textoListaVacia}>
          Amet commodo nulla facilisi nullam vehicula. Lectus proin nibh nisl
          condimentum. Duis ultricies lacus sed turpis tincidunt id. Enim nunc
          faucibus a pellentesque sit amet.{' '}
        </ScalableText>
      </View>
    );
  };
  keyExtractor = item => item.key;
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScreenBg source={{uri: this.viaje.imagenFondo}} color={'#fff'}>
          <View style={styles.container}>
            <FlatList
              data={this.state.pasos}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              ListEmptyComponent={this.renderListEmpty}
              style={styles.containerList}
            />
            <View style={[styles.containerBottomButton]}>
              <TouchableOpacity
                //onPress={this.handleContinue}
                style={[styles.button]}>
                <Text style={styles.buttonLabel}>Continuar mi viaje</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScreenBg>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  containerList: {
    paddingHorizontal: Dimensions.regularSpace,
  },
  containerHeader: {
    paddingTop: Dimensions.regularSpace,
  },
  containerBottomButton: {
    paddingVertical: Dimensions.regularSpace,
    paddingHorizontal: Dimensions.regularSpace,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  button: {
    backgroundColor: Colors.second,
    borderRadius: 30,
    alignSelf: 'stretch',
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonLabel: {
    color: 'white',
    fontSize: Dims.window.width * 0.041,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.5,
    lineHeight: 50,
    fontFamily: 'MyriadPro-Regular',
  },
  containerLine: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 15,
    width: 3,
    margin: 'auto',
    backgroundColor: Colors.borderWhite,
  },
  textoListaVacia: {
    padding: 40,
    color: '#665e61',
    lineHeight: 22,
    textAlign: 'center',
    fontSize: Dimensions.paragraph,
  },
});
