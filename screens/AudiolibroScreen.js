import React, {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';

/**
 * @typedef Props
 * @prop {import('react-navigation').NavigationScreenProp} navigation
 *
 * @extends {Component<Props>}
 */
export default class AudiolibroScreen extends Component {
  /** @param {{navigation : import('react-navigation').NavigationScreenProp}} param*/
  static navigationOptions = ({navigation}) => {
    let audiolibro = navigation.getParam('audiolibro', {title: 'Audiolibro'});
    return {title: audiolibro.title};
  };

  render() {
    const {navigation} = this.props;
    let audiolibro = navigation.getParam('audiolibro', {});
    return (
      <>
        <SafeAreaView>
        <ScreenBg
          source={{uri: audiolibro.backgroundImage}}
          color={audiolibro.color}
          styleImage={styles.image}>
          <Player
            source={{
              uri: audiolibro.media,
            }}
            showControls
            //showPlayFrame
            shouldPlay
          />
        </ScreenBg>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  image: {resizeMode: 'contain'},
});
