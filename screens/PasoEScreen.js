import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  DeviceInfo,
  BackHandler,
} from 'react-native';
import Colors from '../constants/Colors';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import dimensions from '../constants/Dimensions';
import ScalableText from 'react-native-text';
import {HeaderBackButton} from '@react-navigation/stack';
import Next from '../constants/LogoButtonNext';
import {connect, useDispatch} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {useFocusEffect} from '@react-navigation/native';

//const screenWidth = dimensions.window.width;
const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);

const proportion = dimensions.window.width / dimensions.window.height;
const marginTopImage =
  proportion > 0.5
    ? dimensions.window.width * 0.25 * -1
    : Platform.OS === 'android'
    ? dimensions.window.width * 0.25 * -1
    : DeviceInfo.isIPhoneX_deprecated
    ? -20
    : 0;
const heightButtonSig = dimensions.window.width * 0.14;
let pasoAnterio = {};

/**
 * Paso Tipo(E): Cierre
 * @typedef Props
 * @prop {import('../utils/types').Categoria} categoria
 * @prop {import('../utils/types').Viaje[]} viajes
 * @prop {number} indexViaje
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'PasoE'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'PasoE'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @param {Props} props
 */
function PasoEScreen(props) {
  const {indexViaje, viajes, navigation} = props;
  const viaje = viajes[indexViaje];
  const pasoIndex = props.route.params.position;
  const paso = viaje.pasos[pasoIndex];
  const contenido = paso.contenidos[0];
  pasoAnterio.tipo = viaje.pasos[pasoIndex - 1]?.tipo ?? 0;
  pasoAnterio.titulo = viaje.pasos[pasoIndex - 1]?.titulo ?? '';
  pasoAnterio.position = pasoIndex - 1;

  React.useEffect(() => {
    if (pasoIndex === viaje.pasos.length - 1) {
      API.putDiarioPaso(paso.key, enumStatus.done, user);
      API.putDiarioViaje(viaje.key, enumStatus.done, user);
    } else {
      API.putDiarioPaso(paso.key, enumStatus.doing, user);
    }
  });

  /**
   * @param {import('../utils/types').Viaje} viaje
   */
  function determinarPaso(viaje) {
    let posicion = 0;

    if (viaje.estado === enumStatus.done || viaje.estado === enumStatus.todo) {
      posicion = 0;
    } else {
      posicion = viaje.pasos.findIndex(
        paso2 =>
          paso2.estado === enumStatus.doing || paso2.estado === enumStatus.todo,
      );
    }
    posicion = posicion < 0 ? 0 : posicion;
    return posicion;
  }

  function _handleClose() {
    // @ts-ignore
    navigation.popToTop();
  }

  function nextStep() {
    if (pasoIndex + 1 === viaje.pasos.length) {
      //TODO salto al siguiente modulo o regresar a la categoria
      if (indexViaje + 1 === viajes.length) {
        // @ts-ignore
        navigation.popToTop();
      } else {
        props.dispatch({
          type: 'SET_MODULO',
          payload: {
            viaje: indexViaje + 1,
          },
        });
        let viaje2 = viajes[indexViaje + 1];
        let position = determinarPaso(viaje2);
        let tipo = viaje2.pasos[position].tipo;
        // @ts-ignore
        navigation.navigate(`Paso${String.fromCharCode(65 + tipo)}`, {
          position,
          titulo: viaje2.pasos[position].titulo,
        });
      }
    } else {
      const {tipo} = viaje.pasos[pasoIndex + 1];
      API.putDiarioPaso(paso.key, enumStatus.done, user);
      // @ts-ignore
      navigation.push(`Paso${String.fromCharCode(65 + tipo)}`, {
        position: pasoIndex + 1,
        titulo: viaje.pasos[pasoIndex + 1].titulo,
        colorHeader: Colors.headers[props.categoria.color],
      });
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (pasoAnterio < 0) {
          navigation.goBack();
        } else {
          const states = navigation.dangerouslyGetState();
          const anterior = states.routes[states.routes.length - 2];
          if (anterior.name !== 'Categoria') {
            navigation.goBack();
          } else {
            const {tipo, position, titulo} = pasoAnterio;
            // @ts-ignore
            navigation.replace(`Paso${String.fromCharCode(65 + tipo)}`, {
              position,
              titulo,
              colorHeader: Colors.headers[props.categoria.color],
            });
          }
        }
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Image source={{uri: paso.imagenFondo}} style={[styles.sliderImage]} />
      <TouchableOpacity
        style={styles.close}
        onPress={() => {
          _handleClose();
        }}>
        <Ionicons name={'md-close'} size={25} color={'#fff'} />
      </TouchableOpacity>
      <View style={styles.headerBack}>
        <HeaderBackButton
          tintColor="white"
          pressColorAndroid="transparent"
          onPress={() => navigation.goBack()}
          labelVisible={false}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.bodyContainer}>
          {contenido.titulo !== undefined && (
            <ScalableText style={styles.headline}>
              {contenido.titulo}
            </ScalableText>
          )}
          <ScalableText style={styles.paragraphBottom}>
            {contenido.texto}
          </ScalableText>
        </View>
        {pasoIndex === viaje.pasos.length - 1 ? (
          <View style={styles.footer}>
            <TouchableOpacity onPress={nextStep}>
              <View style={styles.buttonSiguiente}>
                <ScalableText style={styles.buttonLabel}>
                  Siguiente módulo
                </ScalableText>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonNext}>
            <TouchableOpacity onPress={nextStep}>
              <Next />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

PasoEScreen.navigationOptions = {
  header: () => null,
  headerTransparent: true,
};

function mapStateToProps(state) {
  const {categoria, viajes, viaje} = state;
  return {
    indexViaje: viaje,
    viajes,
    categoria,
  };
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: dimensions.statusBarHeight,
  },
  headerBack: {
    top: dimensions.statusBarHeight,
    zIndex: 100,
    position: 'absolute',
  },
  sliderImage: {
    width: dimensions.screen.width,
    height: dimensions.screen.width,
    resizeMode: 'contain',
    zIndex: 2,
    marginTop: marginTopImage,
  },
  body: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight + heightButtonSig,
    marginTop: dimensions.window.width * 0.25 * -1,
  },
  bodyContainer: {},
  headline: {
    fontFamily: 'Kiona',
    fontSize: dimensions.viajeHeadlineSize,
    lineHeight: dimensions.viajeHeadlineLineHeight,
    textAlign: 'left',
    color: Colors.textoViaje,
    letterSpacing: 1.2,
    marginBottom: dimensions.regularSpace,
    paddingHorizontal: dimensions.bigSpace,
  },
  paragraphBottom: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: dimensions.viajeParrafoSize,
    lineHeight: dimensions.viajeParrafoLineHeight,
    textAlign: 'left',
    color: Colors.textoViaje,
    paddingHorizontal: dimensions.bigSpace,
  },
  buttonNext: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: screenHeight * 0.04,
    marginRight: dimensions.bigSpace,
  },
  footer: {
    //Ultima pantalla
    marginBottom: screenHeight * 0.04,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonSiguiente: {
    backgroundColor: Colors.darkPurple,
    borderRadius: 40,
    paddingHorizontal: dimensions.window.width * 0.15,
    height: heightButtonSig,
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
    top: dimensions.statusBarHeight,
    zIndex: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default connect(mapStateToProps)(PasoEScreen);
