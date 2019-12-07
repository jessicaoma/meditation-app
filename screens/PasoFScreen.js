import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Dimensions from '../constants/Dimensions';
import {Ionicons} from '@expo/vector-icons';
import Constants from 'expo-constants';

/**
 * Paso Tipo(F): Diario
 * @typedef {Object} ParamsNavigation
 * @prop {import('../utils/types').Paso[]} steps
 * @prop {number} position
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 *
 * @extends {Component<Props>}
 */
export default class PasoFScreen extends Component {
  static navigationOptions = ({navigation}) => {
    /** @type {ParamsNavigation} */
    const {steps, position} = navigation.state.params;
    return {
      title: steps[position].title,
      headerStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },
    };
  };

  nextStep = () => {
    const {steps, position} = this.props.navigation.state.params;
    const {type} = steps[position + 1];
    this.props.navigation.replace(`Paso${type}`, {
      steps,
      position: position + 1,
    });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ImageBackground
          style={[styles.container]}
          source={{uri: 'http://okoconnect.com/karim/images/slider-bg-8.png'}}>
          <TouchableOpacity style={styles.close} onPress={this.nextStep}>
            <Ionicons name={'md-close'} size={30} color={Colors.gray} />
          </TouchableOpacity>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.container}>
              <View style={styles.container}>
                <Text style={styles.title}>Reto Personal</Text>
                <Text style={styles.paragraph}>
                  Completa estas líneas en pocas palabras. Puedes descargarla y
                  compartir tus respuestas con tus amigos y seres queridos en
                  las redes sociales.
                </Text>
                <View>
                  <Text style={styles.subtitle}>Hoy estoy agradecido por:</Text>
                  <TextInput
                    style={styles.textarea}
                    underlineColorAndroid="transparent"
                    placeholder="Tu respuesta"
                    placeholderTextColor="grey"
                    numberOfLines={5}
                    multiline={true}
                  />
                </View>
                <View>
                  <Text style={styles.subtitle}>
                    Lo que más aprecio en mi vida es:
                  </Text>
                  <TextInput
                    style={styles.textarea}
                    underlineColorAndroid="transparent"
                    placeholder="Tu respuesta"
                    placeholderTextColor="grey"
                    numberOfLines={5}
                    multiline={true}
                  />
                </View>
                <View>
                  <Text style={styles.subtitle}>
                    Mi actitud frente al cambio es:
                  </Text>
                  <TextInput
                    style={styles.textarea}
                    underlineColorAndroid="transparent"
                    placeholder="Tu respuesta"
                    placeholderTextColor="grey"
                    numberOfLines={5}
                    multiline={true}
                  />
                </View>
                <View>
                  <Text style={styles.subtitle}>
                    Las dificultades en la vida sirven para:
                  </Text>
                  <TextInput
                    style={styles.textarea}
                    underlineColorAndroid="transparent"
                    placeholder="Tu respuesta"
                    placeholderTextColor="grey"
                    numberOfLines={5}
                    multiline={true}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={[styles.containerBottomButton]}>
            <TouchableOpacity onPress={this.nextStep} style={[styles.button]}>
              <Text style={styles.buttonLabel}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 50,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    paddingTop: Dimensions.regularSpace,
    paddingHorizontal: Dimensions.regularSpace,
    flex: 1,
  },
  containerBottomButton: {
    paddingVertical: Dimensions.regularSpace,
    paddingHorizontal: Dimensions.regularSpace,
    backgroundColor: 'transparent',
  },
  close: {
    position: 'absolute',
    right: 25,
    top: 25,
    zIndex: 100,
  },
  title: {
    fontFamily: 'MyriadPro-Bold',
    color: Colors.gray,
    fontSize: 20,
    lineHeight: 36,
    letterSpacing: 1.11,
    fontStyle: 'italic',
  },
  subtitle: {
    fontFamily: 'MyriadPro-Bold',
    color: Colors.gray,
    fontSize: Dims.paragraph,
    lineHeight: 20,
    letterSpacing: 1.11,
    marginBottom: 5,
  },
  paragraph: {
    fontFamily: 'MyriadPro-Regular',
    color: Colors.gray,
    fontSize: Dims.paragraph,
    lineHeight: 25,
    letterSpacing: 1.11,
    maxWidth: '90%',
    marginBottom: 30,
  },
  buttonLabel: {
    color: 'white',
    fontSize: Dims.window.width * 0.041,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.5,
    lineHeight: 50,
    fontFamily: 'MyriadPro-Regular',
  },
  button: {
    backgroundColor: Colors.second,
    borderRadius: 10,
    alignSelf: 'stretch',
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textarea: {
    backgroundColor: 'rgb(249, 249, 249)',
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'MyriadPro-Regular',
    color: Colors.gray,
    height: 74,
    padding: 10,
    paddingTop: Dimensions.regularSpace,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
});
