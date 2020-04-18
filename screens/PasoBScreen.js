import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import Player from '../player/Player';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import ScalableText from 'react-native-text';
import {connect} from 'react-redux';
import {HeaderBackButton} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';

const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);

/**
 * Paso Tipo(B): Teoría
 * @typedef Props
 * @prop {import('../utils/types').Categoria} categoria
 * @prop {import('../utils/types').Viaje} viaje
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'PasoB'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'PasoB'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class PasoBScreen extends Component {
  static navigationOptions = {
    header: () => null,
  };

  /** @param {Props} props */
  constructor(props) {
    super(props);
    const {viaje} = props;
    this.pasoIndex = props.route.params.position;
    this.paso = viaje.pasos[this.pasoIndex];
    this.state = {
      show: true,
    };
  }

  componentDidMount = async () => {
    // const {steps, position} = this.props.navigation.state.params;
    // const paso = steps[position];
    // API.putDiarioPaso(paso.key, enumStatus.doing, null, user);
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

  /** @param {Player} ref*/
  refPlayer = ref => {
    this.player = ref;
  };

  mostrarControles = () => {
    //TODO hacer que al pulsar se muestren los controles
    this.player._startPlayer();
    //this.nextStep();
  };

  render() {
    const contenido = this.paso.contenidos[0];
    return (
      <SafeAreaView style={[styles.safe, {backgroundColor: 'white'}]}>
        <ImageBackground
          source={{uri: this.paso.imagenFondo}}
          style={styles.sliderImage}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              this._handleClose();
            }}>
            <Ionicons name={'md-close'} size={25} color={'#bdc4e1'} />
          </TouchableOpacity>
          <View style={styles.container1}>
            <ScalableText style={styles.headline}>
              {this.paso.titulo}
            </ScalableText>
          </View>
          <View style={this.state.show ? styles.container2 : styles.hidden}>
            <TouchableOpacity onPress={this.mostrarControles}>
              <View style={styles.button}>
                <ScalableText style={styles.buttonLabel}>
                  Escuchar el audio
                </ScalableText>
              </View>
            </TouchableOpacity>
          </View>
          <Player
            ref={this.refPlayer}
            source={{
              uri: contenido.media,
            }}
            showControls
            onEnd={this.nextStep}
            onPlayPause={() => {
              this.setState({show: false});
            }}
          />
          <View style={styles.headerBack}>
            <HeaderBackButton
              tintColor="#bdc4e1"
              pressColorAndroid="transparent"
              onPress={() => this.props.navigation.goBack()}
              labelVisible={false}
            />
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
    paddingTop: dimensions.statusBarHeight,
  },
  sliderImage: {
    width: dimensions.screen.width,
    height: '100%',
  },
  headerBack: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  container1: {
    width: dimensions.screen.width,
    height: '100%',
    top: 0,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  headline: {
    fontFamily: 'Kiona',
    fontSize: dimensions.viajeHeadlineSize,
    lineHeight: dimensions.viajeHeadlineLineHeight,
    textAlign: 'center',
    color: Colors.textoViaje,
    marginTop: 20,
    paddingHorizontal: dimensions.regularSpace,
    textTransform: 'uppercase',
  },
  container2: {
    position: 'absolute',
    bottom: 30,
    marginBottom: screenHeight * 0.1,
    alignSelf: 'center',
    zIndex: 100,
  },
  hidden: {
    display: 'none',
  },
  button: {
    backgroundColor: Colors.darkPurple,
    borderRadius: 40,
    paddingHorizontal: dimensions.window.width * 0.15,
    height: dimensions.window.width * 0.14,
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
    right: 20,
    top: 10,
    zIndex: 100,
  },
});

export default connect(mapStateToProps)(PasoBScreen);
