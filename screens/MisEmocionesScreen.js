import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,Button
} from 'react-native';
import { BarChart, Grid, XAxis} from 'react-native-svg-charts'
import ItemBubble from '../components/ItemBubble';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Dimensions from '../constants/Dimensions';
import {HeaderBackButton} from 'react-navigation';
import {LogoEmocion1} from '../constants/LogoEmocion1';
import {LogoEmocion2} from '../constants/LogoEmocion2';
import {LogoEmocion3} from '../constants/LogoEmocion3';
import {LogoEmocion4} from '../constants/LogoEmocion4';

const fill = '#bfc6e2'
const spacingInner = 0.5
const spacingOuter = 0.5

const tiempos = [
  {
    label: 'Tu Semana',
    value: 'semanal',
  },
  {
    label: 'Tu Mes',
    value: 'mensual',
  },
  {
    label: 'Tu Año',
    value: 'anual',
  },
];


export default class MisEmocionesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emocionesData: [4,2,0,1],
      keys: ['excited', 'happy', 'sad', 'depressed'],
      colors: ['#bfc6e2', '#bfc6e2', '#bfc6e2', '#bfc6e2'],
      title: 'Semanal',
    }
  }
  onPressSemanal = () => {
    this.setState({
      emocionesData: [4,2,0,1],
      title: 'Semanal',
    })
  }
  
  onPressMensual = () => {
    this.setState({
      emocionesData: [17,7,4,1],
      title: 'Mensual',
    })
  }

  onPressAnual = () => {
    this.setState({
      emocionesData:[270,32,35,28],
    })
  }


  static navigationOptions = ({navigation}) => ({
    title: 'Mis Emociones',
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
  });

  _handleClick = () => {
    //alert('This is a button!');
    this.props.navigation.navigate('Paso');
  };


  keyExtractor = item => item.id;
  render() {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Image source={{uri: 'http://okoconnect.com/karim/images/misemociones-top.png'}} style={styles.image} />
        <View style={styles.containerButtons}>
          <TouchableOpacity
            onPress={this.onPressSemanal}
            style={[styles.buttonReport]}>
            <Text style={styles.buttonLabel}>Tu semana</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressMensual}
            style={[styles.buttonReport]}>
            <Text style={styles.buttonLabel}>Tu mes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.bigParagraph}>Tu reporte {this.state.title}</Text>

          <View style={{ padding: 20, height: 170 }}>
            <BarChart
                style={styles.barChart}
                keys={ this.state.keys }
                colors={ this.state.colors }
                data={ this.state.emocionesData }
                svg={{fill}}
                contentInset={{ top: 30, }}
            >
            </BarChart>
            <View style={styles.containerLabels}>
              <LogoEmocion1 />
              <LogoEmocion2 />
              <LogoEmocion3 />
              <LogoEmocion4 />
            </View>
          </View>

          <View>
            <Text style={styles.bigTitle}>¡Sigue Así!</Text>
            <Text style={styles.bigParagraph}>
              Esta semana has estado feliz 5 días. Sentir gratitud es tu mejor recompensa.
            </Text>
            <Text style={styles.bigParagraph}>
            Te recomiendo iniciar este viaje que te ayudará a sentirte cada día mejor</Text>
            <ItemBubble
              color={'#fdd58d'}
              status={'done'}
              onPress={this._handleClick}>
              {'Ser Feliz'}
            </ItemBubble>
          </View>
      </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 60,
  },
  container: {
    paddingHorizontal: Dimensions.regularSpace,
    paddingTop: Dimensions.regularSpace,
    //justifyContent: 'center',
  },
  containerLabels: {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 25,
    height: 30,
    paddingHorizontal: 20
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
  barChart: {
    height: 140,
    borderLeftColor: '#cdd2de',
    borderBottomColor: '#cdd2de',
    borderRightColor: '#cdd2de',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
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
    fontSize: 18,
    letterSpacing: 1.11,
    lineHeight: 28,
    marginBottom: 5,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'center',
    paddingHorizontal: Dims.regularSpace,
  },
  image: {
    flex: 1,
    width: '100%',
    height: 350,
    resizeMode: 'cover',
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
});