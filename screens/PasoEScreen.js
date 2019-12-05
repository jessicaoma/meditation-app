import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Dimensions from '../constants/Dimensions';
import {Ionicons} from '@expo/vector-icons';

/**
 * Paso Tipo(E): Recomendaciones
 * @typedef {Object} ParamsNavigation
 * @prop {import('../utils/types').Paso[]} steps
 * @prop {number} position
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 *
 * @extends {Component<Props>}
 */
export default class PasoEScreen extends Component {
  static navigationOptions = ({navigation}) => {
    /** @type {ParamsNavigation} */
    const {steps, position} = navigation.state.params;
    return {
      title: steps[position].title,
    };
  };

  info = {
    recomendaciones: [
      {
        id: 1,
        image: 'http://okoconnect.com/karim/images/iconMeditar4.png',
        title:
          '1. Asume que no puedes cumplir totalmente con las expectativas de los demás, no es posible ni sano.',
      },
      {
        id: 2,
        image: 'http://okoconnect.com/karim/images/iconMeditar2.png',
        title:
          '2. Para llegar a conocer lo que realmente deseas, es necesario pasar tiempo a solas, contigo mismo.',
      },
      {
        id: 3,
        image: 'http://okoconnect.com/karim/images/iconNube.png',
        title: '3. Aprende a decir NO, sin remordimientos y sin culpa.',
      },
      {
        id: 4,
        image: 'http://okoconnect.com/karim/images/iconMeditar3.png',
        title:
          '4. La aceptación, la gratitud, y la buena vibra de parte de los demás son algo que hace sentir bien.',
      },
    ],
  };

  nextStep = () => {
    const {steps, position} = this.props.navigation.state.params;
    const {type} = steps[position + 1];
    this.props.navigation.replace(`Paso${type}`, {
      steps,
      position: position + 1,
    });
  };

  renderItem = item => (
    <View style={styles.list} key={`recomendaciones${item.id}`}>
      <Image source={{uri: item.image}} style={styles.iconList} />
      <Text style={styles.textList}>{item.title}</Text>
    </View>
  );

  render() {
    return (
      <>
        <SafeAreaView style={{flex: 1}}>
          <ImageBackground
            style={[styles.container]}
            source={{
              uri: 'http://okoconnect.com/karim/images/slider-bg-7.png',
            }}>
            <TouchableOpacity style={styles.close} onPress={this.nextStep}>
              <Ionicons name={'md-close'} size={30} color={Colors.gray} />
            </TouchableOpacity>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <View style={styles.container}>
                <View style={styles.container}>
                  {this.info.recomendaciones.map(item => this.renderItem(item))}
                </View>
              </View>
            </ScrollView>
            <View style={[styles.containerBottomButton]}>
              <TouchableOpacity onPress={this.nextStep} style={[styles.button]}>
                <Text style={styles.buttonLabel}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </>
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
  list: {
    flex: 1,
    justifyContent: 'flex-start',
    color: Colors.gray,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingRight: 20,
    width: '100%',
  },
  iconList: {
    //color: Colors.primary,
    marginTop: 5,
    marginRight: 10,
    height: 24,
    width: 24,
  },
  textList: {
    fontFamily: 'MyriadPro-Regular',
    color: Colors.gray,
    fontSize: 19,
    lineHeight: 36,
    letterSpacing: 1.11,
    maxWidth: '90%',
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
});
