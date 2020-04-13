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

const deviceWidth = Dims.window.width - Dims.regularSpace - Dims.regularSpace;
const deviceHeight = deviceWidth * 1.5 + Dims.regularSpace;

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Angel'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Angel'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
export default class AngelScreen extends Component {
  animVal = new Animated.Value(0);
  render() {
    const {carta} = this.props.route.params;
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.statusBar} />
        <ScrollView>
          <View style={[styles.container]}>
            <CardFlip
              ref={card => {
                this.card = card;
              }}>
              <TouchableOpacity onPress={() => this.card.flip()}>
                <SvgUri
                  width={deviceWidth}
                  height={deviceHeight}
                  uri={carta.reverso}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.card.flip()}>
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
    paddingHorizontal: Dims.regularSpace,
    flexDirection: 'column',
    justifyContent: 'center',
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
