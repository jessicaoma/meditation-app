import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  DeviceInfo,
} from 'react-native';
import Colors from '../constants/Colors';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import dimensions from '../constants/Dimensions';
import ScalableText from 'react-native-text';
import {Header} from 'react-navigation';
import {connect} from 'react-redux';

//const screenWidth = dimensions.window.width;
const screenHeight =
  dimensions.screen.height -
  Header.HEIGHT -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);
const screenHeight2 =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);

/**
 * Paso Tipo(D): Ejercicio
 * @typedef {Object} ParamsNavigation
 * @prop {number} position
 * @prop {string} titulo
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 * @prop {import('redux').Dispatch} dispatch
 * @prop {import('../utils/types').Viaje} viaje
 * @prop {import('../utils/types').Categoria} categoria
 *
 * @extends {Component<Props>}
 */
class PasoDScreen extends Component {
  /** @param {{navigation: import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>}} param*/
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.titulo,
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
              width: dimensions.screen.width,
              height:
                Header.HEIGHT +
                (Platform.OS === 'android'
                  ? dimensions.statusBarHeight
                  : DeviceInfo.isIPhoneX_deprecated
                  ? dimensions.statusBarHeight - 20
                  : 0),
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

  /** @param {Props} props */
  constructor(props) {
    super(props);
    const {viaje} = props;
    this.pasoIndex = props.navigation.state.params.position;
    this.paso = viaje.pasos[this.pasoIndex];
  }

  componentDidMount = async () => {
    // const {steps, position} = this.props.navigation.state.params;
    // const paso = steps[position];
    // API.putDiarioPaso(paso.key, enumStatus.doing, null, user);
  };

  nextStep = () => {
    const {viaje} = this.props;
    const {tipo} = viaje.pasos[this.pasoIndex + 1];
    //API.putDiarioPaso(paso.key, enumStatus.done, null, user);
    // @ts-ignore
    this.props.navigation.push(`Paso${String.fromCharCode(65 + tipo)}`, {
      position: this.pasoIndex + 1,
      titulo: viaje.pasos[this.pasoIndex + 1].titulo,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <ImageBackground
          source={{uri: this.paso.imagenFondo}}
          style={[styles.sliderImage]}>
          <View style={styles.container}>
            <ScrollView style={styles.scroll}>
              {this.paso.contenidos.map(contenido => (
                <>
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
                </>
              ))}
            </ScrollView>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={this.nextStep}>
              <View style={styles.button}>
                <ScalableText style={styles.buttonLabel}>
                  Continuar
                </ScalableText>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    viaje: state.viaje,
    categoria: state.categoria,
  };
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  sliderImage: {
    width: dimensions.window.width,
    height: '100%',
    //resizeMode: 'contain',
  },
  container: {
    height: '60%',
    paddingTop: dimensions.bigSpace
  },
  scroll: {
    //paddingHorizontal: dimensions.hugeSpace + dimensions.smallSpace,
    paddingHorizontal: dimensions.bigSpace,
  },
  container1: {
    width: '100%',
    marginTop: dimensions.smallSpace,
  },
  headline: {
    fontFamily: 'Kiona',
    fontSize: dimensions.viajeHeadlineSize,
    lineHeight: dimensions.viajeHeadlineLineHeight,
    textAlign: 'center',
    color: Colors.textoViaje,
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  container2: {
    paddingTop: screenHeight * 0.03,
    width: '100%',

  },
  text2: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: dimensions.viajeParrafoSize,
    lineHeight: dimensions.viajeParrafoLineHeight,
    textAlign: 'center',
    color: Colors.textoViaje,
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    zIndex: 100,
    marginBottom: screenHeight2 * 0.05,
  },
  button: {
    height: dimensions.window.width * 0.14,
    //marginTop: 20,
    backgroundColor: Colors.darkPurple,
    borderRadius: 40,
    paddingHorizontal: dimensions.window.width * 0.15,
    // display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    alignContent: 'center',
    // alignSelf: 'center',
  },
  buttonLabel: {
    color: 'white',
    fontFamily: 'MyriadPro-Regular',
    fontSize: 20,
  },
});

export default connect(mapStateToProps)(PasoDScreen);
