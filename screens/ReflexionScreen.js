import React, {Component} from 'react';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import {SafeAreaView, StyleSheet} from 'react-native';

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Reflexion'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Reflexion'>} route
 * @extends {Component<Props>}
 */
export default class ReflexionScreen extends Component {
  /** @param {Props} props*/
  static navigationOptions = ({route}) => {
    return {
      title: (route.params?.reflexion ?? {titulo: 'Reflexion'}).titulo,
    };
  };

  render() {
    const {route} = this.props;
    /** @type {import("../utils/types").Reflexión} */
    // @ts-ignore
    let reflexion = route.params?.reflexion ?? {};
    return (
      <SafeAreaView style={styles.safe}>
        <ScreenBg
          source={{uri: reflexion.imagenFondo}}
          color={reflexion.color}
          styleImage={{resizeMode: 'cover'}}>
          <Player
            source={{
              uri: reflexion.media,
            }}
            showControls
            shouldPlay
          />
        </ScreenBg>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
});
