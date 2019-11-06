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
          style={{
            width: 48,
            height: 34,
            opacity: 0.4,
          }}
        />
      </View>
    );
  }
}