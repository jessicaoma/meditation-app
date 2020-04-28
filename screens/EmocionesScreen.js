import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import API, {user} from '../utils/API';
import ScalableText from 'react-native-text';

//TODO registrar seleccion
const numColumns = 2;
const width = (Dims.window.width - 40) / numColumns;
const height = (Dims.window.width / numColumns) * 1.5;

// datos que son fijos dentro de la app
const data = [
  {
    imagenFondo:
      'http://okoconnect.com/karim/assets/images/emociones/bg-emocion-1.png',
    header:
      'http://okoconnect.com/karim/assets/images/emociones/header-emocion-1.png',
    footer:
      'http://okoconnect.com/karim/assets/images/emociones/footer-emocion-1.png',
    headerH: 0.1,
    footerH: 0.35,
    imagen: require('../assets/images/emociones/emocion-1.gif'),
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
    imagen: require('../assets/images/emociones/emocion-2.gif'),
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
    imagen: require('../assets/images/emociones/emocion-3.gif'),
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
    imagen: require('../assets/images/emociones/emocion-4.gif'),
  },
];

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Emociones'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Emociones'>} route
 * @extends {Component<Props>}
 */
export default class EmocionesScreen extends Component {
  state = {
    emociones: [],
  };
  componentDidMount = async () => {
    let emociones = await API.getEmociones();
    emociones.forEach((emocion, index) => {
      let {imagenFondo, header, footer, headerH, footerH, imagen} = data[index];
      emocion.imagenFondo = imagenFondo;
      emocion.imagen = imagen;
      emocion.header = header;
      emocion.footer = footer;
      emocion.headerH = headerH;
      emocion.footerH = footerH;
    });
    this.setState({emociones});
  };

  /**
   * @param {import('../utils/types').Emoción} item
   */
  _handleClick = item => {
    API.postRegistroEmocion(item.key, user);
    this.props.navigation.replace('Emocion', {
      emocion: item,
    });
  };

  /**
   * @param {import('react-native').ListRenderItemInfo<import('../utils/types').Emoción>} item
   */
  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        this._handleClick(item);
      }}>
      <View style={styles.carta}>
        <Image
          style={{
            width: width - 12,
            height: width - 12,
            resizeMode: 'contain',
          }}
          source={item.imagen}
        />

        <ScalableText style={[styles.cartaTitulo]}>{item.titulo}</ScalableText>
      </View>
    </TouchableOpacity>
  );

  renderListEmpty = _ => (
    <ActivityIndicator size="large" color={colors.meditacion} />
  );

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <FlatList
              data={this.state.emociones}
              renderItem={this.renderItem}
              numColumns={numColumns}
              ListEmptyComponent={this.renderListEmpty}
              keyExtractor={item => item.key}
            />
            <ScalableText style={styles.suggestion}>
              ¿Cómo te sientes hoy?{'\n'}
              {'\n'}
              Llevando un registro de tus emociones podrás conocerte mejor.
            </ScalableText>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Dims.regularSpace,
  },
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  suggestion: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: '#665e61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    letterSpacing: 1,
  },
  carta: {
    margin: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: colors.meditacion,
    height: height,
    width: width - 5,
    alignSelf: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cartaTitulo: {
    textAlign: 'center',
    color: 'white',
  },
});
