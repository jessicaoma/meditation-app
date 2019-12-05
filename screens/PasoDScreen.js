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
const BAR_SPACE = 8;


const info = [
  {
    key: 'slide1',
    image: 'http://okoconnect.com/karim/images/slider-bg-1.png',
    title: '¡Bienvenid@ de nuevo!',
    text: 'Toma unos minutos para realizar este ejercicio. Es muy fácil, sólo necesitas papel, lapiz y ¡ganas de conectarte contigo misma!',
  },
  {
    key: 'slide2',
    image: 'http://okoconnect.com/karim/images/slider-bg-1.png',
    title: 'Lista de Creencias',
    text:
      'Haz una lista de tus creencias siguiendo los cinco puntos de los que hablamos cualidades, capacidades, puntos débiles, como hablas de tu pasado, como crees que funciona el mundo.​',
  },
  {
    key: 'slide3',
    image: 'http://okoconnect.com/karim/images/slider-bg-1.png',
    title: 'Analisa tu lista',
    text:
      '¿Cuáles te ayudan a disfrutar de la vida?\n¿Cuáles te gustaría cambiar?​​',
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
export default class PasoDScreen extends Component {
  numItems = info.length;
  //itemWidth = FIXED_BAR_WIDTH / this.numItems - (this.numItems - 1) * BAR_SPACE;
  itemWidth = 5;
  animVal = new Animated.Value(0);

  static navigationOptions = {
    title: 'Ejercicio',
    headerStyle: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
  };

  _handleClick = () => {
      this.props.navigation.replace('PasoE');
  };
  _handleClose  = () => {
    //alert('This is a button!');
    this.props.navigation.replace('PasoE');
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
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.paragraph}>{item.text}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.containerHalfBottom}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.paragraph}>{item.text}</Text>
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
  containerHalfBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: Dims.window.height / 2,
  },
  barContainer: {
    position: 'absolute',
    zIndex: 20,
    top: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
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
   paragraph: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 18,
    lineHeight: 25,
    textAlign: 'center',
    color: Colors.gray,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: Dims.regularSpace,
  },
  title: {
    fontFamily: 'MyriadPro-Bold',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
    color: Colors.gray,
    letterSpacing: 2.2,
    paddingHorizontal: Dims.regularSpace,
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 100,
  },
});