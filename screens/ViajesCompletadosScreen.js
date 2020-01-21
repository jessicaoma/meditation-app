import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
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
    title: 'Viajes Completados',
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
  // viaje = {
  //   id: 1,
  //   title: 'Ser Feliz',
  //   pasos: [
  //     {
  //       id: 'via1',
  //       status: 'viajeTitle',
  //       title: '¿Qué es ser feliz?',
  //       color: '#fdd58d',
  //     },
  //     {
  //       id: 'via2',
  //       title: 'Vive Incondicionalmente',
  //       status: 'viajeTitle',
  //       color: '#cbe3e2',
  //     },
  //     {
  //       id: 'via3',
  //       title: 'Un Viaje de Autoestima',
  //       color: '#f1dee1',
  //       status: 'viajeTitle',
  //     },
  //     {
  //       id: 'via4',
  //       title: 'Un Viaje de Vida Saludable',
  //       color: '#f1dee1',
  //       status: 'viajeTitle',
  //     },
  //     {
  //       id: 'via5',
  //       title: 'Otro Viaje',
  //       status: 'viajeTitle',
  //       color: '#a8aed4',
  //     },
  //   ],
  //   color: this.props.navigation.getParam('bg', '#fdd58d'),
  //   bgImg: 'http://okoconnect.com/karim/images/tuangel-bg.png',
  // };
  /** @param {import("../utils/types").Viaje} viaje*/
  _handleClick = viaje => {
    //alert('This is a button!');
    this.props.navigation.navigate('ViajeStack', {
      viaje,
    });
  };

  /** @param {{item : import('../utils/types').Viaje}} item*/
  renderItem = ({item}) => {
    return (
      <>
        <SafeAreaView>
          <ItemBubble
            color={item.color}
            fill
            bold
            fontSize={18}
            onPress={() => {
              this._handleClick(item);
            }}>
            {item.titulo}
          </ItemBubble>
        </SafeAreaView>
      </>
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
            Has completado los siguientes viajes. Si deseas consultar nuevamente
            el contenido, presiona sobre el viaje de interés.
          </Text>
          <FlatList
            data={this.state.viajes}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            style={styles.container}
            ListEmptyComponent={this.renderListEmpty}
          />
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
