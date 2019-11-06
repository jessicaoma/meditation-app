import React, { Component } from 'react';
 
import { StyleSheet, View, Text, Image } from 'react-native';
 
export default class ActionBarImage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: this.props.uri }}
          style={[styles.icon, this.props.style]}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  icon: {
    width: 48,
    height: 34,
    opacity: 0.4,
  },
});