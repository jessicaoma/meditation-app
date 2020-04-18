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
import LogoCompartir from '../constants/LogoCompartir';
import LogoDescargar from '../constants/LogoDescargar';
import dimensions from '../constants/Dimensions';
import ScreenBg from '../components/screenBg';
import ScalableText from 'react-native-text';
//import MisEmocionesScreen from '../screens/MisEmocionesScreen';

//const deviceWidth = Dims.window.width;
//const deviceHeight = '100%';
//const BAR_SPACE = 9;
/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Emocion'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Emocion'>} route
 * @extends {Component<Props>}
 */
export default class Emocion extends Component {
  animVal = new Animated.Value(0);

  _handelClick = () => {
    this.props.navigation.replace('MisEmociones');
  };

  render() {
    /** @type {import('../utils/types').Emoción} */
    // @ts-ignore
    const emocion = this.props.route.params?.emocion ?? {};
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
    //let barArray = [];
    //const itemWidth = 5;
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
                }}>
                <TouchableOpacity style={{marginRight: 20}}>
                  <LogoCompartir />
                </TouchableOpacity>
                <TouchableOpacity>
                  <LogoDescargar />
                </TouchableOpacity>
              </View>
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
