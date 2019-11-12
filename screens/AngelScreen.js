import React, { Component } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, Text, ImageBackground } from 'react-native'
import Dims from '../constants/Dimensions';
import Colors from '../constants/Colors';


const deviceWidth = Dimensions.get('window').width - Dims.regularSpace - 16
const deviceHeight = (deviceWidth * 1.5) + 16
const FIXED_BAR_WIDTH = 40
const BAR_SPACE = 8

const images = [
  {
    image: 'http://okoconnect.com/karim/images/angel1.png',
    text:  ''
  },
  {
    image: 'http://okoconnect.com/karim/images/angelreve1-vacio.png',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  }
]

export default class AngelScreen extends Component {
 
  numItems = images.length
  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  animVal = new Animated.Value(0)

  static navigationOptions = {
    title: 'Tu ángel',
  };
  
  render() {
    let imageArray = []
    let barArray = []
    images.forEach((item, i) => {
      const thisImage = (
        <ImageBackground
          key={`image${i}`}
          source={{uri: item.image}}
          style={[styles.sliderImage]}
        >
          <View style={styles.topBox}>
              <Text style={styles.headline}>{item.text}</Text>

          </View>
        </ImageBackground>
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View

            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    })

    return (
      <>
      <View style={styles.statusBar} />
      <View
        style={[styles.container]}
        flex={1}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
            )
          }
          style={styles.slider}
        >
          {imageArray}
        </ScrollView>
        <View
          style={styles.barContainer}
        >
          {barArray}
        </View>
      </View>
      </>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Dims.regularSpace,
  },
  slider: {
    marginTop: 20,
  },
  sliderImage: {
    width: deviceWidth,
    height: deviceHeight,
    resizeMode: 'contain',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    left: '50%',
    translateX: '-50%',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 5,
    borderRadius: 5,
  },
  bar: {
    backgroundColor: Colors.grey,
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
    color: Colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 60,
  }
})