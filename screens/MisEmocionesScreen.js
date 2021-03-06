import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import {BarChart} from 'react-native-svg-charts';
import ItemBubble from '../components/ItemBubble';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Dimensions from '../constants/Dimensions';
import LogoEmocion1 from '../constants/LogoEmocion1';
import LogoEmocion2 from '../constants/LogoEmocion2';
import LogoEmocion3 from '../constants/LogoEmocion3';
import LogoEmocion4 from '../constants/LogoEmocion4';
import API from '../utils/API';
import ScalableText from 'react-native-text';
import {connect} from 'react-redux';

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'MisEmociones'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'MisEmociones'>} route
 * @prop {import('../utils/types').Usuario} usuario
 * @extends {Component<Props>}
 */
class MisEmocionesScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Mis emociones',
  });

  constructor(props) {
    super(props);
    this.state = {
      emocionesData: [0, 0, 0, 0],
      //a, t, i, m
      keys: ['Alegría', 'Tristeza', 'Ira', 'Miedo'],
      colors: ['#bfc6e2', '#bfc6e2', '#bfc6e2', '#bfc6e2'],
      yAxis: [{}, {}, {}],
    };
    this.semana = [0, 0, 0, 0];
    this.mes = [0, 0, 0, 0];
    this.mensaje = '';
  }
  onPressSemanal = () => {
    this.setState({
      emocionesData: this.semana, //[3, 2, 0, 2],
      title: 'semanal',
      yAxis: [
        {
          value: 0,
          label: '0',
        },
        {
          value: 3.5,
          label: '3.5',
        },
        {
          value: 7,
          label: '7',
        },
      ],
      dias: 7,
    });
  };

  componentDidMount = async () => {
    const registros = await API.getRegistroEmociones(this.props.usuario.token);
    this.semana = registros.semana;
    this.mensaje = registros.mensaje;
    this.onPressSemanal();
  };

  _handleClickCursos = () => {
    this.props.navigation.navigate('Main', {screen: 'Categorias'});
  };

  _handleClickMeditaciones = () => {
    this.props.navigation.navigate('Main', {screen: 'Meditar'});
  };

  keyExtractor = item => item.id;
  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Image
            source={{
              uri:
                'http://okoconnect.com/karim/images/misemociones-top-crop.png',
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.containerButtons}>
            <TouchableOpacity
              onPress={this.onPressSemanal}
              style={[styles.buttonReport]}>
              <Text style={styles.buttonLabel}>Tu semana</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <Text style={styles.bigParagraph}>
              Tu reporte {this.state.title}
            </Text>

            <View style={styles.barChartContainer}>
              <View style={styles.containerYaxis}>
                <Text style={styles.textYAis}>{this.state.yAxis[2].label}</Text>
                <Text style={styles.textYAisInter}>
                  {this.state.yAxis[1].label}
                </Text>
                <Text style={styles.textYAis}>{this.state.yAxis[0].label}</Text>
              </View>
              <BarChart
                style={styles.barChart}
                data={this.state.emocionesData}
                svg={{fill: '#bfc6e2'}}
                //contentInset={{top: 30}}
                gridMin={0}
                gridMax={this.state.dias}
              />
              <View style={styles.containerLabels}>
                <View style={styles.containerLabelsChild}>
                  <Text style={styles.textTitleGraph}>
                    {this.state.keys[0]}
                  </Text>
                  <LogoEmocion1 />
                </View>
                <View style={styles.containerLabelsChild}>
                  <Text style={styles.textTitleGraph}>
                    {this.state.keys[1]}
                  </Text>
                  <LogoEmocion3 />
                </View>
                <View style={styles.containerLabelsChild}>
                  <Text style={styles.textTitleGraph}>
                    {this.state.keys[2]}
                  </Text>
                  <LogoEmocion2 />
                </View>
                <View style={styles.containerLabelsChild}>
                  <Text style={styles.textTitleGraph}>
                    {this.state.keys[3]}
                  </Text>
                  <LogoEmocion4 />
                </View>
              </View>
            </View>

            <View>
              <ScalableText style={styles.bigParagraph}>
                {this.mensaje}
              </ScalableText>
            </View>
            <View>
              <ItemBubble
                color={'#fdd58d'}
                fill
                bold
                onPress={this._handleClickCursos}>
                Ir a Cursos
              </ItemBubble>
              <ItemBubble
                color={Colors.primaryDark}
                fill
                bold
                likeButton
                onPress={this._handleClickMeditaciones}>
                Ir a Meditaciones
              </ItemBubble>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    usuario: state.usuario,
  };
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: 'white'},
  container: {
    paddingHorizontal: Dimensions.regularSpace,
    paddingTop: Dimensions.regularSpace,
    paddingBottom: Dimensions.hugeSpace,
  },
  containerLabels: {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 25,
    height: 30,
    paddingHorizontal: 10,
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 100,
    right: 20,
    top: 20,
  },
  containerYaxis: {
    width: 20,
    height: 160,
    justifyContent: 'space-between',
    color: Colors.gray,
    position: 'absolute',
    marginTop: 16,
    left: -5,
  },
  barChartContainer: {padding: 20, height: 260},
  barChart: {
    height: 160,
    borderLeftColor: '#cdd2de',
    borderBottomColor: '#cdd2de',
    //borderRightColor: '#cdd2de',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  bigTitle: {
    fontSize: 22,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dims.regularSpace,
    marginRight: 0,
    marginHorizontal: 20,
    marginLeft: 0,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Bold',
    textAlign: 'center',
    paddingTop: 40,
  },
  bigParagraph: {
    fontSize: 16,
    letterSpacing: 1.11,
    lineHeight: Dimensions.viajeParrafoLineHeight,
    marginBottom: 5,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'left',
    paddingHorizontal: Dims.regularSpace,
  },
  image: {
    flex: 1,
    width: '100%',
    height: Dimensions.window.width,
    resizeMode: 'contain',
  },
  buttonReport: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 5,
    padding: 6,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  buttonLabel: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 12,
    color: 'white',
    lineHeight: 12,
  },
  textYAis: {
    fontSize: 13,
    color: Colors.gray,
    textAlign: 'right',
  },
  textYAisInter: {
    fontSize: 11.5,
    color: Colors.gray,
    textAlign: 'right',
  },
  containerLabelsChild: {
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  textTitleGraph: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 12,
    color: '#aba0b5',
    marginBottom: 5,
  },
});

export default connect(mapStateToProps)(MisEmocionesScreen);
