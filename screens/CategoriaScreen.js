import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  View,
} from 'react-native';
import ItemBubble from '../components/ItemBubble';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import Dimensions from '../constants/Dimensions';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import ScalableText from 'react-native-text';
import {HeaderBackButton} from 'react-navigation';
import {connect} from 'react-redux';

//TODO control de que viaje visitar dado su estado
//TODO compartir color de la categoria
//TODO comportamiento al finalizar el video
/**
 * @typedef {Object} ParamsNavigation
 * @prop {import('../utils/types').Categoria} categoria
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 *
 * @extends {Component<Props>}
 */
class Categoria extends Component {
  state = {
    /** @type {import('../utils/types').Viaje[]} */
    viajes: [],
    isLoading: true,
  };

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('categoria', {title: 'Categoria'}).titulo,
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    };
  };
  constructor(props) {
    super(props);
    /** @type {import('../utils/types').Categoria} */
    this.categoria = props.navigation.state.params.categoria;
    this.cantViajes = 0;
    console.log(props.categoria);
  }
  componentDidMount = async () => {
    this.props.navigation.addListener('willBlur', () => {
      if (this.player === null) {
        return;
      }
      if (this.player.state.isPlaying) {
        this.player._onPlayPausePressed();
      }
    });
    //TODO cambiar este comportamiento con el redux
    this.props.navigation.addListener('willFocus', async () => {
      const viajes = await API.getViajesCategoria(this.categoria.key, user);
      this.setState({viajes, isLoading: false});
    });
  };

  _goViaje = index => {
    /*let viaje = this.state.viajes[index];
    if (
      viaje.estado === enumStatus.todo &&
      index > 0 &&
      this.state.viajes[index - 1].estado !== enumStatus.done
    ) {
      return;
    }

    viaje.color = this.categoria.color;*/
    const pasos = [
      {
        key: '5e6bd20e-1c4f-48ac-8f62-9a56144dde08',
        titulo: 'Bienvenida',
        color: '#fdd58d',
        tipo: 0,
        contenidos: [
          {
            key: '59c041a7-03a1-4429-93f8-6b106dc515e3',
            imagen:
              'http://okoconnect.com/karim/assets/categorias/categoria-1/comienzaviaje.png',
            texto: 'Bienvenido al módulo\n¿Qué es ser feliz?',
          },
        ],
      },
      {
        key: '5e6bd20e-1c4f-48ac-8f62-9a56144dde08',
        titulo: 'Bienvenida',
        color: '#fdd58d',
        tipo: 0,
        contenidos: [
          {
            key: '254f3b45-b862-441a-be16-4bd1edd8c32b',
            imagen:
              'http://okoconnect.com/karim/assets/categorias/categoria-1/comienzaviaje.png',
            texto: 'Aquí va otro texto para la introduccion',
          },
        ],
      },
      {
        key: 'c3d84de5-f779-40c7-8a01-9f92a57386fa',
        titulo: 'Audio',
        color: '#fdd58d',
        tipo: 1,
        media: 'http://okoconnect.com/karim/viajes/autoestima/1.mp3',
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/audio0.png',
        contenidos: [],
      },
      {
        key: 'c59b7468-3bb1-485f-baa1-231491de8f8c',
        titulo: 'Ejercicios',
        color: '#fdd58d',
        tipo: 4,
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/pasoscategoria.png',
        contenidos: [
          {
            key: '2bcad5ec-abeb-4a74-bb60-bfbe670ddf14',
            imagen:
              'http://okoconnect.com/karim/assets/images/iconMeditar4.png',
            titulo:
              'En una hoja dibuja dos columnas, en la primera escribe 15 éxisto de hábitos diarios.',
          },
          {
            key: '64c32dd1-6b03-4cef-aa7e-e22f8b3ef30d',
            imagen:
              'http://okoconnect.com/karim/assets/images/iconMeditar2.png',
            titulo:
              'En la segunda columna de tu hoja, escribe cómo era tu comportamiento antes del día de hoy.',
          },
          {
            key: '40ec56db-1ab9-4944-96c2-94a045f983f8',
            imagen: 'http://okoconnect.com/karim/assets/images/iconNube.png',
            titulo: 'Usa un lenguaje optimista, sé compresivo contigo mismo.',
          },
        ],
      },
      {
        key: 'dc8bf5ee-65fb-4115-9fb6-9a05584bba40',
        titulo: 'Recomendaciones',
        color: '#fdd58d',
        tipo: 4,
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/pasoscategoria.png',
        contenidos: [
          {
            key: '2bcad5ec-abeb-4a74-bb60-bfbe670ddf14',
            imagen:
              'http://okoconnect.com/karim/assets/images/iconMeditar4.png',
            titulo:
              'En una hoja dibuja dos columnas, en la primera escribe 15 éxisto de hábitos diarios.',
          },
          {
            key: '64c32dd1-6b03-4cef-aa7e-e22f8b3ef30d',
            imagen:
              'http://okoconnect.com/karim/assets/images/iconMeditar2.png',
            titulo:
              'En la segunda columna de tu hoja, escribe cómo era tu comportamiento antes del día de hoy.',
          },
          {
            key: '40ec56db-1ab9-4944-96c2-94a045f983f8',
            imagen: 'http://okoconnect.com/karim/assets/images/iconNube.png',
            titulo: 'Usa un lenguaje optimista, sé compresivo contigo mismo.',
          },
        ],
      },
      {
        key: '3c2de602-bcf5-4028-9ea1-82bd14e9a2f1',
        titulo: 'Cierre',
        color: '#fdd58d',
        tipo: 6,
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/cierre.png',
        contenidos: [],
      },
    ];
    this.props.navigation.navigate('PasoA', {
      steps: pasos,
      position: 0,
    });
  };
  //TODO reiniciar el video al llegar al final
  /** @param {Player} ref*/
  refPlayer = ref => {
    this.player = ref;
  };

  renderListHeader = _ => {
    return (
      <>
        <ScreenBg
          source={{
            uri: this.categoria.imagenPrevia,
          }}
          styleView={[styles.containBG, styles.cover]}
          styleImage={styles.imageBG}
          color={this.categoria.color}>
          <Player
            ref={this.refPlayer}
            source={{
              uri: this.categoria.media,
            }}
            isVideo
            showControls
            showPlayFrame
            styleVideo={styles.video}
          />
        </ScreenBg>
        {!this.state.isLoading && (
          <View>
            <ScalableText style={styles.textoViajes}>
              En esta categoría vas a recorrer {this.state.viajes.length}{' '}
              secciones con una duración total de 10 horas con 22 min.
            </ScalableText>
          </View>
        )}
      </>
    );
  };

  /** @type {import('react-native').ListRenderItem<import('../utils/types').Viaje>} */
  renderItem = ({item, index}) => {
    switch (item.estado) {
      case enumStatus.doing:
        return (
          <ItemBubble
            color={this.categoria.color}
            onPress={() => {
              this._goViaje(index);
            }}
            bold>
            {item.titulo}
          </ItemBubble>
        );
      case enumStatus.done:
        return (
          <ItemBubble
            color={this.categoria.color}
            onPress={() => {
              this._goViaje(index);
            }}
            fill
            bold>
            {item.titulo}
          </ItemBubble>
        );
      default:
        return (
          <ItemBubble
            color={this.categoria.color}
            onPress={() => {
              this._goViaje(index);
            }}
            disable>
            {item.titulo}
          </ItemBubble>
        );
    }
  };

  renderListEmpty = () => {
    return this.state.isLoading ? (
      <ActivityIndicator size="large" color={this.categoria.color} />
    ) : (
      <View>
        <ScalableText style={styles.textoViajes}>
          Amet commodo nulla facilisi nullam vehicula. Lectus proin nibh nisl
          condimentum. Duis ultricies lacus sed turpis tincidunt id. Enim nunc
          faucibus a pellentesque sit amet.{' '}
        </ScalableText>
      </View>
    );
  };
  keyExtractor = item => item.key;

  render() {
    this.categoria = this.props.navigation.state.params.categoria;
    return (
      <SafeAreaView style={styles.safe}>
        <ScreenBg source={{uri: this.categoria.imagenFondo}} color={'#fff'}>
          <View style={styles.container}>
            <FlatList
              ListHeaderComponent={this.renderListHeader}
              data={this.state.viajes}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ListEmptyComponent={this.renderListEmpty}
              style={styles.containerList}
            />
          </View>
        </ScreenBg>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    categoria: state.categoria,
  };
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: 'white'},
  container: {
    width: '100%',
    height: '100%',
  },
  containerList: {
    paddingHorizontal: Dimensions.regularSpace,
    paddingTop: Dimensions.regularSpace,
  },
  imageBG: {
    resizeMode: 'cover',
    borderRadius: 25,
  },
  containBG: {
    borderRadius: 25,
    marginBottom: Dimensions.bigSpace,
  },
  cover: {
    height: 210,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.22,
  },
  video: {
    borderRadius: 10,
  },
  textoViajes: {
    padding: 40,
    color: '#665e61',
    lineHeight: 22,
    textAlign: 'center',
    fontSize: Dimensions.paragraph,
  },
});

export default connect(mapStateToProps)(Categoria)
