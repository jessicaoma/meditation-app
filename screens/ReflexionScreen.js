import React, {Component} from 'react';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';
import {SafeAreaView} from 'react-native';

/**
 * @typedef {object} Props
 * @prop {import('react-navigation').NavigationScreenProp} [navigation]
 * @extends {Component<Props>}
 */
export default class ReflexionScreen extends Component {
  static navigationOptions = ({navigation}) => {
    /** @type {import("../utils/types").Reflexión} */
    let reflexion = navigation.getParam('reflexion', {titulo: 'Meditación'});
    return {title: reflexion.titulo, headerBackTitle: null};
  };

  render() {
    const {navigation} = this.props;
    /** @type {import("../utils/types").Reflexión} */
    let reflexion = navigation.getParam('reflexion', {});
    return (
      <>
        <SafeAreaView>
          <ScreenBg
            source={{uri: reflexion.imagenFondo}}
            color={reflexion.color}
            // eslint-disable-next-line react-native/no-inline-styles
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
      </>
    );
  }
}
