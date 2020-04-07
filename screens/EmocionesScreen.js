import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import colors from '../constants/Colors';
import HalfCover from '../components/HalfCover';
import Dims from '../constants/Dimensions';
import API, {user} from '../utils/API';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 */

//TODO se consultara las emociones para sus data base, y se guardara en redux
//TODO registrar seleccion
const numColumns = 2;

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
    imagen: require('../assets/images/emociones/emocion-1.png'),
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
    imagen: require('../assets/images/emociones/emocion-2.png'),
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
    imagen: require('../assets/images/emociones/emocion-3.png'),
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
    imagen: require('../assets/images/emociones/emocion-4.png'),
  },
];

/** @extends {Component<Props>} */
export default class EmocionesScreen extends Component {
  state = {
    emociones: [],
  };
  componentDidMount = async () => {
    /** @type {import('../utils/types').Emoción[]}*/
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
    this.props.navigation.navigate('Emocion', {
      emocion: item,
    });
  };

  /**
   * @param {import('react-native').ListRenderItemInfo<import('../utils/types').Emoción>} item
   */
  renderItem = ({item}) => (
    <HalfCover
      source={item.imagen}
      onPress={() => {
        this._handleClick(item);
      }}
      height={(Dims.window.width / numColumns) * 1.5}
      width={(Dims.window.width - 40) / numColumns}
      style={{backgroundColor: colors.meditacion}}
    />
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
            <Text style={styles.suggestion}>
              ¿Cómo te sientes hoy?.{'\n'}
              Llevando un registro de tus emociones vas a conocerte más a ti
              misma.
            </Text>
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
  sectionTitle: {
    fontSize: Dims.h2,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dims.regularSpace,
    marginRight: 0,
    marginBottom: 3,
    marginLeft: 0,
    color: colors.gray,
    fontFamily: 'MyriadPro-Bold',
  },
  suggestion: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: '#665e61',
    paddingVertical: 10,
    letterSpacing: 1,
  },
});
