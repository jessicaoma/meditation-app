import React, {Component} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import ItemBubble from '../components/ItemBubble';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Dimensions from '../constants/Dimensions';
import API, {user} from '../utils/API';
import ScalableText from 'react-native-text';
import {connect} from 'react-redux';
import {HeaderBackButton} from '@react-navigation/stack';

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'ViajesCompletados'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'ViajesCompletados'>} route
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class ViajeCompletadosScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Módulos Finalizados',
    headerLeft: props => (
      <HeaderBackButton {...props} onPress={() => navigation.goBack()} />
    ),
  });
  state = {
    /** @type {import("../utils/types").Viaje[]} */
    viajes: [],
    isLoading: true,
  };
  componentDidMount = async () => {
    const viajes = await API.getViajesCompletados(user);
    this.setState({viajes, isLoading: false});
  };

  /** @param {import("../utils/types").Viaje} viaje*/
  _handleClick = viaje => {
    this.props.dispatch({
      type: 'SET_CATEGORIA',
      payload: {
        categoria: undefined,
      },
    });
    this.props.dispatch({
      type: 'SET_MODULOS',
      payload: {
        viajes: [viaje],
      },
    });
    this.props.navigation.navigate('PasoA', {
      position: 0,
      viajeIndex: 0,
    });
  };

  /** @param {import('react-native').ListRenderItemInfo<import('../utils/types').Viaje>} item*/
  renderItem = ({item, index}) => {
    return (
      <View
        style={{
          paddingHorizontal: Dimensions.regularSpace,
          paddingTop: index === 0 ? Dimensions.regularSpace : 0,
        }}>
        <ItemBubble
          color={item.color}
          fill
          onPress={() => {
            this._handleClick(item);
          }}>
          {item.titulo}
        </ItemBubble>
      </View>
    );
  };
  keyExtractor = item => item.key.toString();
  renderListEmpty = () => {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color={Colors.primaryDark} />;
    } else {
      return (
        <ScalableText style={styles.bigParagraph}>
          Aún no has finalizado ningún módulo de los cursos.{'\n\n'}
          ¡Anímate a recorrer el curso de tu preferencia!
        </ScalableText>
      );
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <FlatList
          data={this.state.viajes}
          renderItem={this.renderItem}
          ListHeaderComponent={() => (
            <>
              <Image
                resizeMode="cover"
                source={{
                  uri:
                    'http://okoconnect.com/karim/assets/images/viajes-completados.png',
                }}
                style={styles.image}
              />
              {!this.state.isLoading && this.state.viajes.length > 0 && (
                <>
                  <ScalableText style={styles.bigTitle}>
                    ¡Vas muy bien!
                  </ScalableText>
                  <ScalableText style={styles.bigParagraph}>
                    Has completado los siguientes módulos. Si deseas consultar
                    nuevamente el contenido, presiona sobre el módulo de
                    interés.
                  </ScalableText>
                </>
              )}
            </>
          )}
          ListEmptyComponent={this.renderListEmpty}
          keyExtractor={this.keyExtractor}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#fff'},
  scrollView: {},
  container: {},
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
    lineHeight: Dims.viajeParrafoLineHeight,
    marginBottom: 5,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'left',
    paddingHorizontal: Dims.bigSpace,
  },
  image: {
    flex: 1,
    width: Dims.window.width,
    height: Dims.window.width * 0.8,
  },
});

export default connect(null)(ViajeCompletadosScreen);
