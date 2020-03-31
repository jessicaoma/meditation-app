import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import ScalableText from 'react-native-text';
import {connect} from 'react-redux';
import {HeaderBackButton} from 'react-navigation';

const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);

/**
 * Paso Tipo(B): Teoría
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
class PasoBScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  /** @param {Props} props */
  constructor(props) {
    super(props);
    const {viaje} = props;
    this.pasoIndex = props.navigation.state.params.position;
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

  otro = () => {
    this.player._startPlayer();
  };

  render() {
    return (
      <SafeAreaView style={[styles.safe, {backgroundColor: 'white'}]}>
        <ScreenBg
          source={{uri: this.paso.imagenFondo}}
          color="white"
          styleImage={{resizeMode: 'cover'}}>
          <View style={styles.container1}>
            <ScalableText style={styles.headline}>
              {this.paso.titulo}
            </ScalableText>
          </View>
          <View style={this.state.show ? styles.container2 : styles.hidden}>
            <TouchableOpacity onPress={this.otro} style={styles.buttonContainer}>

              <View style={styles.button}>
                <ScalableText style={styles.buttonLabel}>Escuchar el audio</ScalableText>
              </View>

            </TouchableOpacity>
          </View>
          <Player
            ref={this.refPlayer}
            source={{
              uri: this.paso.media,
            }}
            showControls
            onEnd={this.nextStep}
            onPlayPause={() => {
              this.setState({show: false});
            }}
          />
          <View style={styles.headerBack}>
            <HeaderBackButton
              tintColor="#000"
              pressColorAndroid="transparent"
              onPress={() => this.props.navigation.goBack()}
              backTitleVisible={false}
            />
          </View>
        </ScreenBg>
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
  container1: {
    width: dimensions.screen.width,
    height: screenHeight,
    top: 0,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  container2: {
    bottom: 0,
    marginBottom: 128,
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    zIndex: 50,
  },
  headline: {
    fontFamily: 'Kiona',
    fontSize: 26,
    lineHeight: 32,
    textAlign: 'center',
    color: Colors.textoViaje,
    letterSpacing: 1.2,
    marginBottom: 30,
    paddingHorizontal: dimensions.regularSpace,
  },
  hidden: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: Colors.darkPurple,
    borderRadius: 40,
    paddingHorizontal: dimensions.window.width * 0.15,
    paddingBottom: dimensions.window.width * 0.035,
    paddingTop: dimensions.window.width * 0.045,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  buttonLabel: {
    color: 'white',
    fontFamily: 'MyriadPro-Regular',
    fontSize: 20,
  }
});

export default connect(mapStateToProps)(PasoBScreen);
