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
      title: steps[position].titulo,
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
    const paso = steps[position];
    //API.putDiarioPaso(paso.key, enumStatus.done, null, user);
    // @ts-ignore
    if (position === steps.length - 1) {
      this.props.navigation.goBack();
    } else {
      const {tipo} = steps[position + 1];
      this.props.navigation.replace(`Paso${String.fromCharCode(65 + tipo)}`, {
        steps,
        position: position + 1,
      });
    }
  };

  render() {
    const {steps, position} = this.props.navigation.state.params;
    const paso = steps[position];
    const contenido = steps[position].contenidos[0];
    return (
      <SafeAreaView
        style={[styles.safe]}>
        <ImageBackground
          source={{uri: paso.imagenFondo}}
          style={[styles.sliderImage]}>
          <TouchableOpacity style={{flex: 1}} onPress={this.nextStep}>
            <View style={styles.container3}>
              <ScalableText style={styles.headline}>
                {contenido.titulo}
              </ScalableText>
              <ScalableText style={styles.paragraphBottom}>
                {contenido.texto}
              </ScalableText>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
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

  headline: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: dimensions.h1,
    lineHeight: 48,
    textAlign: 'center',
    color: '#85787b', //Colors.primaryDark,
    letterSpacing: 2.2,
    marginBottom: dimensions.regularSpace,
  },
  paragraphBottom: {
    fontFamily: 'MyriadPro-Semibold',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'left',
    color: '#85787b', //Colors.primaryDark,
    //justifyContent: 'flex-end',
    //alignItems: 'center',
    paddingHorizontal: dimensions.bigSpace * 2,
  },

  container3: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //alignContent: 'center',
    position: 'absolute',
    bottom: 0,
    paddingBottom: screenHeight * 0.22,
  },
});
