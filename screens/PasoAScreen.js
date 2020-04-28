import React, {Component} from 'react';
import {
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
import {HeaderBackButton} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);
let colorLetra = Colors.textoViaje;



/**
 * Paso Tipo(A): Highlight
 * @typedef Props
 * @prop {import('../utils/types').Categoria} categoria
 * @prop {import('../utils/types').Viaje} viaje
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'PasoA'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'PasoA'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class PasoAScreen extends Component {
  static navigationOptions = {
    header: () => null,
  };

  /** @param {Props} props */
  constructor(props) {
    super(props);
    const {viaje} = props;
    this.pasoIndex = props.route.params.position;
    this.paso = viaje.pasos[this.pasoIndex];
    this.viaje = viaje;
  }

  componentDidMount = async () => {
    // const {steps, position} = this.props.navigation.state.params;
    // const paso = steps[position];
    //API.putDiarioPaso(paso.key, enumStatus.doing, null, user);
    if (this.pasoIndex === 0) {
      API.putDiarioViaje(this.props.viaje.key, enumStatus.doing, user);
    }
  };

  _handleClose = () => {
    this.props.navigation.popToTop();
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

    var color = this.props.categoria.color;
    var c = color.substring(1);
    var rgb = parseInt(c, 16); // convertir rrggbb a decimal
    var r = (rgb >> 16) & 0xff; // extract rojo
    var g = (rgb >> 8) & 0xff; // extract verde
    var b = (rgb >> 0) & 0xff; // extract azul

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma > 170)
      colorLetra = Colors.textoViaje;
    else colorLetra = '#fff';

    console.log(luma);
    console.log(colorLetra);

    return (
      <SafeAreaView
        style={[styles.safe, {backgroundColor: this.props.categoria.color}]}>
        <ImageBackground
          source={{uri: this.paso.imagenFondo}}
          style={[styles.sliderImage]}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              this._handleClose();
            }}>
            <Ionicons name={'md-close'} size={25} color={'#fff'} />
          </TouchableOpacity>

          <View style={styles.headerBack}>
            <HeaderBackButton
              tintColor="white"
              pressColorAndroid="transparent"
              onPress={() => this.props.navigation.goBack()}
              labelVisible={false}
            />
          </View>
          {this.pasoIndex === 0 && (
            <TouchableOpacity style={{flex: 1}} onPress={this.nextStep}>
              <View style={styles.container1}>
                <ScalableText style={[styles.text2, {color: colorLetra}]}>Bienvenido al módulo</ScalableText>
                <ScalableText style={[styles.headline, {color: colorLetra}]}>{this.props.viaje.titulo}</ScalableText>
                <ScalableText style={[styles.text2, {color: colorLetra}]}>de este curso</ScalableText>

              </View>
            </TouchableOpacity>
          )}
          {this.pasoIndex === 1 && (
            <TouchableOpacity style={{flex: 1}} onPress={this.nextStep}>
              <View style={styles.container2}>
                <ScalableText style={[styles.text2, {color: colorLetra}]}>
                  {contenido.texto}
                </ScalableText>
              </View>
            </TouchableOpacity>
          )}
          {this.pasoIndex === 2 && (
            <>
              <View style={styles.container3}>
                <ScalableText style={[styles.text2, {color: colorLetra}]}>
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
    paddingTop: screenHeight * 0.35,
    paddingHorizontal: dimensions.bigSpace * 2,
  },
  container2: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: dimensions.bigSpace * 2,
  },
  headline: {
    fontFamily: 'MyriadPro-Semibold',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text2: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontWeight: 'normal',
  },
  container3: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: dimensions.bigSpace * 2,
  },
  
  containerButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: screenHeight * 0.05,
    marginRight: dimensions.bigSpace,
    zIndex: 100,
  },
  close: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default connect(mapStateToProps)(PasoAScreen);