import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Dimensions from '../constants/Dimensions';
import {Ionicons} from '@expo/vector-icons';
import { enumStatus } from '../utils/types';
import API, { user } from '../utils/API';
//TODO registrar avance
//TODO consultar viaje desde el redux
//TODO consultar sigueinte viaje desde redux
/**
 * Paso Tipo(G): Cierre
 * @typedef {Object} ParamsNavigation
 * @prop {import('../utils/types').Paso[]} steps
 * @prop {number} position
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 *
 * @extends {Component<Props>}
 */
export default class PasoGScreen extends Component {
  static navigationOptions = ({navigation}) => {
    /** @type {ParamsNavigation} */
    const {steps, position} = navigation.state.params;
    return {
      title: steps[position].titulo,
    };
  };

  componentDidMount = async () => {
    const {steps, position} = this.props.navigation.state.params;
    const paso = steps[position];
    API.putDiarioPaso(paso.key, enumStatus.done, null, user);
    API.putDiarioViaje(paso.viajeId, enumStatus.done, user);
  };

  returnJourney = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {steps, position} = this.props.navigation.state.params;
    return (
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity style={styles.close} onPress={this.returnJourney}>
          <Ionicons name={'md-close'} size={30} color={Colors.gray} />
        </TouchableOpacity>
        <ImageBackground
          style={[styles.container]}
          source={{
            uri: steps[position].imagenFondo,
          }}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.container}>
              <View style={styles.containerHalfBottom}>
                <Text style={styles.headline}>Felicidades!</Text>
                <Text style={styles.paragraph}>
                  {steps[position].contenidos[0]?.texto ??
                    'Haz terminado tu viaje "¿Qué es ser feliz?"'}
                </Text>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={styles.downloadtext}>Descarga</Text>
                  <Ionicons
                    name={'md-download'}
                    size={35}
                    style={styles.download}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={[styles.button]}>
              <Text style={styles.buttonLabel}>
                Iniciar Viaje "Viaja Ligero"
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    //paddingBottom: 50,
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: Dimensions.regularSpace,
    paddingTop: Dimensions.regularSpace,
  },
  container: {
    flex: 1,
  },
  containerHalfBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: Dims.window.height / 2,
  },
  close: {
    position: 'absolute',
    right: 25,
    top: 25,
    zIndex: 100,
  },
  headline: {
    fontFamily: 'MyriadPro-Bold',
    fontSize: Dims.h1,
    lineHeight: 48,
    textAlign: 'center',
    color: Colors.gray,
    letterSpacing: 2.2,
    marginTop: -40,
    paddingHorizontal: Dims.regularSpace,
  },
  paragraph: {
    fontFamily: 'MyriadPro-Regular',
    color: Colors.gray,
    fontSize: Dims.paragraph,
    lineHeight: 25,
    letterSpacing: 1.11,
    maxWidth: '90%',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonLabel: {
    color: 'white',
    fontSize: Dims.window.width * 0.041,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.5,
    lineHeight: 50,
    fontFamily: 'MyriadPro-Regular',
  },
  button: {
    backgroundColor: Colors.second,
    borderRadius: 30,
    alignSelf: 'stretch',
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: 60,
  },
  downloadtext: {
    color: Colors.gray,
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  download: {
    color: Colors.primary,
  },
});
