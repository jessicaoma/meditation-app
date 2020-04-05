import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
} from 'react-native';
import ScreenBg from '../components/screenBg';
import ItemBubble from '../components/ItemBubble';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Dimensions from '../constants/Dimensions';
import {HeaderBackButton} from 'react-navigation';
import API, {user} from '../utils/API';

/**
 * @typedef {object} Props
 * @prop {import('react-navigation').NavigationScreenProp} [navigation]
 *
 * Viajes Completados Screen
 * @extends {Component<Props>}
 * */
export default class ViajeCompletadosScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Módulos Finalizados',
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  });
  state = {
    /** @type {import("../utils/types").Viaje[]} */
    viajes: [],
  };
  componentDidMount = async () => {
    const viajes = await API.getViajesCompletados(user);
    this.setState({viajes});
  };

  /** @param {import("../utils/types").Viaje} viaje*/
  _handleClick = viaje => {
    this.props.navigation.navigate('ViajeStack', {
      viaje,
    });
  };

  /** @param {{item : import('../utils/types').Viaje}} item*/
  renderItem = ({item}) => {
    return (
      <ItemBubble
        key={this.keyExtractor(item)}
        color={item.color}
        fill
        bold
        fontSize={18}
        onPress={() => {
          this._handleClick(item);
        }}>
        {item.titulo}
      </ItemBubble>
    );
  };
  keyExtractor = item => item.key;
  renderListEmpty = _ => {
    return <ActivityIndicator size="large" color={Colors.primaryDark} />;
  };
  render() {
    return (
      <ScreenBg
        source={{uri: 'http://okoconnect.com/karim/images/tuangel-bg.png'}}
        color={'#fff'}
        styleView={styles.fullscreen}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Text style={styles.bigTitle}>¡Vas muy bien!</Text>
          <Text style={styles.bigParagraph}>
            Has completado los siguientes módulos. Si deseas consultar nuevamente
            el contenido, presiona sobre el módulo de interés.
          </Text>
          <View style={styles.container}>
            {this.state.viajes.length === 0
              ? this.renderListEmpty()
              : this.state.viajes.map(viaje => this.renderItem({item: viaje}))}
          </View>
        </ScrollView>
      </ScreenBg>
    );
  }
}

const styles = StyleSheet.create({
  fullscreen: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    paddingBottom: 50,
    paddingTop: Dimensions.regularSpace,
  },
  container: {
    paddingHorizontal: Dimensions.regularSpace,
    paddingTop: Dimensions.regularSpace,
  },
  bigTitle: {
    fontSize: 22,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dims.regularSpace,
    marginRight: 0,
    marginBottom: 20,
    marginLeft: 0,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Bold',
    textAlign: 'center',
  },
  bigParagraph: {
    fontSize: 18,
    letterSpacing: 1.11,
    lineHeight: 28,
    marginBottom: 5,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'center',
    paddingHorizontal: Dims.regularSpace,
  },
});
