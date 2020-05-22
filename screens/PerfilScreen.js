import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform
} from 'react-native';
import Dimensions from '../constants/Dimensions';
import Flecha from '../constants/LogoArrowRight';
import {SvgUri} from 'react-native-svg';
import ScalableText from 'react-native-text';
import TabBarIcon from '../components/TabBarIcon';
import {connect} from 'react-redux';
import {SAVE_USER} from '../reducers/types';

const deviceWidth = Dimensions.window.width;
const headerHeight = deviceWidth * 0.6667 + 10;
const minHeightContainer = (Platform.OS === 'android' ? Dimensions.window.height - deviceWidth * 0.267 + 30 : Dimensions.window.height - deviceWidth * 0.33);
/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Perfil'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Perfil'>} route
 * @prop {import('../utils/types').Usuario} usuario
 * @prop {import('redux').Dispatch} [dispatch]
 * @extends {Component<Props>}
 */
class PerfilScreen extends Component {
  navigateToScreen = route => () => {
    this.props.navigation.navigate(route);
  };

  logout = () => {
    //this.props.navigation.goBack();
    this.props.dispatch({
      type: SAVE_USER,
      payload: {usuario: undefined},
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView style={styles.scrollview}>
          <View style={styles.container}>
            <View style={{minHeight: headerHeight}}>
              <SvgUri
                width={deviceWidth}
                height={headerHeight}
                uri="http://okoconnect.com/karim/assets/perfil/header-perfil.svg"
                style={{marginTop: -5}}
              />
              <View style={styles.headerContainer}>
                <ScalableText style={styles.headerText}>
                  {/* Evelin Giraldo */}
                  {this.props?.usuario?.name ?? ''}
                </ScalableText>
              </View>
            </View>
            <View style={styles.itemsContainer}>
              <View style={[styles.itemStyle]}>
                <TabBarIcon name={'MisEmociones'} />
                <ScalableText
                  style={[styles.labelStyle]}
                  onPress={this.navigateToScreen('MisEmociones')}>
                  Mis Emociones
                </ScalableText>
                <Flecha />
              </View>
              <View style={[styles.itemStyle]}>
                <TabBarIcon name={'ViajesCompletados'} />
                <ScalableText
                  style={[styles.labelStyle]}
                  onPress={this.navigateToScreen('ViajesCompletadosStack')}>
                  Módulos Finalizados
                </ScalableText>
                <Flecha />
              </View>
              <View style={[styles.itemStyle]}>
                <TabBarIcon name={'MisMeditaciones'} />
                <ScalableText
                  style={[styles.labelStyle]}
                  onPress={this.navigateToScreen('MisMeditaciones')}>
                  Mis Meditaciones
                </ScalableText>
                <Flecha />
              </View>
              <View style={[styles.itemStyle]}>
                <TabBarIcon name={'Salir'} />
                <ScalableText style={[styles.labelStyle]} onPress={this.logout}>
                  Cerrar Sesión
                </ScalableText>
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={this.navigateToScreen('Suscribete')}
                style={{}}>
                <SvgUri
                  width={deviceWidth}
                  height={deviceWidth * 0.27}
                  uri="http://okoconnect.com/karim/assets/perfil/footer-perfil.svg"
                />
                <ScalableText style={styles.footerText}>
                  SUSCRíbete
                </ScalableText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    usuario: state.usuario,
  };
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollview: {
    flex: 1,
    height: '100%',
  },
  container: {
    minHeight: minHeightContainer,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  headerContainer: {
    minHeight: deviceWidth * 0.666667,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    flexWrap: 'wrap',
    bottom: 15,
  },
  headerText: {
    fontFamily: 'Kiona',
    fontSize: 22,
    color: '#7883a4',
    textAlign: 'center',
    textTransform: 'uppercase',
    flex: 1,
    position: 'absolute',
  },
  itemsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  itemStyle: {
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 18,
    lineHeight: 18,
    marginLeft: 20,
    textAlign: 'left',
    fontFamily: 'MyriadPro-Regular',
    color: '#85787b',
    flex: 1,
    paddingTop: 24,
    paddingBottom: 20,
  },
  footer: {
    //resizeMode: 'cover',
  },
  footerText: {
    fontFamily: 'Kiona',
    fontSize: 25,
    color: '#ffffff',
    textAlign: 'center',
    textTransform: 'uppercase',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 20,
    flex: 1,
  },
});

export default connect(mapStateToProps)(PerfilScreen);
