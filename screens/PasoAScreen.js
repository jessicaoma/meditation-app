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
    //API.putDiarioViaje(paso.viajeId, enumStatus.doing, user);
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
      <SafeAreaView style={[styles.safe, {backgroundColor: this.paso.color}]}>
        <ImageBackground
          source={{uri: contenido.imagen}}
          style={[styles.sliderImage]}>
          <View style={styles.headerBack}>
            <HeaderBackButton
              tintColor="white"
              pressColorAndroid="transparent"
              onPress={() => this.props.navigation.goBack()}
              backTitleVisible={false}
            />
          </View>
          <TouchableOpacity style={{flex: 1}} onPress={this.nextStep}>
            {this.pasoIndex === 0 && (
              <View style={styles.container1}>
                <ScalableText style={styles.headline}>
                  {contenido.titulo}
                </ScalableText>
                <ScalableText style={styles.paragraphBottom}>
                  {contenido.texto}
                </ScalableText>
              </View>
            )}
            {this.pasoIndex === 1 && (
              <View style={styles.container2}>
                <ScalableText style={styles.text2}>
                  {contenido.texto}
                </ScalableText>
              </View>
            )}
            {this.pasoIndex === 2 && (
              <View style={styles.container3}>
                <ScalableText style={styles.text3}>
                  {contenido.texto}
                </ScalableText>
                <View>
                  <ScalableText>Botton</ScalableText>
                </View>
              </View>
            )}
          </TouchableOpacity>
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
    paddingTop: dimensions.statusBarHeight,
  },
  headerBack: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  sliderImage: {
    width: dimensions.screen.width,
    height: screenHeight,
    //resizeMode: 'contain',
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
    color: Colors.textoViaje,
    letterSpacing: 2.2,
    marginTop: -40,
    paddingHorizontal: dimensions.regularSpace,
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
    fontFamily: 'MyriadPro-Semibold',
    fontSize: 18,
    lineHeight: 26,
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
    paddingBottom: screenHeight * 0.2,
  },
  text3: {
    fontFamily: 'MyriadPro-Semibold',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'right',
    color: Colors.textoViaje,
    justifyContent: 'flex-end',
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

export default connect(mapStateToProps)(PasoAScreen);
