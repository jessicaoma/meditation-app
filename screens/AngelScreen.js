import React, {Component} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import Constants from 'expo-constants';
import Dims from '../constants/Dimensions';
import Colors from '../constants/Colors';

/**
 * @typedef {Object} ParamsNavigation
 * @prop {import('./AngelCartasScreen').Card} carta
 * @prop {import('../utils/types').AngelMensaje} mensaje
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
    const {carta, mensaje} = this.props.navigation.state.params;
    const numItems = carta.faces.length;
    const itemWidth =
      FIXED_BAR_WIDTH / numItems - (numItems - 1) * Dims.smallSpace;
    const imageArray = carta.faces.map((item, index) => {
      return (
        <ImageBackground
          key={`cardimage${index}`}
          source={item}
          style={[styles.sliderImage]}>
          {index === 0 ? (
            //aca ira el titulo (mensaje.title)
            <View />
          ) : (
            <View style={styles.topBox}>
              <Text style={styles.headline}>{mensaje.sentence}</Text>
            </View>
          )}
        </ImageBackground>
      );
    });
    const barArray = carta.faces.map((item, index) => {
      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (index - 1), deviceWidth * (index + 1)],
        outputRange: [-itemWidth, itemWidth],
        extrapolate: 'clamp',
      });
      return (
        <View
          key={`bar${index}`}
          style={[
            styles.track,
            {
              width: itemWidth,
              marginLeft: index === 0 ? 0 : Dims.smallSpace,
            },
          ]}>
          <Animated.View
            style={[
              styles.bar,
              {
                width: itemWidth,
                transform: [{translateX: scrollBarVal}],
              },
            ]}
          />
        </View>
      );
    });

    return (
      <>
        <SafeAreaView>
          <View style={styles.statusBar} />
          <View style={[styles.container]}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={10}
              pagingEnabled
              onScroll={Animated.event([
                {nativeEvent: {contentOffset: {x: this.animVal}}},
              ])}
              style={styles.slider}>
              {imageArray}
            </ScrollView>
            <View style={styles.barContainer}>{barArray}</View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Dims.regularSpace,
  },
  statusBar: {
    height: Constants.statusBarHeight,
  },
  slider: {
    marginTop: 20,
  },
  sliderImage: {
    width: deviceWidth,
    height: deviceHeight,
    //resizeMode: 'contain',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    left: '50%',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 5,
    borderRadius: 5,
  },
  bar: {
    backgroundColor: Colors.gray,
    height: 5,
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 5,
  },
  topBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 18,
    lineHeight: 33,
    textAlign: 'center',
    color: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
});
