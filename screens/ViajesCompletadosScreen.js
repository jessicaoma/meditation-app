import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  SafeAreaView,
  Image
} from 'react-native';
import ScreenBg from '../components/screenBg';
import ItemBubble from '../components/ItemBubble';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Dimensions from '../constants/Dimensions';
import {HeaderBackButton} from 'react-navigation';
import API, {user} from '../utils/API';
import ScalableText from 'react-native-text';

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
      <SafeAreaView style={styles.safe}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>

          <Image
              resizeMode="cover"
              source={{
                uri:
                  'http://okoconnect.com/karim/assets/images/viajes-completados.png',
              }}
              style={styles.image}
            />
           <ScalableText style={styles.bigTitle}>¡Vas muy bien!</ScalableText>
            <ScalableText style={styles.bigParagraph}>
              Has completado los siguientes módulos. Si deseas consultar nuevamente
              el contenido, presiona sobre el módulo de interés.
            </ScalableText>

            <View style={styles.container}>
              {this.state.viajes.length === 0
                ? this.renderListEmpty()
                : this.state.viajes.map(viaje => this.renderItem({item: viaje}))}
            </View>
         
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
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
    fontSize: 16,
    letterSpacing: 1.11,
    lineHeight: Dims.viajeParrafoLineHeight,
    marginBottom: 5,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'left',
    paddingHorizontal: Dims.bigSpace,
  },
  image: {
    flex: 1,
    width: Dims.window.width,
    height: Dims.window.width * 0.80,
  },
});
