import React, {Component} from 'react';
import {
  Animated,
  Button,
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

const deviceWidth = Dims.window.width - Dims.regularSpace - Dims.regularSpace;
const deviceHeight = deviceWidth * 1.5 + Dims.regularSpace;
const FIXED_BAR_WIDTH = 40;
const BAR_SPACE = 8;

const info = [
  {
    image: 'http://okoconnect.com/karim/images/slider-bg-0.png',
    text: '',
  },
  {
    image: 'http://okoconnect.com/karim/images/slider-bg-1.png',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    image: 'http://okoconnect.com/karim/images/slider-bg-2.png',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
];

/**
 * Paso Tipo(A): Viaje Highlight
 * @typedef {Object} ParamsNavigation
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 *
 * @extends {Component<Props>}
 */
export default class PasoAScreen extends Component {
  numItems = info.length;
  itemWidth = FIXED_BAR_WIDTH / this.numItems - (this.numItems - 1) * BAR_SPACE;
  animVal = new Animated.Value(0);

  static navigationOptions = {
    title: 'Paso A',
  };

  _handleClick = () => {
    //alert('This is a button!');
    this.props.navigation.replace('PasoB');
  };

  render() {
    let imageArray = [];
    let barArray = [];
    info.forEach((item, i) => {
      const thisImage = (
        <ImageBackground
          key={`image${i}`}
          source={{uri: item.image}}
          style={[styles.sliderImage]}>
          <View style={styles.topBox}>
            <Text style={styles.headline}>{item.text}</Text>
          </View>
        </ImageBackground>
      );
      imageArray.push(thisImage);

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      });

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}>
          <Animated.View
            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [{translateX: scrollBarVal}],
              },
            ]}
          />
        </View>
      );
      barArray.push(thisBar);
    });

    return (
      <>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.statusBar} />
          <View style={[styles.container]}>
            <Button onPress={this._handleClick} title="Paso B" />
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
