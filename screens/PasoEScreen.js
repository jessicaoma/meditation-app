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
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
//TODO registrar avance
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
      title: steps[position].titulo,
    };
  };

  componentDidMount = async () => {
    const {steps, position} = this.props.navigation.state.params;
    const paso = steps[position];
    API.putDiarioPaso(paso.key, enumStatus.doing, null, user);
  };

  nextStep = () => {
    const {steps, position} = this.props.navigation.state.params;
    const {tipo} = steps[position + 1];
    const paso = steps[position];
    API.putDiarioPaso(paso.key, enumStatus.done, null, user);
    // @ts-ignore
    this.props.navigation.replace(`Paso${String.fromCharCode(65 + tipo)}`, {
      steps,
      position: position + 1,
    });
  };

  renderItem = item => (
    <View style={styles.list} key={item.key}>
      <Image source={{uri: item.imagen}} style={styles.iconList} />
      <Text style={styles.textList}>{item.titulo}</Text>
    </View>
  );

  render() {
    const {steps, position} = this.props.navigation.state.params;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ImageBackground
          style={[styles.container]}
          source={{
            uri: steps[position].imagenFondo,
          }}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.container}>
              <View style={styles.container}>
                {steps[position].contenidos.map(item => this.renderItem(item))}
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
    paddingVertical: 12,
    paddingRight: 20,
    width: '100%',
  },
  iconList: {
    //color: Colors.primary,
    marginTop: 5,
    marginRight: 15,
    height: 24,
    width: 24,
  },
  textList: {
    fontFamily: 'MyriadPro-Regular',
    color: Colors.gray,
    fontSize: Dims.paragraph,
    lineHeight: 25,
    letterSpacing: 1.1,
    maxWidth: '90%',
  },
  buttonLabel: {
    color: 'white',
    fontSize: Dims.bubbleTitle,
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
