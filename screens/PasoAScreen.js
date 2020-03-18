import React, {Component} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Dims from '../constants/Dimensions';
import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
//TODO registrar avance
const deviceWidth = Dims.window.width;
const deviceHeight = '100%';
const BAR_SPACE = 9;

/**
 * Paso Tipo(A): Highlight
 * @typedef {Object} ParamsNavigation
 * @prop {import('../utils/types').Paso[]} steps
 * @prop {number} position
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 *
 * @extends {Component<Props>}
 */
export default class PasoAScreen extends Component {
  animVal = new Animated.Value(0);

  static navigationOptions = ({navigation}) => {
    /** @type {ParamsNavigation} */
    const {steps, position} = navigation.state.params;
    return {
      title: steps[position].titulo,
    };
  };

  componentDidMount = async () => {
    const {steps, position} = this.props.navigation.state.params;
    const paso = steps[position];
    API.putDiarioPaso(paso.key, enumStatus.doing, null, user);
    API.putDiarioViaje(paso.viajeId, enumStatus.doing, user);
  };

  nextStep = () => {
    const {steps, position} = this.props.navigation.state.params;
    const {tipo} = steps[position + 1];
    const paso = steps[position];
    API.putDiarioPaso(paso.key, enumStatus.done, null, user);
    // @ts-ignore
    this.props.navigation.replace(`Paso${String.fromCharCode(65 + tipo)}`, {
      steps,
      position: position + 1,
    });
  };

  render() {
    const {steps, position} = this.props.navigation.state.params;
    let imageArray = [];
    let barArray = [];
    const numItems = steps[position].contenidos.length;
    const itemWidth = 5;
    steps[position].contenidos.forEach((item, i) => {
      const thisImage = (
        <ImageBackground
          key={`image${i}`}
          source={{uri: item.imagen}}
          style={[styles.sliderImage]}>
          {i === numItems - 1 ? (
            <TouchableOpacity style={{flex: 1}} onPress={this.nextStep}>
              <View style={styles.containerHalfBottom}>
                <Text style={styles.paragraphBottom}>{item.texto}</Text>
              </View>
            </TouchableOpacity>
          ) : i === 0 ? (
            <View style={styles.containerCenter}>
              <Text style={styles.headline}>{item.texto}</Text>
            </View>
          ) : (
            <View style={styles.containerHalfBottom}>
              <Text style={styles.paragraphBottom}>{item.texto}</Text>
            </View>
          )}
        </ImageBackground>
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
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity style={styles.close} onPress={this.nextStep}>
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
          style={[styles.slider, {backgroundColor: steps[position].color}]}>
          {imageArray}
        </ScrollView>
        <View style={styles.barContainer}>{barArray}</View>
      </SafeAreaView>
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
    fontSize: Dims.h1,
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
