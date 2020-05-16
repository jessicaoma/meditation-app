import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  BackHandler,
} from 'react-native';
import Colors from '../constants/Colors';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import dimensions from '../constants/Dimensions';
import ScalableText from 'react-native-text';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {useFocusEffect} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';
import { existScreenInNavigationStacks } from '../utils/convert';

const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);
//Android it's 56, on iOS, it's 44, + status bar size.
const headerH =
  Platform.OS === 'android'
    ? 56 + dimensions.statusBarHeight
    : 44 + dimensions.statusBarHeight;

let pasoAnterio = {};

/**
 * Paso Tipo(D): Ejercicio
 * @typedef Props
 * @prop {import('../utils/types').Categoria} categoria
 * @prop {import('../utils/types').Viaje[]} viajes
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'PasoD'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'PasoD'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @param {Props} props
 */
function PasoDScreen(props) {
  const {viajes, navigation} = props;
  const {position, viajeIndex} = props.route.params;
  const viaje = viajes[viajeIndex];
  const paso = viaje.pasos[position];
  const color = (props?.categoria ?? viaje).color;
  pasoAnterio.tipo = viaje.pasos[position - 1].tipo;
  pasoAnterio.titulo = viaje.pasos[position - 1].titulo;
  pasoAnterio.position = position - 1;

  React.useEffect(() => {
    API.putDiarioPaso(paso.key, enumStatus.doing, user);
  });

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
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation, color, viajeIndex]),
  );
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={{paddingBottom: dimensions.window.width * 0.6666}}>
            {paso.contenidos.map(contenido => (
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
      <Image source={{uri: paso.imagenFondo}} style={styles.imagefooter} />
      <View style={styles.footer}>
        <TouchableOpacity onPress={nextStep}>
          <View style={styles.button}>
            <ScalableText style={styles.buttonLabel}>Continuar</ScalableText>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

PasoDScreen.navigationOptions = ({navigation, route}) => {
  return {
    title: route.params.titulo,
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: 'white',
    },
    headerBackground: () => {
      return (
        <Image
          style={{
            backgroundColor: route.params.colorHeader,
            resizeMode: 'stretch',
            width: dimensions.screen.width,
            height: headerH,
          }}
          // @ts-ignore
          source={require('../assets/images/header-image.png')}
        />
      );
    },
    headerRight: props => (
      <TouchableOpacity
        style={styles.close}
        onPress={() => {
          navigation.popToTop();
          if (existScreenInNavigationStacks(navigation, 'PerfilDrawer')) {
            navigation.goBack();
          }
        }}>
        <Ionicons name={'md-close'} size={25} color={'#fff'} />
      </TouchableOpacity>
    ),
    headerLeft: props => (
      <HeaderBackButton
        {...props}
        labelVisible={false}
        onPress={() => {
          const states = navigation.dangerouslyGetState();
          const anterior = states.routes[states.routes.length - 2];
          if (anterior.name !== 'Categoria') {
            navigation.goBack();
          } else {
            const {tipo, position, titulo} = pasoAnterio;
            navigation.replace(`Paso${String.fromCharCode(65 + tipo)}`, {
              position,
              titulo,
              colorHeader:
                Colors.headers[(props?.categoria ?? props.viaje).color],
              viajeIndex: route.params.viajeIndex,
            });
          }
        }}
      />
    ),
  };
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
    fontSize: 20,
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
