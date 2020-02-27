import React, {Component} from 'react';
import {StyleSheet, Image, View, SafeAreaView, ScrollView} from 'react-native';
import Dims from '../constants/Dimensions';
import LogoPremio from '../constants/LogoPremio';
import LogoReloj from '../constants/LogoReloj';
import ScalableText from 'react-native-text';
import colors from '../constants/Colors';
import API, {user} from '../utils/API';
/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 * @extends {Component<Props>}
 */
export default class MisMeditacionesScreen extends Component {
  static navigationOptions = {};
  state = {
    progreso: 0,
    completadas: 0,
  };
  async componentDidMount() {
    const data = await API.getMeditacionesCompletadas(user);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState(data);
  }

  _keyExtractor = item => item.id;

  render = () => (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Image
          resizeMode="cover"
          source={{
            uri:
              'http://okoconnect.com/karim/assets/images/mis-meditaciones-header.png',
          }}
          style={styles.image}
        />
        <View style={styles.container}>
          <View style={styles.container}>
            <View>
              <ScalableText style={styles.purpleTitle}>Mi record</ScalableText>
            </View>

            <View style={styles.inforowtitle}>
              <LogoReloj />
              <ScalableText style={styles.bigParagraph}>
                Tiempo total meditado
              </ScalableText>
            </View>

            <View style={styles.inforow}>
              <ScalableText style={styles.bigTitle}>
                {this.state.progreso}
              </ScalableText>
              <ScalableText style={styles.purpleTitle}>HORAS</ScalableText>
            </View>

            <View style={styles.inforowtitle}>
              <LogoPremio />
              <ScalableText style={styles.bigParagraph}>
                Sesiones completadas
              </ScalableText>
            </View>

            <View style={styles.inforow}>
              <ScalableText style={styles.bigTitle}>
                {this.state.completadas}
              </ScalableText>
              <ScalableText style={styles.purpleTitle}>SESIONES</ScalableText>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Dims.bigSpace,
  },
  purpleTitle: {
    fontSize: Dims.paragraph,
    color: colors.meditacion,
    fontFamily: 'MyriadPro-Regular',
    textAlign: 'left',
    marginBottom: 20,
  },

  inforowtitle: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginBottom: 0,
  },
  inforow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'center',
    marginBottom: 20,
    paddingVertical: 0,
    paddingLeft: 50,
  },
  bigTitle: {
    fontSize: 35,
    lineHeight: 35,
    padding: 0,
    marginRight: 20,
    color: '#8E92A6',
    fontFamily: 'MyriadPro-Bold',
    textAlign: 'left',
  },
  bigParagraph: {
    color: '#ABA0B5',
    fontSize: 14,
    marginLeft: 20,
  },
  image: {
    flex: 1,
    width: Dims.window.width,
    height: Dims.window.width - 30,
  },
});
