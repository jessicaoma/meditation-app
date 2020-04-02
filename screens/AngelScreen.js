import React, {Component} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Dims from '../constants/Dimensions';
import Colors from '../constants/Colors';
import SvgUri from '../components/SvgUri';
import CardFlip from '../components/CardFlip';

/**
 * @typedef {Object} ParamsNavigation
 * @prop {import('./AngelCartasScreen').Card} carta
 * @prop {import('../utils/types').AngelMensaje} angel
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 */

const deviceWidth = Dims.window.width - Dims.regularSpace - Dims.regularSpace;
const deviceHeight = deviceWidth * 1.5 + Dims.regularSpace;
const FIXED_BAR_WIDTH = 40;

/** @extends {Component<Props>} */
export default class AngelScreen extends Component {
  animVal = new Animated.Value(0);
  render() {
    /** @type {ParamsNavigation} */
    const {carta, angel} = this.props.navigation.state.params;
    // const locationAfirma = angel.mensaje.indexOf('Afirma');
    // const mensajeSub = angel.mensaje.substring(0, locationAfirma);
    // const afirmaSup = angel.mensaje.substring(locationAfirma);
    // const numItems = carta.faces.length;
    // const itemWidth =
    //   FIXED_BAR_WIDTH / numItems - (numItems - 1) * Dims.smallSpace;
    const imageArray = carta.faces.map((item, index) => {
      return (
        <TouchableOpacity onPress={() => this.card.flip()}>
          <SvgUri
            width={deviceWidth}
            height={deviceHeight}
            source={{uri: item}}
          />
        </TouchableOpacity>
      );
    });

    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.statusBar} />
        <View style={[styles.container]}>
          <CardFlip ref={card => (this.card = card)}>{imageArray}</CardFlip>
        </View>
        <Text style={styles.suggestion}>Tap para descubrir</Text>
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
    flex: 1,
    paddingHorizontal: Dims.regularSpace,
  },
  statusBar: {
    height: Dims.statusBarHeight,
  },
  suggestion: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 16,
    lineHeight: 28,
    textAlign: 'center',
    color: '#665e61',
  },
});
