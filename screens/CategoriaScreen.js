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
 * @prop {string} categoria
 *
 * @typedef Props
 * @prop {import('../utils/types').Categoria} categoria
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class Categoria extends Component {
  state = {
    /** @type {import('../utils/types').Viaje[]} */
    viajes: [],
    isLoading: true,
  };

  /** @param {{navigation : import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>}} props*/
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('categoria', 'Categoria'),
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    };
  };
  constructor(props) {
    super(props);
    /** @type {import('../utils/types').Categoria} */
    this.categoria = props.categoria;
    this.cantViajes = 0;
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
    let viaje = this.state.viajes[index];
    if (
      viaje.estado === enumStatus.todo &&
      index > 0 &&
      this.state.viajes[index - 1].estado !== enumStatus.done
    ) {
      return;
    }

    //viaje.color = this.categoria.color;
    /** @type {import('../utils/types').Paso[]} */
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
              'http://okoconnect.com/karim/assets/categorias/categoria-1/intro-1.png',
            texto: 'Es una experiencia',
            titulo: 'LA FELICIDAD',
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
              'http://okoconnect.com/karim/assets/categorias/categoria-1/intro-2.png',
            texto:
              'Una sensación, un sentimiento, una emoción, un estado de la mente y un estado del ser.',
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
              'http://okoconnect.com/karim/assets/categorias/categoria-1/intro-3.png',
            texto:
              'La felicidad es la experiencia espiritual de vivir cada minuto con amor, gracia y gratitud.',
          },
        ],
      },
      {
        key: 'c3d84de5-f779-40c7-8a01-9f92a57386fa',
        titulo: '¿QUÉ ES LA FELICIDAD?',
        color: '#fdd58d',
        tipo: 1,
        media: 'http://okoconnect.com/karim/assets/meditaciones/meditacion-1/audio.mp3',
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/audio-0.png',
        contenidos: [],
      },
      {
        key: 'dc8bf5ee-65fb-4115-9fb6-9a05584bba40',
        titulo: 'Recomendaciones',
        color: '#fdd58d',
        tipo: 2,
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/recomendaciones-0.png',
        contenidos: [
          {
            key: '2bcad5ec-abeb-4a74-bb60-bfbe670ddf14',
            titulo: 'Acepta',
            texto:
              'La vida te presenta desafíos y experiencias desagradables que son difíciles de soportar. Ante eso puedes decidir: aceptar y aprender o tratar de cambiar esas circunstancias vitales. Si está a tu alcance cambiarlas, hazlo. Afronta aquello que te molesta. Si no puedes cambiarlo, no resistas, no te opongas. Hay cosas que se escapan de tu poder de acción. Entiende que cada prueba es una oportunidad para entrenar tu paciencia y tu capacidad de amar, y para crecer espiritualmente.',
          },
        ],
      },
      {
        key: 'c59b7468-3bb1-485f-baa1-231491de8f8c',
        titulo: 'Ejercicios',
        color: '#fdd58d',
        tipo: 3,
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/ejercicio-0.png',
        contenidos: [
          {
            key: '1',
            titulo: 'Reto Personal',
            texto:
              'Te invito a hacer unos ejercicios para conectarte con tu ser espiritual a través del silencio y la observación detenida de tus pensamientos, sensaciones y emociones.',
          },
        ],
      },
      {
        key: '3c2de602-bcf5-4028-9ea1-82bd14e9a2f1',
        titulo: 'Cierre',
        color: '#fdd58d',
        tipo: 10,
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/cierre-1.png',
        contenidos: [
          {
            titulo: '¡HOLA!',
            texto:
              'Te felicito por haber terminado este primer viaje hacia la felicidad. Espero que tengas claro que si buscas razones para estar triste lo estarás, pero cada vez que buscamos algo porque estar feliz el universo te lo regresa.',
          },
        ],
      },
      {
        key: '3c2de602-bcf5-4028-9ea1-82bd14e9a2f1',
        titulo: 'Cierre',
        color: '#fdd58d',
        tipo: 10,
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/cierre-2.png',
        contenidos: [
          {
            texto:
              'Siempre ten presente que tus expresiones continuas de gratitud y amor son las que te traerán alegría, prosperidad, éxito, satisfacción, abundancia y más amor a tu vida.',
          },
        ],
      },
      {
        key: '3c2de602-bcf5-4028-9ea1-82bd14e9a2f1',
        titulo: 'Cierre',
        color: '#fdd58d',
        tipo: 10,
        imagenFondo:
          'http://okoconnect.com/karim/assets/categorias/categoria-1/cierre-3.png',
        contenidos: [
          {
            texto:
              'No olvides que si con todo lo que tienes no eres feliz, con todo lo que te falta tampoco lo serás.\n\nCon amor y gratitud\nKarim Temple',
          },
        ],
      },
    ];

    viaje.pasos = pasos;
    this.props.dispatch({
      type: 'SET_VIAJE',
      payload: {
        viaje,
      },
    });
    let tipo = pasos[0].tipo;
    this.props.navigation.navigate(`Paso${String.fromCharCode(65 + tipo)}`, {
      position: 0,
      titulo: pasos[0].titulo,
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
        {!this.state.isLoading && (
          <View>
            <ScalableText style={styles.textoViajes}>
              En esta categoría vas a recorrer {this.state.viajes.length + ' '}
              secciones con una duración total de 10 horas con 22 min.
            </ScalableText>
          </View>
        )}
      </>
    );
  };

  renderHeader = _ => {
    return (
      <View style={styles.containerHeader}>
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
      </View>
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
        <ScalableText style={styles.textoVacio}>
          Amet commodo nulla facilisi nullam vehicula. Lectus proin nibh nisl
          condimentum. Duis ultricies lacus sed turpis tincidunt id. Enim nunc
          faucibus a pellentesque sit amet.{' '}
        </ScalableText>
      </View>
    );
  };
  keyExtractor = item => item.key;

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <ScreenBg source={{uri: this.categoria.imagenFondo}} color={'#fff'}>
          <View style={styles.container}>
            {this.renderHeader()}
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
  containerHeader: {
    padding: Dimensions.regularSpace,
  },
  containerList: {
    paddingHorizontal: Dimensions.regularSpace,
    //paddingTop: Dimensions.regularSpace,
  },
  imageBG: {
    resizeMode: 'cover',
    borderRadius: 25,
  },
  containBG: {
    borderRadius: 25,
    //marginBottom: Dimensions.bigSpace,
  },
  cover: {
    height: 210,
    //marginBottom: 10,
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
    paddingTop: 20,
    color: '#665e61',
    lineHeight: 22,
    textAlign: 'center',
    fontSize: Dimensions.paragraph,
  },
  textoVacio: {
    padding: 40,
    color: '#665e61',
    lineHeight: 22,
    textAlign: 'center',
    fontSize: Dimensions.paragraph,
  },
});

export default connect(mapStateToProps)(Categoria);
