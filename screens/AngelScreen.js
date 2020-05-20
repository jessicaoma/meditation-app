import React, {Component} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Dims from '../constants/Dimensions';
import {SvgUri} from 'react-native-svg';
import CardFlip from '../components/CardFlip';
import ScalableText from 'react-native-text';
import Player from '../player/Player';
import {connect} from 'react-redux';

const deviceWidth = Dims.window.width - Dims.regularSpace - Dims.regularSpace;
const deviceHeight = deviceWidth * 1.5 + Dims.regularSpace;
const containerHeight = Dims.window.height - Dims.statusBarHeight - 28;

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Angel'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Angel'>} route
 * @prop {import('../utils/types').CartaDelAngel} angel
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class AngelScreen extends Component {
  animVal = new Animated.Value(0);

  flipCard = () => {
    this.card.flip();
    //TODO play sound
    this.player._startPlayer();
  };

  render() {
    const {angel} = this.props;
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.statusBar} />
        <View style={{height: 0}}>
          <Player //http://okoconnect.com/karim/assets/angeles/cartaangel.mp3
            source={require('../assets/audio/cartaangel.mp3')}
            ref={ref => {
              this.player = ref;
            }}
            onEnd={state => {
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
                uri={angel.reverso}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.flipCard()}>
              <SvgUri
                width={deviceWidth}
                height={deviceHeight}
                uri={angel.frontal}
              />
            </TouchableOpacity>
          </CardFlip>
          <ScalableText style={styles.suggestion}>
            Toca para descubrir
          </ScalableText>
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    angelTime: state.angelTime,
    angel: state.angel,
  };
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
    height: Platform.OS === 'android' ? Dims.statusBarHeight : 0,
  },
  suggestion: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 16,
    lineHeight: 28,
    textAlign: 'center',
    color: '#665e61',
  },
});

export default connect(mapStateToProps)(AngelScreen);
