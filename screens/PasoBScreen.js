import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Platform,
  BackHandler,
} from 'react-native';
import Player from '../player/Player';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import ScalableText from 'react-native-text';
import {connect} from 'react-redux';
import {HeaderBackButton} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import {useFocusEffect} from '@react-navigation/native';

const screenHeight =
  dimensions.screen.height -
  (Platform.OS === 'android' ? dimensions.statusBarHeight : 0);

let pasoAnterio = {};

/**
 * Paso Tipo(B): Teoría
 * @typedef Props
 * @prop {import('../utils/types').Categoria} categoria
 * @prop {import('../utils/types').Viaje[]} viajes
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'PasoB'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'PasoB'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @param {Props} props
 */
function PasoBScreen(props) {
  const {viajes, navigation} = props;
  const {position, viajeIndex} = props.route.params;
  const viaje = viajes[viajeIndex];
  const paso = viaje.pasos[position];
  const [show, setShow] = React.useState(true);
  let player = {};
  pasoAnterio.tipo = viaje.pasos[position - 1].tipo;
  pasoAnterio.titulo = viaje.pasos[position - 1].titulo;
  pasoAnterio.position = position - 1;
  const contenido = paso.contenidos[0];

  React.useEffect(() => {
    API.putDiarioPaso(paso.key, enumStatus.doing, user);
  });

  function _handleClose() {
    // @ts-ignore
    navigation.popToTop();
  }

  function nextStep() {
    const {tipo} = viaje.pasos[position + 1];
    API.putDiarioPaso(paso.key, enumStatus.done, user);
    // @ts-ignore
    navigation.push(`Paso${String.fromCharCode(65 + tipo)}`, {
      position: position + 1,
      titulo: viaje.pasos[position + 1].titulo,
      colorHeader: Colors.headers[props.categoria.color],
      viajeIndex,
    });
  }

  /** @param {Player} ref*/
  function refPlayer(ref) {
    player = ref;
  }

  function mostrarControles() {
    //TODO hacer que al pulsar se muestren los controles
    player._startPlayer();
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
            colorHeader: Colors.headers[props.categoria.color],
            viajeIndex,
          });
        }
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation, props.categoria.color, viajeIndex]),
  );

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: 'white'}]}>
      <ImageBackground
        source={{uri: paso.imagenFondo}}
        style={styles.sliderImage}>
        <TouchableOpacity
          style={styles.close}
          onPress={() => {
            _handleClose();
          }}>
          <Ionicons name={'md-close'} size={25} color={'#bdc4e1'} />
        </TouchableOpacity>
        <View style={styles.container1}>
          <ScalableText style={styles.headline}>{paso.titulo}</ScalableText>
        </View>
        <View style={show ? styles.container2 : styles.hidden}>
          <TouchableOpacity onPress={mostrarControles}>
            <View style={styles.button}>
              <ScalableText style={styles.buttonLabel}>
                Escuchar el audio
              </ScalableText>
            </View>
          </TouchableOpacity>
        </View>
        <Player
          ref={refPlayer}
          source={{
            uri: contenido.media,
          }}
          showControls
          onEnd={nextStep}
          onPlayPause={() => {
            setShow(false);
          }}
        />
        <View style={styles.headerBack}>
          <HeaderBackButton
            tintColor="#bdc4e1"
            pressColorAndroid="transparent"
            onPress={() => {
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
                  colorHeader: Colors.headers[props.categoria.color],
                  viajeIndex,
                });
              }
            }}
            labelVisible={false}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

PasoBScreen.navigationOptions = {
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
  sliderImage: {
    width: dimensions.screen.width,
    height: '100%',
  },
  headerBack: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  container1: {
    width: dimensions.screen.width,
    height: '100%',
    top: 0,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  headline: {
    fontFamily: 'Kiona',
    fontSize: dimensions.viajeHeadlineSize,
    lineHeight: dimensions.viajeHeadlineLineHeight,
    textAlign: 'center',
    color: Colors.textoViaje,
    marginTop: 20,
    paddingHorizontal: dimensions.regularSpace,
    textTransform: 'uppercase',
  },
  container2: {
    position: 'absolute',
    bottom: 30,
    marginBottom: screenHeight * 0.1,
    alignSelf: 'center',
    zIndex: 100,
  },
  hidden: {
    display: 'none',
  },
  button: {
    backgroundColor: Colors.darkPurple,
    borderRadius: 40,
    paddingHorizontal: dimensions.window.width * 0.15,
    height: dimensions.window.width * 0.14,
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
    right: 20,
    top: 10,
    zIndex: 100,
  },
});

export default connect(mapStateToProps)(PasoBScreen);
