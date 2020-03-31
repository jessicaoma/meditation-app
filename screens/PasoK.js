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
import {HeaderBackButton} from 'react-navigation';
import {connect} from 'react-redux';

const screenWidth = dimensions.window.width;
const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);

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
    //API.putDiarioViaje(paso.viajeId, enumStatus.doing, user);
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
      <SafeAreaView style={styles.safe}>
        <ImageBackground
          source={{uri: this.paso.imagenFondo}}
          style={[styles.sliderImage]}>
          <View style={styles.headerBack}>
            <HeaderBackButton
              tintColor="white"
              pressColorAndroid="transparent"
              onPress={() => this.props.navigation.goBack()}
              backTitleVisible={false}
            />
          </View>
          <View style={styles.container3}>
            <ScrollView>
              <ScalableText style={styles.headline}>
                {contenido.titulo}
              </ScalableText>
              <ScalableText style={styles.paragraphBottom}>
                {contenido.texto}
              </ScalableText>
            </ScrollView>
            <View style={styles.boton}>
              <TouchableOpacity onPress={this.nextStep}>
                <ScalableText>Botton</ScalableText>
              </TouchableOpacity>
            </View>
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
    paddingTop: dimensions.statusBarHeight,
  },
  headerBack: {
    position: 'absolute',
    top: 0,
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
    color: Colors.textoViaje,
    letterSpacing: 2.2,
    marginBottom: dimensions.regularSpace,
  },
  paragraphBottom: {
    fontFamily: 'MyriadPro-Semibold',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'left',
    color: Colors.textoViaje,
    paddingHorizontal: dimensions.bigSpace * 2,
  },
  container3: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    height: screenHeight * 0.5,
    borderColor: 'red',
    borderWidth: 1,
  },
  boton: {
    borderWidth: 1,
    borderColor: '#00f',
  },
});

export default connect(mapStateToProps)(PasoEScreen);
