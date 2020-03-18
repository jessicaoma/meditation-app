import React, {Component} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
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
const deviceWidth = Dims.window.width - Dims.bigSpace * 4;
const deviceHeight = '100%';
const BAR_SPACE = 8;

/**
 * Paso Tipo(C): Reflexiones
 * @typedef {Object} ParamsNavigation
 * @prop {import('../utils/types').Paso[]} steps
 * @prop {number} position
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 *
 * @extends {Component<Props>}
 */
export default class PasoCScreen extends Component {
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
    let imageArray = [];
    let barArray = [];
    const {steps, position} = this.props.navigation.state.params;

    const numItems = steps[position].contenidos.length;
    const itemWidth = 5;
    steps[position].contenidos.forEach((item, i) => {
      const thisImage = (
        <View key={`image${i}`} style={[styles.sliderImage]}>
          {i === numItems - 1 ? (
            <TouchableOpacity style={{flex: 1}} onPress={this.nextStep}>
              <View style={styles.containerCard}>
                <Image style={styles.image} source={{uri: item.imagen}} />
                <Text style={styles.title}>{item.titulo}</Text>
                <Text style={styles.paragraph}>{item.texto}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.containerCard}>
              <Image style={styles.image} source={{uri: item.imagen}} />
              <Text style={styles.title}>{item.titulo}</Text>
              <Text style={styles.paragraph}>{item.texto}</Text>
            </View>
          )}
        </View>
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
        <ImageBackground
          style={[styles.container, {backgroundColor: steps[position].color}]}
          source={{
            uri: steps[position].imagenFondo,
          }}>
          <TouchableOpacity style={styles.close} onPress={this.nextStep}>
            <Ionicons name={'md-close'} size={30} color={Colors.gray} />
          </TouchableOpacity>
          <View style={styles.container}>
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
          </View>
          <View style={styles.barContainer}>{barArray}</View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: Dims.bigSpace,
    paddingBottom: Dims.bigSpace * 2,
  },
  slider: {
    margin: 0,
  },
  sliderImage: {
    width: deviceWidth,
    height: deviceHeight,
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
  },
  image: {
    height: 80,
    width: 80,
  },
  containerCard: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
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
    fontSize: 20,
    lineHeight: 29,
    textAlign: 'center',
    color: Colors.gray,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: Dims.regularSpace,
  },
  title: {
    fontFamily: 'MyriadPro-Bold',
    fontSize: 23,
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
