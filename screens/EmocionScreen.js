import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
import {Ionicons} from '@expo/vector-icons';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class Emocion extends Component {
  render() {
    return (
      <>
        <SafeAreaView style={{flex:1,paddingBottom: 30}}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.container}>
              <Text style={styles.bigTitle}>Alegría</Text>
              <Text style={styles.bigParagraph}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit feugiat
                id varius, laoreet ultrices vitae mi per class rhoncus aliquet
                nostra, natoque.
              </Text>
              <View style={{flex: 1}}>
                <Image
                  style={{
                    width: Dims.window.width - Dims.regularSpace,
                    height: Dims.window.width - Dims.regularSpace,
                  }}
                  source={{
                    uri: 'http://okoconnect.com/karim/images/oracion.jpeg',
                  }}
                />
              </View>
              <Text style={styles.paragraph}>
                Antes de salir de la cama asegúrate de establecer la intención
                para el día que acaba de comenzar, perdónate por los errores de
                ayer, agradece y reza. Estes en problemas o no “Reza”. La
                oración es la herramienta que te ayuda a enfrentar mejor las
                dificultades.
                {'\n'}Feliz Sábado ✨
              </Text>
              <TouchableOpacity 
                style={{flex:1,justifyContent:'center',alignItems:'center',marginBottom: 60}}>
                  <Text style={styles.shareText}>Compartir</Text>
                  <Ionicons
                    name={'md-share'}
                    size={35}
                    style={styles.share}
                  />
            </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: Dims.regularSpace,
    paddingTop: Dims.regularSpace,
  },
  container: {
    flex: 1,
    paddingHorizontal: Dims.regularSpace,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
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
  },
  paragraph: {
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 22,
    marginBottom: 50,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'center',
    paddingHorizontal: Dims.smallSpace,
  },
  bigParagraph: {
    fontSize: 18,
    letterSpacing: 1.11,
    lineHeight: 24,
    marginBottom: 5,
    color: Colors.gray,
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'center',
    paddingHorizontal: Dims.regularSpace,
  },
  shareText: {
    color: Colors.gray,
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'center',
    letterSpacing: 1.2
  },
  share: {
    color: Colors.primary,
  },
});