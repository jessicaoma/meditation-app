import React, {Component} from 'react';
import {StatusBar, SafeAreaView, Text, Button, StyleSheet} from 'react-native';

export default class AngelCartasScreen extends Component {
  static navigationOptions = {
    title: 'Tu ángel',
    header: null,
  };
  _handleClick = () => {
    //alert('This is a button!2');
    this.props.navigation.navigate('Angel');
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Text>Tu ángel del día</Text>
          <Button onPress={this._handleClick} title="carta 1" />
          <Button onPress={this._handleClick} title="carta 2" />
          <Button onPress={this._handleClick} title="carta 3" />
          <Button onPress={this._handleClick} title="carta 4" />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});