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
      header: props => {
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
        <ImageBackground
          source={{uri: this.paso.imagenFondo}}
          style={[styles.sliderImage]}>
          <View style={styles.container1}>
            <ScrollView style={styles.scroll}>
              {this.paso.contenidos.map(contenido => (
                <View>
                  <ScalableText style={styles.headline}>
                    {contenido.titulo}
                  </ScalableText>
                  <ScalableText style={styles.text2}>
                    {contenido.texto}
                  </ScalableText>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.footer} />
          <View style={styles.containerButton}>
            <TouchableOpacity onPress={this.nextStep}>
              <Next />
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
    paddingTop: dimensions.statusBarHeight,
  },
  sliderImage: {
    width: dimensions.window.width,
    height: '100%',
    //resizeMode: 'contain',
  },
  container1: {
    height: '70%',
  },
  //Jess, no le pongas padding o margin vertical al scroll
  scroll: {
    //paddingHorizontal: dimensions.hugeSpace + dimensions.smallSpace,
    paddingHorizontal: dimensions.bigSpace,
  },
  headline: {
    fontFamily: 'Kiona',
    fontSize: 28,
    lineHeight: 30,
    textAlign: 'left',
    color: Colors.textoViaje,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    marginBottom: 20,
    marginTop: 15,
  },
  text2: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 18,
    lineHeight: 24,
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
    //flexDirection: 'row',
    //justifyContent: 'flex-end',
    //alignItems: 'center',
    //paddingHorizontal: dimensions.regularSpace,
  },
  containerButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: screenHeight * 0.1,
    //display: 'flex',
    //flex: 1,
    //width: '100%',
    //flexDirection: 'row',
    //justifyContent: 'flex-end',
    //paddingHorizontal: dimensions.regularSpace,
    marginRight: dimensions.bigSpace,
    zIndex: 100,
  },
});

export default connect(mapStateToProps)(PasoCScreen);
