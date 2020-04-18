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
import {SvgUri} from 'react-native-svg';
import CardFlip from '../components/CardFlip';
import ScalableText from 'react-native-text';
import Player from '../player/Player';

const deviceWidth = Dims.window.width - Dims.regularSpace - Dims.regularSpace;
const deviceHeight = deviceWidth * 1.5 + Dims.regularSpace;
const containerHeight = Dims.window.height - Dims.statusBarHeight -  (Dims.bigSpace * 2) - 28;

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Angel'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Angel'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
export default class AngelScreen extends Component {
  animVal = new Animated.Value(0);

  flipCard = () => {
    this.card.flip();
    //TODO play sound
    this.player._startPlayer();
  };

  render() {
    const {carta} = this.props.route.params;
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
                  uri={carta.reverso}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.flipCard()}>
                <SvgUri
                  width={deviceWidth}
                  height={deviceHeight}
                  uri={carta.frontal}
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
