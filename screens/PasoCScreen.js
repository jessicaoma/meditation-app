import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
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
import {Header} from 'react-navigation';
import {connect} from 'react-redux';

//const screenWidth = dimensions.window.width;
const screenHeight =
  dimensions.screen.height -
  Header.HEIGHT -
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
              width: dimensions.screen.width,
              height:
                Header.HEIGHT +
                (Platform.OS === 'android' ? dimensions.statusBarHeight : 0),
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
    const contenido = this.paso.contenidos[0];
    return (
      <SafeAreaView style={[styles.safe, {backgroundColor: 'white'}]}>
        <ImageBackground
          source={{uri: this.paso.imagenFondo}}
          style={[styles.sliderImage]}>
          <View style={styles.container1}>
            <ScrollView style={styles.scroll}>
              <ScalableText style={styles.headline}>
                {contenido.titulo}
              </ScalableText>
              <ScalableText style={styles.text2}>
                {contenido.texto}
              </ScalableText>
            </ScrollView>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={this.nextStep}>
              <ScalableText>Botton</ScalableText>
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
  };
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  sliderImage: {
    width: dimensions.window.width,
    height: screenHeight,
    //resizeMode: 'contain',
  },
  container1: {
    height: screenHeight * 0.7,
  },
  //Jess, no le pongas padding o margin vertical al scroll
  scroll: {
    paddingHorizontal: dimensions.hugeSpace + dimensions.smallSpace,
  },
  headline: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 30,
    lineHeight: 48,
    textAlign: 'left',
    color: Colors.textoViaje,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
  },
  text2: {
    fontFamily: 'MyriadPro-Semibold',
    fontSize: 18,
    lineHeight: 33,
    textAlign: 'left',
    color: Colors.textoViaje,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: screenHeight * 0.3,
    borderWidth: 1,
    borderColor: '#00f',
  },
});

export default connect(mapStateToProps)(PasoCScreen);
