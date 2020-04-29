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
import Next from '../constants/LogoButtonNext';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {useFocusEffect} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';

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
 * Paso Tipo(C): Recomendaciones
 * @typedef Props
 * @prop {import('../utils/types').Categoria} categoria
 * @prop {import('../utils/types').Viaje} viaje
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'PasoC'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'PasoC'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @param {Props} props
 */
function PasoCScreen(props) {
  const {viaje, navigation} = props;
  const pasoIndex = props.route.params.position;
  const paso = viaje.pasos[pasoIndex];
  pasoAnterio.tipo = viaje.pasos[pasoIndex - 1].tipo;
  pasoAnterio.titulo = viaje.pasos[pasoIndex - 1].titulo;
  pasoAnterio.position = pasoIndex - 1;

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
      colorHeader: Colors.headers[props.categoria.color],
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
            colorHeader: Colors.headers[props.categoria.color],
          });
        }
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation, props.categoria.color]),
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={{paddingBottom: dimensions.window.width * 0.6666}}>
            {paso.contenidos.map(contenido => (
              <View key={contenido.key}>
                {contenido.titulo !== undefined && contenido.titulo !== '' && (
                  <View style={styles.container1}>
                    <ScalableText style={styles.headline}>
                      {contenido.titulo}
                    </ScalableText>
                  </View>
                )}
                {contenido.texto !== undefined && contenido.texto !== '' && (
                  <View style={styles.container2}>
                    <ScalableText style={styles.text2}>
                      {contenido.texto}
                    </ScalableText>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <Image
        source={{uri: paso.imagenFondo}}
        style={styles.imagefooter}
        width={dimensions.window.width}
        height={dimensions.window.width * 0.562}
      />
      <View style={styles.footer} />
      <View style={styles.containerButton}>
        <TouchableOpacity onPress={nextStep}>
          <Next />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

PasoCScreen.navigationOptions = ({navigation, route}) => {
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
              colorHeader: Colors.headers[props.categoria.color],
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
    right: 0,
    paddingHorizontal: 20,
    zIndex: 100,
    lineHeight: 0,
  },
});

export default connect(mapStateToProps)(PasoCScreen);
