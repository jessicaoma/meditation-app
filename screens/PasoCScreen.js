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
import Next from '../constants/LogoButtonNext';
import {Header} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);

/**
 * Paso Tipo(C): Recomendaciones
 * @typedef Props
 * @prop {import('../utils/types').Categoria} categoria
 * @prop {import('../utils/types').Viaje} viaje
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'PasoC'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'PasoC'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class PasoCScreen extends Component {
  /** @param {Props} props */
  static navigationOptions = ({navigation, route}) => {
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
            <Header {...props} style={{backgroundColor: 'transparent'}} />
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

  _handleClose = () => {
    const {viaje} = this.props;
    // @ts-ignore
    this.props.navigation.pop(this.pasoIndex + 1);
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
                <View key={contenido.key}>
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
  scroll: {
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
  close: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 20,
    zIndex: 100,
    lineHeight: 0,
  },
});

export default connect(mapStateToProps)(PasoCScreen);
