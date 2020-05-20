import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import API from '../utils/API';

/**
 * @typedef Props
 * @prop {import('@react-navigation/native').NavigationProp<(import('../navigation/AppNavigator').ParamList),'Meditacion'>} navigation
 * @prop {import('@react-navigation/native').RouteProp<(import('../navigation/AppNavigator').ParamList),'Meditacion'>} route
 * @extends {Component<Props>}
 */
export default class MeditacionScreen extends Component {
  /** @param {Props} props */
  static navigationOptions = ({navigation, route}) => {
    return {
      title: (route.params?.meditacion ?? {titulo: 'Meditación'}).titulo,
    };
  };

  /** @param {Props} props */
  constructor(props) {
    super(props);
    /** @type {import('../utils/types').Meditación } */
    // @ts-ignore
    this.meditacion = props.route.params?.meditacion ?? {};
  }

  // /** @type {Player} */
  // audio = null;
  // refAudio = ref => {
  //   this.audio = ref;
  // };
  /** @param {import('expo-av/build/AV').AVPlaybackStatus} status */
  onEnd = status => {
    // @ts-ignore
    API.postDiarioMeditacion(this.meditacion.key, status.durationMillis);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScreenBg
          source={{
            uri: this.meditacion.imagenFondo,
          }}
          color={this.meditacion.color}
          styleImage={{resizeMode: 'cover'}}>
          <View style={styles.container}>
            <Player
              source={{
                uri: this.meditacion.media,
              }}
              //ref={this.refAudio}
              showControls
              //showPlayFrame
              shouldPlay
              onEnd={this.onEnd}
            />
          </View>
        </ScreenBg>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
