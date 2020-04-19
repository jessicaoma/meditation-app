import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
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
import {HeaderBackButton} from 'react-navigation';
import Next from '../constants/LogoButtonNext';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

//const screenWidth = dimensions.window.width;
const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);

const proportion = dimensions.window.width / dimensions.window.height;
const marginTopImage = 
  (proportion > 0.5 ? 
    (dimensions.window.width * 0.25 * -1) : 
      (Platform.OS === 'android' ? (dimensions.window.width * 0.25 * -1)
        : DeviceInfo.isIPhoneX_deprecated ? -20
          : 0) );
const heightButtonSig = dimensions.window.width * 0.14;
//const topText = (proportion > 0.5 ? ('44%') : '60%');

/**
 * Paso Tipo(E): Cierre
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
class PasoEScreen extends Component {
  static navigationOptions = {
    header: null,
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
    //API.putDiarioPaso(paso.key, enumStatus.doing, null, user);
    if (this.pasoIndex === this.props.viaje.pasos.length - 1) {
      API.putDiarioViaje(this.props.viaje.key, enumStatus.done, user);
    }
  };

  _handleClose = () => {
    const {viaje} = this.props;
    this.props.navigation.pop(viaje.pasos.length);
  };


  nextStep = () => {
    const {viaje} = this.props;
    //API.putDiarioPaso(paso.key, enumStatus.done, null, user);
    // @ts-ignore
    if (this.pasoIndex === viaje.pasos.length - 1) {
      this.props.navigation.pop(viaje.pasos.length);
    } else {
      const {tipo} = viaje.pasos[this.pasoIndex + 1];
      this.props.navigation.push(`Paso${String.fromCharCode(65 + tipo)}`, {
        titulo: viaje.pasos[this.pasoIndex + 1].titulo,
        position: this.pasoIndex + 1,
      });
    }
  };

  render() {
    const contenido = this.paso.contenidos[0];
    return (
      <SafeAreaView
        style={[styles.safe]}>
        <Image
          source={{uri: this.paso.imagenFondo}}
          style={[styles.sliderImage]} />
          <TouchableOpacity style={styles.close} onPress={() => { this._handleClose()}}>
            <Ionicons name={'md-close'} size={25} color={'#fff'} />
          </TouchableOpacity>
          <View style={styles.headerBack}>
            <HeaderBackButton
              tintColor="white"
              pressColorAndroid="transparent"
              onPress={() => this.props.navigation.goBack()}
              backTitleVisible={false}
            />
          </View>
          <View style={styles.body}>
             <View style={styles.bodyContainer}>

              {contenido.titulo !== undefined && (
                <ScalableText style={styles.headline}>
                  {contenido.titulo || ''}
                </ScalableText>
              )}
              
              <ScalableText style={styles.paragraphBottom}>
                {contenido.texto}
              </ScalableText>
            </View>
            {this.pasoIndex === this.props.viaje.pasos.length - 1 ? (
              <View style={styles.footer}>
                <TouchableOpacity onPress={this.nextStep}>
                  <View style={styles.buttonSiguiente}>
                    <ScalableText style={styles.buttonLabel}>
                      Siguiente módulo
                    </ScalableText>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttonNext}>
                <TouchableOpacity onPress={this.nextStep}>
                  <Next />
                </TouchableOpacity>
              </View>
            )}
          </View>

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
    paddingTop: dimensions.statusBarHeight,
  },
  headerBack: {
    top: dimensions.statusBarHeight,
    zIndex: 100,
    position: 'absolute',
  },
  sliderImage: {
    width: dimensions.screen.width,
    height: dimensions.screen.width,
    resizeMode: 'contain',
    zIndex: 2,
    marginTop: marginTopImage,
  },
  body: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight + heightButtonSig,
    marginTop: dimensions.window.width * 0.25 * -1,
  },
  bodyContainer: {

  },
  headline: {
    fontFamily: 'Kiona',
    fontSize: dimensions.viajeHeadlineSize,
    lineHeight: dimensions.viajeHeadlineLineHeight,
    textAlign: 'left',
    color: Colors.textoViaje,
    letterSpacing: 1.2,
    marginBottom: dimensions.regularSpace,
    paddingHorizontal: dimensions.bigSpace,
  },
  paragraphBottom: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: dimensions.viajeParrafoSize,
    lineHeight: dimensions.viajeParrafoLineHeight,
    textAlign: 'left',
    color: Colors.textoViaje,
    paddingHorizontal: dimensions.bigSpace,
  },
  buttonNext: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: screenHeight * 0.04,
    marginRight: dimensions.bigSpace,
  },
  footer: { //Ultima pantalla 
    marginBottom: screenHeight * 0.04,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonSiguiente: {
    backgroundColor: Colors.darkPurple,
    borderRadius: 40,
    paddingHorizontal: dimensions.window.width * 0.15,
    height: heightButtonSig,
    justifyContent: 'center',
    alignContent: 'center',
    
  },
  buttonLabel: {
    color: 'white',
    fontFamily: 'MyriadPro-Regular',
    fontSize: 20,
  },
  close: {
    position: 'absolute',
    right: 0,
    top: dimensions.statusBarHeight,
    zIndex: 100,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
});

export default connect(mapStateToProps)(PasoEScreen);
