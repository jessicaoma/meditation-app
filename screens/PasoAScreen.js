import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  BackHandler,
} from 'react-native';
import Colors from '../constants/Colors';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import dimensions from '../constants/Dimensions';
import Next from '../constants/LogoButtonNext';
import ScalableText from 'react-native-text';
import {HeaderBackButton} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {useFocusEffect} from '@react-navigation/native';
import {getBrightness} from '../utils/convert';

const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);
let colorLetra = Colors.textoViaje;
let pasoAnterio = {};

/**
 * Paso Tipo(A): Highlight
 * @typedef Props
 * @prop {import('../utils/types').Categoria} categoria
 * @prop {import('../utils/types').Viaje[]} viajes
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'PasoA'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'PasoA'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @param {Props} props
 */
function PasoAScreen(props) {
  const {viajes, navigation} = props;
  const {position, viajeIndex} = props.route.params;
  const viaje = viajes[viajeIndex];
  const paso = viaje.pasos[position];
  const contenido = paso.contenidos[0];
  const color = (props?.categoria ?? viaje).color;
  pasoAnterio.tipo = viaje.pasos[position - 1]?.tipo ?? 0;
  pasoAnterio.titulo = viaje.pasos[position - 1]?.titulo ?? '';
  pasoAnterio.position = position - 1;
  colorLetra = getBrightness(color) > 190 ? Colors.textoViaje : '#fff';
  React.useEffect(() => {
    if (position === 0) {
      API.putDiarioViaje(viaje.key, enumStatus.doing, user);
    }
    API.putDiarioPaso(paso.key, enumStatus.doing, user);
  });

  function _handleClose() {
    if (position === 0) {
      props.navigation.goBack();
    } else {
      // @ts-ignore
      props.navigation.popToTop();
    }
  }

  function nextStep() {
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

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (pasoAnterio < 0) {
          if (props.categoria !== undefined) {
            // @ts-ignore
            props.navigation.popToTop();
          } else {
            props.navigation.goBack();
          }
        } else {
          const states = navigation.dangerouslyGetState();
          const anterior = states.routes[states.routes.length - 2];
          if (anterior.name !== 'Categoria') {
            navigation.goBack();
          } else {
            let {tipo, position: positionA, titulo} = pasoAnterio;
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
    }, [props.categoria, props.navigation, navigation, color, viajeIndex]),
  );

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: color}]}>
      <ImageBackground
        source={{uri: paso.imagenFondo}}
        style={[styles.sliderImage]}>
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
            onPress={() => {
              if (position === 0) {
                if (props.categoria !== undefined) {
                  // @ts-ignore
                  props.navigation.popToTop();
                } else {
                  props.navigation.goBack();
                }
              } else {
                const states = props.navigation.dangerouslyGetState();
                const anterior = states.routes[states.routes.length - 2];
                if (anterior.name !== 'Categoria') {
                  props.navigation.goBack();
                } else {
                  const {tipo} = viaje.pasos[position - 1];
                  // @ts-ignore
                  props.navigation.replace(
                    `Paso${String.fromCharCode(65 + tipo)}`,
                    {
                      position: position - 1,
                      titulo: viaje.pasos[position - 1].titulo,
                      colorHeader: Colors.headers[color],
                      viajeIndex,
                    },
                  );
                }
              }
            }}
            labelVisible={false}
          />
        </View>
        {position === 0 && (
          <TouchableOpacity style={{flex: 1}} onPress={nextStep}>
            <View style={styles.container1}>
              <ScalableText style={[styles.text2, {color: colorLetra}]}>
                Bienvenido al módulo
              </ScalableText>
              <ScalableText style={[styles.headline, {color: colorLetra}]}>
                {viaje.titulo}
              </ScalableText>
            </View>
          </TouchableOpacity>
        )}
        {position === 1 && (
          <TouchableOpacity style={{flex: 1}} onPress={nextStep}>
            <View style={styles.container2}>
              <ScalableText style={[styles.text2, {color: colorLetra}]}>
                {contenido.texto}
              </ScalableText>
            </View>
          </TouchableOpacity>
        )}
        {position === 2 && (
          <>
            <View style={styles.container3}>
              <ScalableText style={[styles.text2, {color: colorLetra}]}>
                {contenido.texto}
              </ScalableText>
            </View>
            <View style={styles.containerButton}>
              <TouchableOpacity onPress={nextStep}>
                <Next />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

PasoAScreen.navigationOptions = {
  header: () => null,
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
    paddingTop: dimensions.statusBarHeight,
  },
  headerBack: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  sliderImage: {
    width: dimensions.screen.width,
    height: '100%',
  },
  container1: {
    flex: 1,
    paddingTop: screenHeight * 0.39,
    paddingHorizontal: dimensions.bigSpace * 2,
  },
  container2: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: dimensions.bigSpace * 2,
  },
  headline: {
    fontFamily: 'MyriadPro-Semibold',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text2: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontWeight: 'normal',
  },
  container3: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: dimensions.bigSpace * 2,
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
    top: 0,
    zIndex: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default connect(mapStateToProps)(PasoAScreen);
