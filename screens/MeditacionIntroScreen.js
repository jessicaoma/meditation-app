import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import ScreenBg from '../components/screenBg';
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
    let meditacion = navigation.getParam('meditacion', {titulo: 'Meditación'});
    return {title: meditacion.titulo, headerBackTitle: null};
  };

  constructor(props) {
    super(props);
    /** @type {import('../utils/types').Meditación} */
    this.meditacion = props.navigation.getParam('meditacion', {});
  }

  goPlayerMeditar = isIntro => {
    this.props.navigation.replace('Meditacion', {
      meditacion: this.meditacion,
      isIntro,
    });
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <ScreenBg
            source={{uri: this.meditacion.imagenIntro}}
            color={'white'}
            // eslint-disable-next-line react-native/no-inline-styles
            styleImage={{resizeMode: 'cover'}}>
            <View style={styles.container}>
              <View style={styles.subcontainer}>
                
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: Colors.primaryDark}]}
                  onPress={() => {
                    this.goPlayerMeditar(true);
                  }}>
                  <ScalableText style={styles.title_boxes}>
                    Prepárate para meditar
                  </ScalableText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: Colors.primaryDark}]}
                  onPress={() => {
                    this.goPlayerMeditar(false);
                  }}>
                  <ScalableText style={styles.title_boxes}>
                    Comenzar meditación
                  </ScalableText>
                </TouchableOpacity>
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
    backgroundColor: Colors.second,
    borderRadius: 30,
    alignSelf: 'stretch',
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    height: 50,
    marginBottom: 15,
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
