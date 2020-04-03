import React, {Component} from 'react';
import {
  //Animated,
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import dimensions from '../constants/Dimensions';
import Next from '../constants/LogoButtonNext';
import ScalableText from 'react-native-text';
import {HeaderBackButton} from 'react-navigation';
import {connect} from 'react-redux';

const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);

/**
 * Paso Tipo(A): Highlight
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
class PasoAScreen extends Component {
  //animVal = new Animated.Value(0);

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
    if (this.pasoIndex === 0) {
      API.putDiarioViaje(this.props.viaje.key, enumStatus.doing, user);
    }
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
      <SafeAreaView
        style={[styles.safe, {backgroundColor: this.props.categoria.color}]}>
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
          {this.pasoIndex === 0 && (
            <TouchableOpacity style={{flex: 1}} onPress={this.nextStep}>
              <View style={styles.container1}>
                <ScalableText style={styles.headline}>
                  {contenido.titulo}
                </ScalableText>
                <ScalableText style={styles.paragraphBottom}>
                  {contenido.texto}
                </ScalableText>
              </View>
            </TouchableOpacity>
          )}
          {this.pasoIndex === 1 && (
            <TouchableOpacity style={{flex: 1}} onPress={this.nextStep}>
              <View style={styles.container2}>
                <ScalableText style={styles.text2}>
                  {contenido.texto}
                </ScalableText>
              </View>
            </TouchableOpacity>
          )}
          {this.pasoIndex === 2 && (
            <>
              <View style={styles.container3}>
                <ScalableText style={styles.text3}>
                  {contenido.texto}
                </ScalableText>
              </View>
              <View style={styles.containerButton}>
                <TouchableOpacity onPress={this.nextStep}>
                  <Next />
                </TouchableOpacity>
              </View>
            </>
          )}
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
    paddingTop: dimensions.statusBarHeight,
  },
  headerBack: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  sliderImage: {
    width: dimensions.screen.width,
    height: '100%',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  headline: {
    fontFamily: 'Kiona',
    fontSize: dimensions.h1,
    lineHeight: 48,
    textAlign: 'center',
    color: Colors.textoViaje,
    letterSpacing: 2.2,
    marginTop: -40,
    paddingHorizontal: dimensions.regularSpace,
    textTransform: 'uppercase',
  },
  paragraphBottom: {
    fontFamily: 'MyriadPro-Semibold',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    color: Colors.textoViaje,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: dimensions.regularSpace,
  },
  container2: {
    flex: 1,
    paddingTop: screenHeight * 0.33,
  },
  text2: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.textoViaje,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: dimensions.hugeSpace * 2,
  },
  container3: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    height: '50%',
    justifyContent: 'center',
  },
  text3: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'right',
    color: Colors.textoViaje,
    paddingRight: dimensions.bigSpace,
    paddingLeft: dimensions.hugeSpace * 3,
  },
  containerButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: screenHeight * 0.1,
    marginRight: dimensions.bigSpace,
    zIndex: 100,
  },
});

export default connect(mapStateToProps)(PasoAScreen);
