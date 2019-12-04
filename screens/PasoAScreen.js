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
  TouchableOpacity,
  Object,
} from 'react-native';
import Constants from 'expo-constants';
import Dims from '../constants/Dimensions';
import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';

const deviceWidth = Dims.window.width;
const deviceHeight = '100%';
const FIXED_BAR_WIDTH = 40;
const BAR_SPACE = 8;


const info = [
  {
    key: 'slide1',
    image: 'http://okoconnect.com/karim/images/slider-bg-0.png',
    text: 'Para ti,\n¿Qué es ser feliz?',
  },
  {
    key: 'slide2',
    image: 'http://okoconnect.com/karim/images/slider-bg-1.png',
    text:
      'Hoy darás el primer paso a una vida plena. En este viaje, te conectarás con #yoconscientey el momento presente.',
  },
  {
    key: 'slide3',
    image: 'http://okoconnect.com/karim/images/slider-bg-1.png',
    text:
      'No requieres equipaje,\nni correr largas distancias.',
  },
  {
    key: 'slide4',
    image: 'http://okoconnect.com/karim/images/slider-bg-1.png',
    text:
      'Todo lo que necesitas\nestá dentro de ti.',
  },
  {
    key: 'slide5',
    image: 'http://okoconnect.com/karim/images/slider-bg-1.png',
    text:
      'La felicidad que te rodea, está aquí y ahora',
  },
  {
    key: 'slide6',
    image: 'http://okoconnect.com/karim/images/slider-bg-2.png',
    text:
      'Te invito a comenzar una emocionante aventura espiritual,\n¿Me acompañas?',
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
  //itemWidth = FIXED_BAR_WIDTH / this.numItems - (this.numItems - 1) * BAR_SPACE;
  itemWidth = 5;
  animVal = new Animated.Value(0);

  static navigationOptions = {
    title: 'Comienza el viaje',
    headerStyle: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
  };

  _handleClick = () => {
      this.props.navigation.replace('PasoB');
  };
  _handleClose  = () => {
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
          style={[styles.sliderImage]}
         >
          {i === (this.numItems - 1) ? (
            <TouchableOpacity style={{flex:1}} onPress={this._handleClick}>
              <View style={styles.containerHalfBottom}>
                <Text style={styles.paragraphBottom}>{item.text}</Text>
              </View>
            </TouchableOpacity>
          ) : i === 0 ? (
            <View style={styles.containerCenter}>
              <Text style={styles.headline}>{item.text}</Text>
            </View>
          ) 
          : (
            <View style={styles.containerHalfBottom}>
              <Text style={styles.paragraphBottom}>{item.text}</Text>
            </View>
          )}
          
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
          <TouchableOpacity style={styles.close} onPress={this._handleClose}>
            <Ionicons name={'md-close'} size={30} color={Colors.gray} />
          </TouchableOpacity>
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
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    margin: 0,
  },
  sliderImage: {
    width: deviceWidth,
    height: deviceHeight,
    position: 'relative',
    //resizeMode: 'contain',
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  containerHalfBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: Dims.window.height / 2,
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 30,
    flexDirection: 'row',
    alignItems: 'center',
    left: '53%',
    transform: [{translateX: '-50%'}],
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
  paragraphBottom: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 18,
    lineHeight: 33,
    textAlign: 'center',
    color: Colors.gray,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: Dims.regularSpace,
  },
  headline: {
    fontFamily: 'MyriadPro-Bold',
    fontSize: 38,
    lineHeight: 48,
    textAlign: 'center',
    color: Colors.gray,
    letterSpacing: 2.2,
    marginTop: -40,
    paddingHorizontal: Dims.regularSpace,
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 100,
  },
});