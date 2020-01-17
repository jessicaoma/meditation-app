import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import LogoCompartir from '../constants/LogoCompartir';
import LogoDescargar from '../constants/LogoDescargar';
import Dims from '../constants/Dimensions';
import ScreenBg from '../components/screenBg';
import ScalableText from 'react-native-text';

//TODO consultar la emocion para obtener la oracion
const deviceWidth = Dims.window.width;
const deviceHeight = '100%';
const BAR_SPACE = 9;
/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class Emocion extends Component {
  animVal = new Animated.Value(0);

  render() {
    /** @type {import('../utils/types').Emoción} */
    const emocion = this.props.navigation.getParam('emocion', {});
    const info = [
      {
        key: 'slide1',
        title: emocion.titulo,
        text: emocion.descripcion,
      },
      {
        key: 'slide2',
        title: 'Oración',
        text: emocion.oracion,
      },
    ];

    let imageArray = [];
    let barArray = [];
    const itemWidth = 5;
    info.forEach((item, i) => {
      const thisImage = (
        <ScrollView
          key={`image${i}`}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {i === 0 ? (
            <Image
              style={{
                width: deviceWidth,
                height: Dims.window.height * emocion.headerH,
              }}
              source={{uri: emocion.header}}
            />
          ) : (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{height: 50}} />
          )}
          <View style={styles.container}>
            <ScalableText style={styles.bigTitle}>{item.title}</ScalableText>
            <ScalableText style={styles.paragraph}>{item.text}</ScalableText>
          </View>
          {i === 0 ? (
            <Image
              style={{
                width: deviceWidth,
                height: Dims.window.height * emocion.footerH,
                minHeight: Dims.window.height * emocion.footerH,
              }}
              source={{uri: emocion.footer}}
            />
          ) : (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingHorizontal: 50,
              }}>
              <TouchableOpacity
                // eslint-disable-next-line react-native/no-inline-styles
                style={{marginRight: 20}}>
                <LogoCompartir />
              </TouchableOpacity>
              <TouchableOpacity>
                <LogoDescargar />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      );
      imageArray.push(thisImage);

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-itemWidth, itemWidth],
        extrapolate: 'clamp',
      });

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              width: itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
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
      barArray.push(thisBar);
    });
    return (
      <SafeAreaView>
        <ScreenBg
          source={{uri: emocion.imagenFondo}}
          // eslint-disable-next-line react-native/no-inline-styles
          styleImage={{resizeMode: 'cover', height: Dims.window.height}}>
          <View style={styles.barContainer}>{barArray}</View>
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
        </ScreenBg>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: deviceWidth,
    padding: 30,
  },
  scrollView: {
    width: deviceWidth,
    minHeight: deviceHeight,
  },
  slider: {
    margin: 0,
    position: 'relative',
  },
  bigTitle: {
    fontSize: 40,
    letterSpacing: 1.11,
    lineHeight: 40,
    marginTop: Dims.regularSpace,
    marginRight: 0,
    marginBottom: 10,
    marginLeft: 0,
    color: 'white',
    fontFamily: 'MyriadPro-Regular',
  },
  paragraph: {
    fontSize: 15.5,
    lineHeight: 15.5,
    marginBottom: 50,
    letterSpacing: 0,
    color: 'white',
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'justify',
    paddingHorizontal: Dims.smallSpace,
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
    backgroundColor: '#fff',
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
});
