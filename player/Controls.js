/// @ts-nocheck
import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Platform} from 'react-native';
import Slider from 'react-native-slider';
import {Ionicons} from '@expo/vector-icons';
import colors from '../constants/Colors';

/**
 * @typedef {Object} Props Properties of the component
 * @property {boolean} isPlaying Indicate that the media is playing
 * @property {(event: any) => void} onPress Callback used when the icon is Press
 * @property {boolean} isLoading Indicate that the file media is not ready to play
 * @property {(event: any) => void} onSliderValueChange Callback used when the slider value changes
 * @property {(event: any) => void} onSlidingComplete Callback used when the slider is complete
 * @property {number} seekSliderPosition Position of the seek
 * @property {string} currentTime Text of the current time on the media
 */

const ICON_PLAY_BUTTON = 'md-play';
const ICON_PAUSE_BUTTON = 'md-pause';
//TODO cambiar la validacion pues ya no se usa expo snack
const envProd = process.env.NODE_ENV === 'production';
const sliderThumb = envProd
  ? {uri: 'http://okoconnect.com/karim/assets/images/sliderimage.png'}
  : require('../assets/images/sliderimage.png');
/**
 * Controls elements for the player
 * @param {Props} props sended to the component
 */
export default function Controls(props) {
  return (
    <>
      <TouchableOpacity onPress={props.onPress} style={styles.playscreen} />
      <View style={[styles.container, {opacity: props.isLoading ? 0.5 : 1.0}]}>
        <TouchableOpacity onPress={props.onPress} disabled={props.isLoading}>
          <Ionicons
            name={props.isPlaying ? ICON_PAUSE_BUTTON : ICON_PLAY_BUTTON}
            size={25}
            color={colors.white}
            style={(styles.shadow, styles.playbuttons)}
          />
        </TouchableOpacity>
        <Slider
          style={(styles.shadow, styles.slider)}
          value={props.seekSliderPosition}
          onValueChange={props.onSliderValueChange}
          onSlidingComplete={props.onSlidingComplete}
          disabled={props.isLoading}
          minimumTrackTintColor={colors.white}
          thumbTintColor={Platform.select({ios: null, android: colors.white})}
          thumbImage={sliderThumb}
          thumbStyle={styles.thumb}
        />
        <Text
          style={[styles.shadow, styles.currenttime, {color: colors.white}]}>
          {props.currentTime}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  playscreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    height: '100%',
    width: '100%',
  },
  thumb: {
    width: 10,
    height: 10,
    backgroundColor: colors.gray,
    padding: 0,
  },
  playbuttons: {
    marginRight: 15,
    flex: 1,
    paddingVertical: 10,
  },
  currenttime: {
    marginLeft: 15,
    fontSize: 12,
  },
  slider: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
