// @ts-nocheck
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
import API from '../utils/API';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 */

//TODO cambiar la validacion pues ya no se usa expo snack
//TODO se consultara las emociones para sus data base, y se guardara en redux
//TODO registrar seleccion
const envProd = process.env.NODE_ENV === 'production';
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
    imagen: envProd
      ? {
          uri:
            'http://okoconnect.com/karim/assets/images/emociones/emocion-1.png',
        }
      : require('../assets/images/emociones/emocion-1.png'),
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
    imagen: envProd
      ? {
          uri:
            'http://okoconnect.com/karim/assets/images/emociones/emocion-2.png',
        }
      : require('../assets/images/emociones/emocion-2.png'),
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
    imagen: envProd
      ? {
          uri:
            'http://okoconnect.com/karim/assets/images/emociones/emocion-3.png',
        }
      : require('../assets/images/emociones/emocion-3.png'),
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
    imagen: envProd
      ? {
          uri:
            'http://okoconnect.com/karim/assets/images/emociones/emocion-4.png',
        }
      : require('../assets/images/emociones/emocion-4.png'),
  },
];

/** @extends {Component<Props>} */
export default class EmocionesScreen extends Component {
  state = {
    emociones: [],
  };
  async componentDidMount() {
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
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({emociones});
  }

  /**
   * @param {import('../utils/types').Emoción} item
   */
  _handleClick = item => {
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
      //color={'transparent'}
    />
  );

  renderListEmpty = _ => (
    <ActivityIndicator size="large" color={colors.meditacion} />
  );

  render() {
    return (
      <>
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.container}>
              <Text style={styles.sectionTitle}>Tus emociones </Text>
              <FlatList
                data={this.state.emociones}
                renderItem={this.renderItem}
                numColumns={numColumns}
                ListEmptyComponent={this.renderListEmpty}
                keyExtractor={item => item.key}
              />
              <Text style={styles.suggestion}>
                ¿Cómo te sientes hoy?.{'\n'}
                Llevando un registro de tus emociones vas a concerte más a ti
                misma.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Dims.regularSpace,
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
  },
});
