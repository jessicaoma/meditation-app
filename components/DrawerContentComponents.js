
import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, Image } from 'react-native';
import Dimensions from '../constants/Dimensions';

export default class drawerContentComponents extends Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer} onPress={this.navigateToScreen('Main')}>
          <Text 
          style={styles.headerText} 
          onPress={this.navigateToScreen('Main')}>Janett Ramirez</Text>
        </View>
        <View style={styles.screenContainer}>
          <View style={
            [styles.screenStyle, 
            (this.props.activeItemKey=='MisEmociones') ? styles.activeBackgroundColor : null]
            }>
              <Image
                source={{uri: 'http://okoconnect.com/karim/assets/images/menuPerfil/emociones.png'}}
                style={styles.icon} />
              <Text 
                style={[styles.screenTextStyle, (this.props.activeItemKey=='MisEmociones') ? styles.selectedTextStyle : null]} 
                onPress={this.navigateToScreen('MisEmociones')}>Mis Emociones</Text>
          </View>
          <View style={
            [styles.screenStyle, 
            (this.props.activeItemKey=='ViajesCompletados') ? styles.activeBackgroundColor : null]}>
              <Image
                source={{uri: 'http://okoconnect.com/karim/assets/images/menuPerfil/viajescompletados.png'}}
                style={styles.icon} />
              <Text 
              style={[styles.screenTextStyle, (this.props.activeItemKey=='ViajesCompletados') ? styles.selectedTextStyle : null]} 
              onPress={this.navigateToScreen('ViajesCompletados')}>Viajes Completados</Text>
          </View>
          <View style={
            [styles.screenStyle, 
            (this.props.activeItemKey=='MiDiario') ? styles.activeBackgroundColor : null]}>
              <Image
                source={{uri: 'http://okoconnect.com/karim/assets/images/menuPerfil/diario.png'}}
                style={styles.icon} />
              <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='MiDiario') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('MiDiario')}>Mi Diario</Text>
          </View>
          <View style={
            [styles.screenStyle, 
            (this.props.activeItemKey=='MisMeditaciones') ? styles.activeBackgroundColor : null]}>
            <Image
                source={{uri: 'http://okoconnect.com/karim/assets/images/menuPerfil/meditaciones.png'}}
                style={styles.icon} />
            <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='MisMeditaciones') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('MisMeditaciones')}>Mis Meditaciones</Text>
          </View>
          <View style={
            [styles.screenStyle, 
            (this.props.activeItemKey=='Premium2') ? styles.activeBackgroundColor : null]}>
            <Image
                source={{uri: 'http://okoconnect.com/karim/assets/images/menuPerfil/premium.png'}}
                style={styles.icon} />
            <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Premium2') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Premium2')}>Conviertete en Premium</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingTop: Dimensions.regularSpace,
    },
    headerContainer: {
        minHeight: 68,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent: 'center',
        marginTop: 10,
        borderBottomColor: 'rgba(115, 115, 115, 0.5)',
        borderLeftColor: 'white',
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderWidth: 1,
        alignSelf: 'center',
    },
    headerText: {
        fontFamily: 'SFProText-Medium',
        fontSize: Dimensions.window.width * 0.06,
        color: '#494c6b',
    },
    screenContainer: { 
        padding: 20,
        width: '100%',
    },
    screenStyle: {
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
    },
    screenTextStyle:{
        fontSize: Dimensions.window.width * 0.038,
        marginLeft: 20, 
        textAlign: 'left',
        fontFamily: 'MyriadPro-Regular',
        color: '#665e61',
        height: 50,
        flex: 1,
        alignItems: 'flex-start',
        paddingVertical: 5,
    },
    selectedTextStyle: {
        fontFamily: 'MyriadPro-Medium',
        color: '#8088a5',
        height: 50,
        paddingVertical: 5,
    },
    activeBackgroundColor: {
        backgroundColor: '#f3f3f3'
    },
    icon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
    },
});