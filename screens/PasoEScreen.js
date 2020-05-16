import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
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
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {useFocusEffect} from '@react-navigation/native';

//const screenWidth = dimensions.window.width;
const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);

const proportion = dimensions.window.width / dimensions.window.height;

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
  const {viajes, navigation} = props;
  const {position, viajeIndex} = props.route.params;
  const viaje = viajes[viajeIndex];
  const paso = viaje.pasos[position];
  const contenido = paso.contenidos[0];
  const color = (props?.categoria ?? viaje).color;
  pasoAnterio.tipo = viaje.pasos[position - 1]?.tipo ?? 0;
  pasoAnterio.titulo = viaje.pasos[position - 1]?.titulo ?? '';
  pasoAnterio.position = position - 1;

  React.useEffect(() => {
    if (position === viaje.pasos.length - 1) {
      API.putDiarioPaso(paso.key, enumStatus.done, user);
      API.putDiarioViaje(viaje.key, enumStatus.done, user);
    } else {
      API.putDiarioPaso(paso.key, enumStatus.doing, user);
    }
  });

  /**
   * @param {import('../utils/types').Viaje} v
   */
  function determinarPaso(v) {
    let posicion = 0;

    if (v.estado === enumStatus.done || v.estado === enumStatus.todo) {
      posicion = 0;
    } else {
      posicion = v.pasos.findIndex(
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
    if (props.categoria === undefined) {
      props.navigation.goBack();
    }
  }

  function nextStep() {
    if (position + 1 === viaje.pasos.length) {
      //TODO salto al siguiente modulo o regresar a la categoria
      if (viajeIndex + 1 === viajes.length) {
        // @ts-ignore
        navigation.navigate('Categorias');
      } else {
        let viaje2 = viajes[viajeIndex + 1];
        let positionN = determinarPaso(viaje2);
        let tipo = viaje2.pasos[positionN].tipo;
        // @ts-ignore
        navigation.popToTop();
        // @ts-ignore
        navigation.navigate(`Paso${String.fromCharCode(65 + tipo)}`, {
          position: positionN,
          titulo: viaje2.pasos[positionN].titulo,
          colorHeader: Colors.headers[color],
          viajeIndex: viajeIndex + 1,
        });
      }
    } else {
      const {tipo} = viaje.pasos[position + 1];
      API.putDiarioPaso(paso.key, enumStatus.done, user);
      // @ts-ignore
      navigation.push(`Paso${String.fromCharCode(65 + tipo)}`, {
        position: position + 1,
        titulo: viaje.pasos[position + 1].titulo,
        colorHeader: Colors.headers[color],
        viajeIndex,
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
            const {tipo, position: positionA, titulo} = pasoAnterio;
            // @ts-ignore
            navigation.replace(`Paso${String.fromCharCode(65 + tipo)}`, {
              position: positionA,
              titulo,
              colorHeader: Colors.headers[color],
              viajeIndex,
            });
          }
        }
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation, color, viajeIndex]),
  );
  let Pie = <></>;
  if (position === viaje.pasos.length - 1) {
    if (props.categoria !== undefined) {
      Pie = (
        <View style={styles.footer}>
          <TouchableOpacity onPress={nextStep}>
            <View style={styles.buttonSiguiente}>
              <ScalableText style={styles.buttonLabel}>
                {viajeIndex + 1 === viajes.length
                  ? 'Ver otros cursos'
                  : 'Siguiente módulo'}
              </ScalableText>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  } else {
    Pie = (
      <View style={styles.buttonNext}>
        <TouchableOpacity onPress={nextStep}>
          <Next />
        </TouchableOpacity>
      </View>
    );
  }
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
          <ScrollView style={styles.scroll}>
            {contenido.titulo !== undefined && (
              <ScalableText style={styles.headline}>
                {"\n"}
                {contenido.titulo}
              </ScalableText>
            )}
            <ScalableText style={styles.paragraphBottom}>
              {contenido.texto}
              {"\n"}{"\n"}{"\n"}
            </ScalableText>
          </ScrollView>
        </View>
      </View>
      {Pie}

      
    </SafeAreaView>
  );
}

PasoEScreen.navigationOptions = {
  header: () => null,
  headerTransparent: true,
};

function mapStateToProps(state) {
  const {categoria, viajes} = state;
  return {
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
    height: dimensions.screen.width * 0.8,
    resizeMode: 'contain',
    zIndex: 2,
  },
  body: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: screenHeight * 0.08
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
