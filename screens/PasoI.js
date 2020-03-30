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
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import dimensions from '../constants/Dimensions';
import ScalableText from 'react-native-text';
import {Header} from 'react-navigation';
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
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: 'white',
      },
      headerStyle: {
        backgroundColor: 'transparent',
      },
      header: props => {
        return (
          <ImageBackground
            source={{
              uri:
                'http://okoconnect.com/karim/assets/categorias/categoria-1/header.png',
            }}
            style={{
              width: screenWidth,
              height:
                Header.HEIGHT +
                (Platform.OS === 'android' ? dimensions.statusBarHeight : 0),
            }}
            imageStyle={{
              resizeMode: 'stretch',
            }}>
            <Header {...props} />
          </ImageBackground>
        );
      },
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
    const paso = steps[position];
    const contenido = steps[position].contenidos[0];
    return (
      <SafeAreaView style={[styles.safe, {backgroundColor: 'white'}]}>
        <ImageBackground
          source={{uri: paso.imagenFondo}}
          style={[styles.sliderImage]}>
          <TouchableOpacity style={{flex: 1}} onPress={this.nextStep}>
            <View style={styles.container1}>
              <ScalableText style={styles.headline}>
                {contenido.titulo}
              </ScalableText>
            </View>
            <View style={styles.container2}>
              <ScalableText style={styles.text2}>
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
  },
  border: {
    borderColor: 'red',
    borderWidth: 1,
  },
  sliderImage: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: 'contain',
  },
  container1: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: screenHeight * 0.1,
  },
  headline: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: dimensions.h1,
    lineHeight: 48,
    textAlign: 'center',
    color: '#85787b', //Colors.primaryDark,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
  },

  container2: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: screenHeight * 0.1,
    paddingHorizontal: dimensions.hugeSpace * 2,
  },
  text2: {
    fontFamily: 'MyriadPro-Semibold',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    color: '#85787b', //Colors.primaryDark,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  containerHalfBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: dimensions.window.height / 2,
  },
});
