import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import Buttom from '../components/Buttom';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import ScalableText from 'react-native-text';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp<{param:{meditacion:import('../utils/types').Meditación}}>} navigation
 * @extends {Component<Props>}
 */
export default class MeditacionIntroScreen extends Component {
  static navigationOptions = ({navigation}) => {
    /** @type {import('../utils/types').Meditación} */
    let meditacion = navigation.getParam('meditacion', {title: 'Meditación'});
    return {title: meditacion.titulo, headerBackTitle: null};
    this.meditacion = navigation.getParam('meditacion', {title: 'Meditación'});
  };

  constructor(props) {
    super(props);
    /** @type {import('../utils/types').Categoria} */
    
  }

  /** @type {Player} */
  audio = null;

  refAudio = ref => {
    this.audio = ref;
  };

  _handleClick = item => {
    this.props.navigation.navigate('Meditacion', {
      meditacion: this.meditacion,
    });
  };


  render() {
    const {navigation} = this.props;
    /** @type {import('../utils/types').Meditación} */
    let meditacion = navigation.getParam('meditacion', {});
    this.meditacion = navigation.getParam('meditacion', {title: 'Meditación'});
    /** @param {import('../utils/types').Meditación} item */
	  

    return (
      <>
        <SafeAreaView>
          <ScreenBg
            source={{uri: meditacion.imagenIntro}}
            color={'white'}
            styleImage={{resizeMode: 'cover'}}>

            <View style={styles.container}>
            	<View style={styles.subcontainer}>
	              <ScalableText style={styles.sectionTitle}>{meditacion.titulo}</ScalableText>
	              <Buttom
	                style={[ styles.button, {backgroundColor:  Colors.primaryDark},
	                ]}
	                onPress={() => {this._handleClick();}}>
	                <ScalableText style={styles.title_boxes}>Prepárate para meditar</ScalableText>

	              </Buttom>
	              <Buttom
	                style={[
	                  styles.button,
	                  {backgroundColor: Colors.primaryDark},
	                ]}
	                onPress={() => {this._handleClick();}}>
	                <ScalableText style={styles.title_boxes}>Comenzar meditación</ScalableText>

	              </Buttom>
	            </View>
            </View>
          </ScreenBg>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: Dims.h2,
    letterSpacing: 1.11,
    lineHeight: 36,
    marginTop: Dims.regularSpace,
    marginRight: 0,
    marginBottom: 3,
    marginLeft: 0,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Bold',
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 40,
  },
  subcontainer: {
  	flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    paddingBottom: Dims.regularSpace,
    width: '90%',
  },
  title_boxes: {
    color: 'white',
    fontSize: Dims.bubbleTitle,
    letterSpacing: Dims.bubbleTitleSpacing,
    lineHeight: 16,
    textTransform: 'uppercase',
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'MyriadPro-Regular',
    maxWidth: '100%',
    textAlign: 'center',
  },
});