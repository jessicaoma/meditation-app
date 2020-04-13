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
} from 'react-native';
import Colors from '../constants/Colors';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import dimensions from '../constants/Dimensions';
import ScalableText from 'react-native-text';
import {Header} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

//const screenWidth = dimensions.window.width;
const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);

/**
 * Paso Tipo(D): Ejercicio
 * @typedef Props
 * @prop {import('../utils/types').Categoria} categoria
 * @prop {import('../utils/types').Viaje} viaje
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'PasoD'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'PasoD'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class PasoDScreen extends Component {
  /** @param {Props} param*/
  static navigationOptions = ({route}) => {
    return {
      title: route.params.titulo,
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
            style={{
              backgroundColor: '#b9a0bf',
            }}
            imageStyle={{
              resizeMode: 'stretch',
            }}
            source={require('../assets/images/header-image.png')}>
            <Header {...props} />
          </ImageBackground>
        );
      },
      headerRight: props => (
        <TouchableOpacity
          style={styles.close}
          onPress={() => {
            props.navigation.pop(props.route.params.position + 1);
          }}>
          <Ionicons name={'md-close'} size={25} color={'#fff'} />
        </TouchableOpacity>
      ),
    };
  };

  /** @param {Props} props */
  constructor(props) {
    super(props);
    const {viaje} = props;
    this.pasoIndex = props.route.params.position;
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
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <ScrollView style={styles.scroll}>
            <View style={{paddingBottom: dimensions.window.width * 0.6666}}>
              {this.paso.contenidos.map(contenido => (
                <View key={contenido.key}>
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
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <Image
          source={{uri: this.paso.imagenFondo}}
          //source={{uri: 'http://okoconnect.com/karim/assets/categorias/categoria-1/ejercicio-0.png'}}
          style={styles.imagefooter}
        />
        <View style={styles.footer}>
          <TouchableOpacity onPress={this.nextStep}>
            <View style={styles.button}>
              <ScalableText style={styles.buttonLabel}>Continuar</ScalableText>
            </View>
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
    backgroundColor: 'white',
  },
  imagefooter: {
    width: dimensions.window.width,
    height: dimensions.window.width * 0.6666,
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
    backgroundColor: 'transparent',
  },
  container: {
    height: '100%',
  },
  scroll: {
    paddingHorizontal: dimensions.bigSpace,
  },
  container1: {
    width: '100%',
  },
  headline: {
    fontFamily: 'Kiona',
    fontSize: dimensions.viajeHeadlineSize,
    lineHeight: dimensions.viajeHeadlineLineHeight,
    textAlign: 'left',
    color: Colors.textoViaje,
    letterSpacing: -0.5,
    marginBottom: 10,
    marginTop: 25,
  },
  container2: {
    paddingTop: screenHeight * 0.03,
    width: '100%',
  },
  text2: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: dimensions.viajeParrafoSize,
    lineHeight: dimensions.viajeParrafoLineHeight,
    textAlign: 'left',
    color: Colors.textoViaje,
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    zIndex: 100,
    marginBottom: screenHeight * 0.05,
  },
  button: {
    height: dimensions.window.width * 0.14,
    backgroundColor: Colors.darkPurple,
    borderRadius: 40,
    paddingHorizontal: dimensions.window.width * 0.15,
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
    paddingHorizontal: 20,
    zIndex: 100,
    lineHeight: 0,
  },
});

export default connect(mapStateToProps)(PasoDScreen);
