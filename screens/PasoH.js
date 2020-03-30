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
import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import dimensions from '../constants/Dimensions';
import ScalableText from 'react-native-text';
//TODO registrar avance
const screenWidth = dimensions.window.width;
const screenHeight = dimensions.window.height - dimensions.statusBarHeight;

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
      //title: steps[position].titulo,
      header: null,
    };
  };

  componentDidMount = async () => {
    const {steps, position} = this.props.navigation.state.params;
    const paso = steps[position];
    //API.putDiarioPaso(paso.key, enumStatus.doing, null, user);
    //API.putDiarioViaje(paso.viajeId, enumStatus.doing, user);
  };

  nextStep = () => {
    const {steps, position} = this.props.navigation.state.params;
    const {tipo} = steps[position + 1];
    const paso = steps[position];
    //API.putDiarioPaso(paso.key, enumStatus.done, null, user);
    // @ts-ignore
    this.props.navigation.replace(`Paso${String.fromCharCode(65 + tipo)}`, {
      steps,
      position: position + 1,
    });
  };

  render() {
    const {steps, position} = this.props.navigation.state.params;
    const contenido = steps[position].contenidos[0];
    return (
      <SafeAreaView
        style={[styles.safe, {backgroundColor: steps[position].color}]}>
        <ImageBackground
          source={{uri: contenido.imagen}}
          style={[styles.sliderImage]}>
          
          <TouchableOpacity style={{flex: 1}} onPress={this.nextStep}>
            {position === 0 && (
              <View style={styles.container1}>
                <ScalableText style={styles.headline}>{contenido.titulo}</ScalableText>
                <ScalableText style={styles.paragraphBottom}>{contenido.texto}</ScalableText>
              </View>
            )}
            {position === 1 && (
              <View style={styles.container2}>
                <ScalableText style={styles.text2}>{contenido.texto}</ScalableText>
              </View>
            )}
            {position === 2 && (
              <View style={styles.container3}>
                <ScalableText style={styles.text3}>{contenido.texto}</ScalableText>
              </View>
            )}
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingTop: dimensions.statusBarHeight,
  },
  border: {
    borderColor: 'red',
    borderWidth: 1,
  },
  close: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 100,
  },
  sliderImage: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: 'contain',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  headline: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: dimensions.h1,
    lineHeight: 48,
    textAlign: 'center',
    color: '#85787b', //Colors.primaryDark,
    letterSpacing: 2.2,
    marginTop: -40,
    paddingHorizontal: dimensions.regularSpace,
  },
  paragraphBottom: {
    fontFamily: 'MyriadPro-Semibold',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    color: '#85787b', //Colors.primaryDark,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: dimensions.regularSpace,
  },
  container2: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //alignContent: 'center',
    paddingTop: screenHeight * 0.33,
  },
  text2: {
    fontFamily: 'MyriadPro-Semibold',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    color: '#85787b', //Colors.primaryDark,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: dimensions.hugeSpace * 2,
  },
  container3: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //alignContent: 'center',
    position: 'absolute',
    bottom: 0,
    paddingBottom: screenHeight * 0.20,
  },
  text3: {
    fontFamily: 'MyriadPro-Semibold',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'right',
    color: '#85787b', //Colors.primaryDark,
    justifyContent: 'flex-end',
    //alignItems: 'center',
    marginRight: dimensions.bigSpace,
    paddingLeft: dimensions.hugeSpace * 5,
  },

  containerHalfBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: dimensions.window.height / 2,
  },
});
