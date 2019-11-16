import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet, FlatList, ScrollView, View} from 'react-native';
import Button from '../components/Buttom';
import ScreenBg from '../components/screenBg';
import ItemBubbleLine from '../components/ItemBubbleLine';
import Colors from '../constants/Colors';
import Dims from '../constants/Dimensions';
var viaje = {};

export default class ViajeScreen extends Component {
  static navigationOptions = {
    title: '¿Qué es ser Feliz?',
  };

  _handleClick = () => {
    //alert('This is a button!');
    this.props.navigation.navigate('Paso');
  };
  renderItem = ({item}) => {
    return (
      <>
        {item.title !== undefined ? (
          <ItemBubbleLine
            color={viaje.color}
            status={item.status}
            onPress={this._goViaje}>
            {item.title}
          </ItemBubbleLine>
        ) : (
          <ItemBubbleLine
            color={viaje.color}
            status={item.status}
            onPress={this._goViaje}>
            {item.title}
          </ItemBubbleLine>
        )}
      </>
    );
  };
  
  renderSeparator = () => {
    let styleStatus = {};
    let {color, status, onPress} = this.props;
    if (status === 'done') {
      styleStatus = StyleSheet.create({
        styleLine: {
          backgroundColor: color,
        },
      });
    }
    else if (status === 'doing') {
      styleStatus = StyleSheet.create({
        styleLine: {
          backgroundColor: Colors.borderWhite,
        }, 
      });
    }
    else if (status === 'viajeTitle') {
      styleStatus = StyleSheet.create({
        styleLine: {
          backgroundColor: Colors.color,
          height: 20,
        }, 
      });
    }
    return (
      <View style={[styles.containerLine]}>
        <View style={[styles.line, styleStatus.styleLine]} />
      </View>
    );
  };

  keyExtractor = item => item.id.toString() + 'viaje';
  render() {
    viaje = {
      id: 1,
      title: 'Ser Feliz',
      viajes: [
        {
          id: 1,
          title: 'Highlight',
          status: 'done',
        },
        {
          id: 2,
          title: 'Teoría 1',
          status: 'todo',
        },
        {
          id: 3,
          title: 'Reflexiones',
          status: 'todo',
        },
        {
          id: 4,
          title: 'Ejercicio',
          status: 'todo',
        },
        {
          id: 5,
          title: 'Recomendaciones',
          status: 'todo',
        },
        {
          id: 6,
          title: 'Diario',
          status: 'todo',
        },
        {
          id: 7,
          title: 'Cierre',
          status: 'todo',
        },
      ],
      color: this.props.navigation.getParam('bg', '#fdd58d'),
      bgImg: 'http://okoconnect.com/karim/images/viaje-bg-2.png',
    };
    viaje.viajes.unshift({
      id: 'cover',
      source: {uri: viaje.cover},
      color: viaje.color,
      status: 'viajeTitle',
      title: '¿Qué es ser feliz?'
    });

    return (
      <>
      <ScreenBg source={{uri: viaje.bgImg}} color={viaje.color}>
      <View style={styles.statusBar} />
        <ScrollView style={styles.container}>
          
          <FlatList
              data={viaje.viajes}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              style={styles.container}
              ItemSeparatorComponent={this.renderSeparator}
            />
        </ScrollView>
        <TouchableOpacity
          onPress={this.handleLogin}
          style={[styles.button]}>
          <Text style={styles.buttonLabel}>Continuar mi viaje</Text>
        </TouchableOpacity>
      </ScreenBg>
    </>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    height: '100%',
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
  },
  buttonLabel: {
    color: 'white',
    fontSize: Dims.window.width * 0.041,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.5,
    lineHeight: 50,
    fontFamily: 'MyriadPro-Regular',
  },
  containerLine: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 15,
    width: 3,
    margin: 'auto',
    backgroundColor: Colors.borderWhite,
  },
});
