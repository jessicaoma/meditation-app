import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Platform,
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
                (Platform.OS === 'android' ? dimensions.statusBarHeight : (DeviceInfo.isIPhoneX_deprecated ? dimensions.statusBarHeight - 20 :  0 )),
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
    const contenido = this.paso.contenidos[0];
    return (
      <SafeAreaView style={styles.safe}>
        <ImageBackground
          source={{uri: this.paso.imagenFondo}}
          style={[styles.sliderImage]}>
          <View style={styles.container}>
            <ScrollView style={styles.scroll}>
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
  },
  scroll: {
    //paddingHorizontal: dimensions.hugeSpace + dimensions.smallSpace,
    paddingHorizontal: dimensions.bigSpace,
  },
  container1: {
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //alignContent: 'center',
    width: '100%',
    marginTop: screenHeight * 0.1,
  },
  headline: {
    fontFamily: 'Kiona',
    fontSize: 32,
    lineHeight: 48,
    textAlign: 'center',
    color: Colors.textoViaje,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  container2: {
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //alignContent: 'center',
    paddingTop: screenHeight * 0.05,
    //paddingHorizontal: dimensions.hugeSpace * 2,
    width: '100%',
  },
  text2: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 19,
    lineHeight: 26,
    textAlign: 'left',
    color: Colors.textoViaje,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    //height: '17%',
    //marginBottom: '10%',
    // display: 'flex',
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    alignSelf: 'center',
    zIndex: 100,
    marginBottom: screenHeight2 * 0.1,
  },
  button: {
    height: dimensions.window.width * 0.14,
    //marginTop: 20,
    backgroundColor: Colors.darkPurple,
    borderRadius: 40,
    paddingHorizontal: dimensions.window.width * 0.15,
    //paddingBottom: dimensions.window.width * 0.035,
    //paddingTop: dimensions.window.width * 0.045,
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
