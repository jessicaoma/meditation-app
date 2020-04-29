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
 * @prop {import('../utils/types').Viaje} viaje
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'PasoA'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'PasoA'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @param {Props} props
 */
function PasoAScreen(props) {
  const {viaje, navigation} = props;
  const pasoIndex = props.route.params.position;
  const paso = viaje.pasos[pasoIndex];
  const contenido = paso.contenidos[0];
  pasoAnterio.tipo = viaje.pasos[pasoIndex - 1]?.tipo ?? 0;
  pasoAnterio.titulo = viaje.pasos[pasoIndex - 1]?.titulo ?? '';
  pasoAnterio.position = pasoIndex - 1;
  colorLetra =
    getBrightness(props.categoria.color) > 170 ? Colors.textoViaje : '#fff';

  React.useEffect(() => {
    API.putDiarioPaso(paso.key, enumStatus.doing, user);
    if (pasoIndex === 0) {
      API.putDiarioViaje(props.viaje.key, enumStatus.doing, user);
    }
  });

  function _handleClose() {
    // @ts-ignore
    navigation.popToTop();
  }

  function nextStep() {
    const {tipo} = viaje.pasos[pasoIndex + 1];
    API.putDiarioPaso(paso.key, enumStatus.done, user);
    // @ts-ignore
    navigation.push(`Paso${String.fromCharCode(65 + tipo)}`, {
      position: pasoIndex + 1,
      titulo: viaje.pasos[pasoIndex + 1].titulo,
      colorHeader: Colors.headers[props.categoria.color],
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (pasoAnterio < 0) {
          navigation.popToTop();
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
    }, [navigation, props.categoria]),
  );

  return (
    <SafeAreaView
      style={[styles.safe, {backgroundColor: props.categoria.color}]}>
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
              if (pasoIndex === 0) {
                props.navigation.popToTop();
              } else {
                const states = props.navigation.dangerouslyGetState();
                const anterior = states.routes[states.routes.length - 2];
                if (anterior.name !== 'Categoria') {
                  props.navigation.goBack();
                } else {
                  const {tipo} = viaje.pasos[pasoIndex - 1];
                  // @ts-ignore
                  props.navigation.replace(
                    `Paso${String.fromCharCode(65 + tipo)}`,
                    {
                      position: pasoIndex - 1,
                      titulo: viaje.pasos[pasoIndex - 1].titulo,
                      colorHeader: Colors.headers[props.categoria.color],
                    },
                  );
                }
              }
            }}
            labelVisible={false}
          />
        </View>
        {pasoIndex === 0 && (
          <TouchableOpacity style={{flex: 1}} onPress={nextStep}>
            <View style={styles.container1}>
              <ScalableText style={[styles.text2, {color: colorLetra}]}>
                Bienvenido al módulo
              </ScalableText>
              <ScalableText style={[styles.headline, {color: colorLetra}]}>
                {props.viaje.titulo}
              </ScalableText>
              <ScalableText style={[styles.text2, {color: colorLetra}]}>
                de este curso
              </ScalableText>
            </View>
          </TouchableOpacity>
        )}
        {pasoIndex === 1 && (
          <TouchableOpacity style={{flex: 1}} onPress={nextStep}>
            <View style={styles.container2}>
              <ScalableText style={[styles.text2, {color: colorLetra}]}>
                {contenido.texto}
              </ScalableText>
            </View>
          </TouchableOpacity>
        )}
        {pasoIndex === 2 && (
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
  const {categoria, viajes, viaje} = state;
  return {
    viaje: viajes[viaje],
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
    paddingTop: screenHeight * 0.35,
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
