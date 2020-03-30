import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import API, {user} from '../utils/API';
import {enumStatus} from '../utils/types';
import dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import LogoPlayVideo from '../constants/LogoPlayVideo';
import ScalableText from 'react-native-text';
const screenWidth = dimensions.window.width;
const screenHeight = dimensions.window.height - dimensions.statusBarHeight;
/**
 * Paso Tipo(B): Teoría
 * @typedef {Object} ParamsNavigation
 * @prop {import('../utils/types').Paso[]} steps
 * @prop {number} position
 *
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{params:ParamsNavigation}>} navigation
 *
 * @extends {Component<Props>}
 */
export default class PasoBScreen extends Component {
  static navigationOptions = ({navigation}) => {
    /** @type {ParamsNavigation} */
    const {steps, position} = navigation.state.params;
    return {
      //title: steps[position].titulo,
      header: null,
    };
  };

  componentDidMount = async () => {
    const {steps, position} = this.props.navigation.state.params;
    const paso = steps[position];
    API.putDiarioPaso(paso.key, enumStatus.doing, null, user);
  };

  nextStep = () => {
    const {steps, position} = this.props.navigation.state.params;
    const {tipo} = steps[position + 1];
    const paso = steps[position];
    API.putDiarioPaso(paso.key, enumStatus.done, null, user);
    // @ts-ignore
    this.props.navigation.replace(`Paso${String.fromCharCode(65 + tipo)}`, {
      steps,
      position: position + 1,
    });
  };

  render() {
    const {steps, position} = this.props.navigation.state.params;
    return (
      <SafeAreaView style={[styles.safe, {backgroundColor: 'white'}]}>
        <TouchableOpacity style={{flex: 1}} onPress={this.nextStep}>
          <ScreenBg
            source={{uri: steps[position].imagenFondo}}
            //color={steps[position].color}
            color="white"
            styleImage={{resizeMode: 'cover'}}>
            <Player
              source={{
                uri: steps[position].media,
              }}
              //showPlayFrame
              //showControls
              onEnd={this.nextStep}
            />
            <View style={styles.container1}>
              <ScalableText style={styles.headline}>{steps[position].titulo}</ScalableText>
              <View style={{marginTop: 30}}>
                <LogoPlayVideo />
              </View>
            </View>
          </ScreenBg>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingTop: dimensions.statusBarHeight,
  },
  container1: {
    width: screenHeight,
    top: screenHeight / 2,
    position: 'absolute',
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  headline: {
    fontFamily: 'MyriadPro-Regular',
    fontSize: 26,
    lineHeight: 48,
    textAlign: 'center',
    color: '#85787b', //Colors.primaryDark,
    letterSpacing: 2.2,
    marginBottom: 30,
    //marginTop: -40,
    //paddingHorizontal: dimensions.regularSpace,
  },
});
