import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ScreenBg from '../components/screenBg';
import Player from '../player/Player';

export default class AudiolibroScreen extends Component {
  static navigationOptions = ({navigation}) => {
    let audiolibro = navigation.getParam('audiolibro', {title: 'Audiolibro'});
    return {title: audiolibro.title};
  };

  render() {
    const {navigation} = this.props;
    let audiolibro = navigation.getParam('audiolibro', {});
    return (
      <>
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
      </>
    );
  }
}

const styles = StyleSheet.create({
  image: {resizeMode: 'contain'},
});
