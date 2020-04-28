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

//const screenWidth = dimensions.window.width;
const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);
//Android it's 56, on iOS, it's 44, + status bar size.
const headerH =
  Platform.OS === 'android'
    ? 56 + dimensions.statusBarHeight
    : 44 + //DeviceInfo.isIPhoneX_deprecated
      //? dimensions.statusBarHeight - 20
      dimensions.statusBarHeight;

let headerColor = '#fff';
let pasoAnterio = {};

function getIndex(value, arr, prop) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1; //to handle the case where the value doesn't exist
}

/**
 * Paso Tipo(D): Ejercicio
 * @typedef Props
 * @prop {import('../utils/types').Categoria} categoria
 * @prop {import('../utils/types').Viaje} viaje
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'PasoD'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'PasoD'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @param {Props} props
 */
function PasoDScreen(props) {
  const {viaje, navigation} = props;
  const pasoIndex = props.route.params.position;
  const paso = viaje.pasos[pasoIndex];
  pasoAnterio.tipo = viaje.pasos[pasoIndex - 1].tipo;
  pasoAnterio.titulo = viaje.pasos[pasoIndex - 1].titulo;
  pasoAnterio.position = pasoIndex - 1;

  var index = getIndex(props.categoria.color, Colors.headers, 'cateColor');
  headerColor = Colors.headers[index].headerColor;

  React.useEffect(() => {
    API.putDiarioPaso(paso.key, enumStatus.doing, user);
  });

  function nextStep() {
    const {tipo} = viaje.pasos[pasoIndex + 1];
    API.putDiarioPaso(paso.key, enumStatus.done, user);
    // @ts-ignore
    navigation.push(`Paso${String.fromCharCode(65 + tipo)}`, {
      position: pasoIndex + 1,
      titulo: viaje.pasos[pasoIndex + 1].titulo,
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
          const {tipo, position, titulo} = pasoAnterio;
          // @ts-ignore
          navigation.replace(`Paso${String.fromCharCode(65 + tipo)}`, {
            position,
            titulo,
          });
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
            backgroundColor: headerColor,
            resizeMode: 'stretch',
            width: dimensions.screen.width,
            height: headerH,
          }}
          source={require('../assets/images/header-image.png')}
        />
      );
    },
    headerRight: props => (
      <TouchableOpacity
        style={styles.close}
        onPress={() => {
          //props.navigation.pop(props.route.params.position + 1);
          navigation.popToTop();
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
            // @ts-ignore
            navigation.replace(`Paso${String.fromCharCode(65 + tipo)}`, {
              position,
              titulo,
            });
          }
        }}
      />
    ),
  };
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
