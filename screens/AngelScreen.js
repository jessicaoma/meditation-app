import React, {Component} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Dims from '../constants/Dimensions';
import Colors from '../constants/Colors';
import SvgUri from '../components/SvgUri';
import CardFlip from '../components/CardFlip';
import ScalableText from 'react-native-text';
import Player from '../player/Player';
/**
 * @typedef {Object} ParamsNavigation
 * @prop {import('../utils/types').CartaDelAngel} carta
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 */

const deviceWidth = Dims.window.width - Dims.regularSpace - Dims.regularSpace;
const deviceHeight = deviceWidth * 1.5 + Dims.regularSpace;
const containerHeight = Dims.window.height - Dims.statusBarHeight -  (Dims.bigSpace * 2) - 28;
//const FIXED_BAR_WIDTH = 40;

/** @extends {Component<Props>} */
export default class AngelScreen extends Component {
  animVal = new Animated.Value(0);

  flipCard = () => {
    this.card.flip();
    //TODO play sound
    this.player._startPlayer();
  };

  render() {
    /** @type {ParamsNavigation} */
    const {carta, angel} = this.props.navigation.state.params;
    // const locationAfirma = angel.mensaje.indexOf('Afirma');
    // const mensajeSub = angel.mensaje.substring(0, locationAfirma);
    // const afirmaSup = angel.mensaje.substring(locationAfirma);
    // const numItems = carta.faces.length;
    // const itemWidth =
    //   FIXED_BAR_WIDTH / numItems - (numItems - 1) * Dims.smallSpace;
    // const imageArray = carta.faces.map((item, index) => {
    //   return (
    //   );
    // });
    console.log('Angel');
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.statusBar} />
        <ScrollView>
          <View style={{height: 0}}>
            <Player //http://okoconnect.com/karim/assets/angeles/cartaangel.mp3
              source={require('../assets/audio/cartaangel.mp3')}
              ref={ref => {
                this.player = ref;
              }}
              onEnd={state => {
                console.log(state);
                this.player._onSeekSliderValueChange();
                this.player._onSeekSliderSlidingComplete(0);
                this.player.playbackInstance.pauseAsync();
              }}
            />
          </View>
          <View style={[styles.container]}>
            <CardFlip
              ref={card => {
                this.card = card;
              }}>
              <TouchableOpacity onPress={() => this.flipCard()}>
                <SvgUri
                  width={deviceWidth}
                  height={deviceHeight}
                  source={{uri: carta.reverso}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.flipCard()}>
                <SvgUri
                  width={deviceWidth}
                  height={deviceHeight}
                  source={{uri: carta.frontal}}
                />
              </TouchableOpacity>
            </CardFlip>
            <ScalableText style={styles.suggestion}>
              Toca para descubrir
            </ScalableText>
          </View>
        </ScrollView>
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
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: Dims.regularSpace,
    justifyContent: 'center',
    alignItems: 'center',
    height: containerHeight,
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
