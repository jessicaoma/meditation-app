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
} from 'react-native';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Dimensions from '../constants/Dimensions';
import {Ionicons} from '@expo/vector-icons';

/**
 * @typedef {object} Props
 * @prop {import('react-navigation').NavigationScreenProp} [navigation]
 *
 * @typedef PremiumFeature
 * @prop {number} id
 * @prop {string} title
 *
 * @typedef Prices
 * @prop {number} id
 * @prop {string} title
 * @prop {string} cost
 * @prop {string} description
 *
 * @extends {Component<Props>}
 * */
export default class PremiumScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  features = {
    /** @type {PremiumFeature[]} */
    premium: [
      {
        id: 1,
        title: 'Reflexiones diarias. ',
      },
      {
        id: 2,
        title: 'Registro de emociones.',
      },
      {
        id: 3,
        title:
          'Una música de relajación.',
      },
      {
        id: 4,
        title: 'Un módulo del curso (Ser Feliz) de desarrollo personal. Con recomendaciones y ejercicios.',
      },
      {
        id: 5,
        title: 'Una meditación. Meditación Básica.',
      },
      {
        id: 6,
        title: 'Un extracto de un audiolibro de Karim Temple. (Aprendiendo a Meditar)',
      },
      {
        id: 7,
        title: 'Cartas con mensajes de los ángeles. .',
      },
    ],
    premium2: [
      {
        id: 1,
        title: 'Reflexiones diarias. ',
      },
      {
        id: 2,
        title: 'Registro de emociones y oraciones.',
      },
      {
        id: 3,
        title:
          'Videos de los cursos. ',
      },
      {
        id: 4,
        title: 'Video del tutorial. ',
      },
    ],
    premium3: [
      {
        id: 1,
        title: 'Reflexiones diarias.',
      },
      {
        id: 2,
        title: 'Registro de emociones y oraciones.',
      },
      {
        id: 3,
        title:
          'Música de relajación. ',
      },
      {
        id: 4,
        title: 'Cursos de desarrollo personal. Con recomendaciones y ejercicios. ',
      },
      {
        id: 5,
        title: 'Meditaciones.',
      },
      {
        id: 6,
        title: 'Tres Audiolibros de Karim Temple. ',
      },
      {
        id: 7,
        title: 'Cartas con mensajes de los ángeles. ',
      },
    ],
    /** @type {Prices[]} */
    prices: [
      {
        id: 1,
        title: 'Plan Anual',
        cost: '$49.99 / Anuales',
        description:
          'Paga anualmente el monto de $0.00. Se renueva automáticamente cada año.',
      },
    ],
  };

  _handleClose = () => {
    this.props.navigation.goBack(null);
  };

  /** @param {Prices} plan */
  _handleSelectPlan = plan => {};

  /** @param {PremiumFeature} item */
  renderPremiumItem = item => (
    <View style={styles.list} key={`premium${item.id}`}>
      <Ionicons
        name={'md-checkmark-circle-outline'}
        size={24}
        style={styles.iconList}
      />
      <Text style={styles.textList}>{item.title}</Text>
    </View>
  );

  /** @param {Prices} item */
  renderPriceBubble = item => (
    <TouchableOpacity
      key={`price${item.id}`}
      onPress={() => {
        this._handleSelectPlan(item);
      }}>
      <View style={styles.priceBubble}>
        <Text style={styles.titlePriceBubble}>{item.title}</Text>
        <Text style={styles.costPriceBubble}>{item.cost}</Text>
        <Text style={styles.descPriceBubble}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.statusBar} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <TouchableOpacity style={styles.close} onPress={this._handleClose}>
            <Ionicons name={'md-close'} size={30} color={Colors.gray} />
          </TouchableOpacity>
          <Image
            source={{
              uri: 'http://okoconnect.com/karim/images/premium-top.png',
            }}
            style={styles.topimage}
          />
          <View style={styles.container}>
            <Text style={styles.bigTitle}>Elige un plan</Text>
            <Text style={styles.bigParagraph}>
              {' '}
              Accede a todo el contenido ilimitado de la plataforma, los planes
              de suscripción incluyen acceso a:
            </Text>
            <View style={styles.container}>
              {this.features.premium.map(item => this.renderPremiumItem(item))}
            </View>
            <Text style={[styles.bigParagraph]}>
              {' '}{'\n'}
              Pasado los 7 días de prueba el usuario tendrá acceso a:
            </Text>
            <View style={styles.container}>
              {this.features.premium2.map(item => this.renderPremiumItem(item))}
            </View>
            <Text style={[styles.bigParagraph]}>
              {' '}{'\n'}
              Suscripción ANUAL. VALOR: $49.99 {'\n'}
              Con el plan anual, accede a todo el contenido Ilimitado de la plataforma: 
            </Text>
            <View style={styles.container}>
              {this.features.premium3.map(item => this.renderPremiumItem(item))}
            </View>
            <View style={styles.container}>
              {this.features.prices.map(item => this.renderPriceBubble(item))}
            </View>
            <View style={{paddingHorizontal: Dimensions.regularSpace}}>
              <View style={styles.priceBubble}>
                <Text style={styles.titlePriceBubble}>Plan Corporativo</Text>
                <Text style={styles.descPriceBubble}>
                  Para planes corporativos o empresariales.
                </Text>
                <TextInput
                  style={[styles.inputText]}
                  placeholder={'Correo electrónico'}
                  secureTextEntry={false}
                />
                <TouchableOpacity
                  onPress={this._handleClose}
                  style={[styles.button]}>
                  <Text style={styles.buttonLabel}>ENVIAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={[styles.containerBottomButton]}>
          <TouchableOpacity onPress={this._handleClose} style={[styles.button]}>
            <Text style={styles.buttonLabel}>Empieza tu prueba gratis</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe:{
    flex: 1,
    backgroundColor: 'white',
  },
  statusBar: {
    //height: Dimensions.statusBarHeight,
  },
  scrollView: {
    flex: 1,
    width: '100%',
    height: Dimensions.window.height,
  },
  container: {
    paddingTop: Dimensions.regularSpace,
    paddingHorizontal: Dimensions.regularSpace,
  },
  containerBottomButton: {
    paddingVertical: Dimensions.regularSpace,
    paddingHorizontal: Dimensions.regularSpace,
    backgroundColor: 'white',
  },
  topimage: {
    width: '100%',
    height: 250,
  },
  close: {
    position: 'absolute',
    right: 25,
    top: 25,
    zIndex: 100,
  },
  bigTitle: {
    fontSize: 22,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dims.regularSpace,
    marginRight: 0,
    marginBottom: 20,
    marginLeft: 0,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Bold',
    textAlign: 'center',
  },
  bigParagraph: {
    fontSize: 16,
    letterSpacing: 1.11,
    lineHeight: 24,
    marginBottom: 5,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'center',
    paddingHorizontal: Dims.regularSpace,
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
    color: Colors.primary,
    marginHorizontal: 15,
  },
  textList: {
    fontFamily: 'MyriadPro-Bold',
    color: Colors.gray,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 1.11,
    maxWidth: '90%',
  },
  priceBubble: {
    borderRadius: 10,
    backgroundColor: '#eef2ff',
    marginVertical: 10,
    padding: 20,
  },
  titlePriceBubble: {
    fontFamily: 'MyriadPro-Bold',
    color: Colors.gray,
    fontSize: 18,
    lineHeight: 24,
  },
  costPriceBubble: {
    fontFamily: 'MyriadPro-Semibold',
    color: Colors.gray,
    fontSize: 26,
    lineHeight: 30,
    marginVertical: 10,
  },
  descPriceBubble: {
    fontFamily: 'MyriadPro-Regular',
    color: Colors.gray,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 10,
  },
  inputText: {
    width: '100%',
    color: Colors.gray,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
    lineHeight: 50,
    minHeight: 50,
    fontFamily: 'MyriadPro-Regular',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderColor: '#b9c2df',
    borderWidth: 1,
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
