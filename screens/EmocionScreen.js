import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
//import LogoCompartir from '../constants/LogoCompartir';
//import LogoDescargar from '../constants/LogoDescargar';
import dimensions from '../constants/Dimensions';
import ScreenBg from '../components/screenBg';
import ScalableText from 'react-native-text';
import {connect} from 'react-redux';

// datos que son fijos dentro de la app
const emocionImages = [
  {
    imagenFondo:
      'http://okoconnect.com/karim/assets/images/emociones/bg-emocion-1.png',
    header:
      'http://okoconnect.com/karim/assets/images/emociones/header-emocion-1.png',
    footer:
      'http://okoconnect.com/karim/assets/images/emociones/footer-emocion-1.png',
    headerH: 0.1,
    footerH: 0.35,
  },
  {
    imagenFondo:
      'http://okoconnect.com/karim/assets/images/emociones/bg-emocion-2.png',
    header:
      'http://okoconnect.com/karim/assets/images/emociones/header-emocion-2.png',
    footer:
      'http://okoconnect.com/karim/assets/images/emociones/footer-emocion-2.png',
    headerH: 0.1,
    footerH: 0.3,
  },
  {
    imagenFondo:
      'http://okoconnect.com/karim/assets/images/emociones/bg-emocion-3.png',
    header:
      'http://okoconnect.com/karim/assets/images/emociones/header-emocion-3.png',
    footer:
      'http://okoconnect.com/karim/assets/images/emociones/footer-emocion-3.png',
    headerH: 0.35,
    footerH: 0.35,
  },
  {
    imagenFondo:
      'http://okoconnect.com/karim/assets/images/emociones/bg-emocion-4.png',
    header:
      'http://okoconnect.com/karim/assets/images/emociones/header-emocion-4.png',
    footer:
      'http://okoconnect.com/karim/assets/images/emociones/footer-emocion-4.png',
    headerH: 0.45,
    footerH: 0.2,
  },
];

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Emocion'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Emocion'>} route
 * @prop {import('../utils/types').Emoción} emocion
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class Emocion extends Component {
  animVal = new Animated.Value(0);

  _handelClick = () => {
    // @ts-ignore
    this.props.navigation.replace('MisEmociones');
  };

  render() {
    const {emocion} = this.props;
    let {imagenFondo, header, footer, headerH, footerH} = emocionImages[
      emocion.key - 1
    ];
    emocion.imagenFondo = imagenFondo;
    emocion.header = header;
    emocion.footer = footer;
    emocion.headerH = headerH;
    emocion.footerH = footerH;
    const info = [
      {
        key: 'slide1',
        title: emocion.titulo,
        text: emocion.descripcion,
      },
      {
        key: 'slide2',
        title: 'Oración',
        text: emocion.oracion,
      },
    ];

    let imageArray = [];
    info.forEach((item, i) => {
      const thisImage = (
        <View key={`item${i}`}>
          {i === 0 ? (
            <>
              <ScalableText style={styles.bigTitle}>{item.title}</ScalableText>
              <ScalableText style={styles.paragraph}>{item.text}</ScalableText>
            </>
          ) : (
            <>
              <ScalableText style={styles.bigTitle}>{item.title}</ScalableText>
              <ScalableText style={styles.paragraph}>{item.text}</ScalableText>
              <TouchableOpacity
                style={styles.button}
                onPress={this._handelClick}>
                <ScalableText style={styles.buttonLabel}>
                  Ir a mis emociones
                </ScalableText>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingHorizontal: 50,
                }}
              />
              {/* <TouchableOpacity style={{marginRight: 20}}>
                  <LogoCompartir />
                </TouchableOpacity>
                <TouchableOpacity>
                  <LogoDescargar />
                </TouchableOpacity> */}
            </>
          )}
        </View>
      );
      imageArray.push(thisImage);
    });

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScreenBg
          source={{uri: emocion.imagenFondo}}
          styleImage={{resizeMode: 'cover', height: dimensions.window.height}}>
          <ScrollView>
            <View style={{minHeight: dimensions.window.height}}>
              <Image
                style={{
                  width: dimensions.window.width,
                  height: dimensions.window.height * emocion.headerH,
                }}
                source={{uri: emocion.header}}
              />
              <View style={styles.container}>
                <ScrollView style={styles.slider}>{imageArray}</ScrollView>
              </View>
              <Image
                style={{
                  width: dimensions.window.width,
                  height: dimensions.window.height * emocion.footerH,
                  minHeight: dimensions.window.height * emocion.footerH,
                }}
                source={{uri: emocion.footer}}
              />
            </View>
          </ScrollView>
        </ScreenBg>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    emocion: state.emocion,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: dimensions.window.width,
  },
  scrollView: {
    width: dimensions.window.width,
  },
  slider: {
    margin: 0,
    position: 'relative',
  },
  bigTitle: {
    fontFamily: 'Kiona',
    fontSize: 30,
    letterSpacing: -0.5,
    lineHeight: 40,
    marginRight: 0,
    marginBottom: 10,
    marginLeft: 0,
    color: 'white',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 15.5,
    lineHeight: 15.5,
    letterSpacing: 0,
    color: 'white',
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'justify',
    paddingHorizontal: dimensions.smallSpace,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.darkPurple,
    borderRadius: 40,
    paddingHorizontal: dimensions.window.width * 0.15,
    height: dimensions.window.width * 0.14,
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 30,
  },
  buttonLabel: {
    color: 'white',
    fontFamily: 'MyriadPro-Regular',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default connect(mapStateToProps)(Emocion);
