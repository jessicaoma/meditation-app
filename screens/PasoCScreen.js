import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
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
import Next from '../constants/LogoButtonNext';
import {Header} from 'react-navigation';
import {connect} from 'react-redux';

const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);

/**
 * Paso Tipo(C): Recomendaciones
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
class PasoCScreen extends Component {
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
      header: (props) => {
        return (
          <ImageBackground
            source={{
              uri:
                'http://okoconnect.com/karim/assets/categorias/categoria-1/header.png',
            }}
            style={{
              zIndex: 99,
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
      <SafeAreaView style={[styles.safe, {backgroundColor: 'white'}]}>
        <View style={styles.container1}>
          <ScrollView style={styles.scroll}>
            <View style={{paddingBottom: dimensions.window.width * 0.562}}>
              {this.paso.contenidos.map(contenido => (
                <View>
                  <ScalableText style={styles.headline}>
                    {contenido?.titulo ?? ''}
                  </ScalableText>
                  <ScalableText style={styles.text2}>
                    {contenido.texto}
                  </ScalableText>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <Image
          source={{uri: this.paso.imagenFondo}}
          style={styles.imagefooter}
          width={dimensions.window.width}
          height={dimensions.window.width * 0.562}
        />
        <View style={styles.footer} />
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={this.nextStep}>
            <Next />
          </TouchableOpacity>
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
  },
  imagefooter: {
    width: dimensions.window.width,
    height: dimensions.window.width * 0.562,
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  container1: {
    height: '100%',
  },
  //Jess, no le pongas padding o margin vertical al scroll
  scroll: {
    //paddingHorizontal: dimensions.hugeSpace + dimensions.smallSpace,
    paddingHorizontal: dimensions.bigSpace,
  },
  headline: {
    fontFamily: 'Kiona',
    fontSize: dimensions.viajeHeadlineSize,
    lineHeight: dimensions.viajeHeadlineLineHeight,
    textAlign: 'left',
    color: Colors.textoViaje,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 25,
    letterSpacing: -0.5,
  },
  text2: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: dimensions.viajeParrafoSize,
    lineHeight: dimensions.viajeParrafoLineHeight,
    textAlign: 'left',
    color: Colors.textoViaje,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: '30%',
    //display: 'flex',
    flex: 1,
    width: '100%',
    zIndex: 3,
  },
  containerButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: screenHeight * 0.05,
    marginRight: dimensions.bigSpace,
    zIndex: 100,
  },
});

export default connect(mapStateToProps)(PasoCScreen);
