import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {BarChart} from 'react-native-svg-charts';
import ItemBubble from '../components/ItemBubble';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import Dimensions from '../constants/Dimensions';
import {HeaderBackButton} from 'react-navigation';
import LogoEmocion1 from '../constants/LogoEmocion1';
import LogoEmocion2 from '../constants/LogoEmocion2';
import LogoEmocion3 from '../constants/LogoEmocion3';
import LogoEmocion4 from '../constants/LogoEmocion4';
import LogoPerfil from '../constants/LogoPerfil';
import {enumStatus} from '../utils/types';


export default class MisEmocionesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emocionesData: [3, 2, 0, 1, 1],
      keys: ['excited', 'happy', 'sad', 'depressed'],
      colors: ['#bfc6e2', '#bfc6e2', '#bfc6e2', '#bfc6e2'],
      title: 'Semanal',
      yAxis: [{
                value: 0,
                label: '0',
            },
            {
                value: 7,
                label: '7',
            },]
    };
  }
  onPressSemanal = () => {
    this.setState({
      emocionesData: [3, 2, 0, 1, 1],
      title: 'Semanal',
      yAxis: [{
                value: 0,
                label: '0',
            },
            {
                value: 7,
                label: '7',
            },]
    });
  };

  onPressMensual = () => {
    this.setState({
      emocionesData: [14, 7, 4, 1, 3],
      title: 'Mensual',
      yAxis: [{
                value: 0,
                label: '0',
            },
            {
                value: 30,
                label: '30',
            },]
    });
  };

  onPressAnual = () => {
    this.setState({
      emocionesData: [250, 32, 35, 28, 20],
    });
  };

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
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Image
          source={{
            uri: 'http://okoconnect.com/karim/images/misemociones-top-crop.png',
          }}
          style={styles.image}
        />
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

          <View style={styles.barChartContainer}>

              <View style={styles.containerYaxis}>
                <Text style={styles.textYAis}>{this.state.yAxis[1].label}</Text>
                <Text style={styles.textYAis}>{this.state.yAxis[0].label}</Text>
              </View>
              <BarChart
                style={styles.barChart}
                data={this.state.emocionesData}
                svg={{fill: '#bfc6e2'}}
                contentInset={{top: 30}}
              />

            <View style={styles.containerLabels}>
              <LogoEmocion1 />
              <LogoEmocion2 />
              <LogoEmocion3 />
              <LogoEmocion4 />
              <LogoPerfil />
            </View>
          </View>

          <View>
            <Text style={styles.bigTitle}>¡Sigue así!</Text>
            <Text style={styles.bigParagraph}>
              Esta semana has estado feliz 5 días. Sentir gratitud es tu mejor recompensa.
            </Text>
            <Text style={styles.bigParagraph}>
              Te recomiendo iniciar este viaje que te ayudará a sentirte cada
              día mejor
            </Text>
            <ItemBubble
              color={'#fdd58d'}
              status={enumStatus.done}
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
    paddingHorizontal: 20,
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
    height: 140,
    justifyContent: 'space-between',
    color: Colors.gray,
    position: 'absolute',
    marginTop: 12,
    left: 5,
  },
  barChartContainer: {padding: 20, height: 170},
  barChart: {
    height: 140,
    borderLeftColor: '#cdd2de',
    borderBottomColor: '#cdd2de',
    //borderRightColor: '#cdd2de',
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
  }
});