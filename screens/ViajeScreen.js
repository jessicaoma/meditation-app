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
//TODO llamar al api
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
  };

  constructor(props) {
    super(props);

    /** @type {import('../utils/types').Viaje} */
    this.viaje = props.navigation.state.params.viaje;
    /*{
      id: 'via1',
      title: '¿Qué es ser feliz?',
      categoriaId: 'cat1',
      isFree: true,
      color: this.props.navigation.getParam('bg', '#fdd58d'),
      backgroundImage: 'http://okoconnect.com/karim/images/viaje-bg-2.png',
      status: enumStatus.doing,
    };*/

    /*this.viaje.pasos = [
      {
        id: 'pas1',
        title: 'Comienza el viaje',
        status: enumStatus.done,
        type: 'A',
      },
      {
        id: 'pas2',
        title: 'Teoría 1',
        status: enumStatus.doing,
        type: 'B',
      },
      {
        id: 'pas3',
        title: 'Reflexiones',
        status: enumStatus.todo,
        type: 'C',
      },
      {
        id: 'pas4',
        title: 'Ejercicio',
        status: enumStatus.todo,
        type: 'D',
      },
      {
        id: 'pas5',
        title: 'Recomendaciones',
        status: enumStatus.todo,
        type: 'E',
      },
      {
        id: 'pas6',
        title: 'Diario',
        status: enumStatus.todo,
        type: 'F',
      },
      {
        id: 'pas7',
        title: 'Cierre',
        status: enumStatus.todo,
        type: 'G',
      },
    ];*/
  }

  async componentDidMount() {
    const pasos = await API.getPasosDelViaje(this.viaje.key, user);
    pasos.forEach(paso => {
      paso.color = this.viaje.color;
    });
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({pasos});
  }

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
    <View style={[styles.containerLine]}>
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
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.line, {backgroundColor: this.viaje.color, height: 20}]}
        />
      </View>
    </View>
  );
  renderListEmpty = _ => (
    <ActivityIndicator size="large" color={this.viaje.color} />
  );
  keyExtractor = item => item.key;
  render() {
    return (
      <>
        <SafeAreaView
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flex: 1}}>
          <ScreenBg
            source={{uri: this.viaje.imagenFondo}}
            //color={this.viaje.color}>
            color={'#fff'}>
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
      </>
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
});
