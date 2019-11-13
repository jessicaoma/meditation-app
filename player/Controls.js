import React, {Component} from 'react';
import {Text, TouchableOpacity, Slider, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import colors from '../constants/Colors';
import PropTypes from 'prop-types';

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
            size={30}
            color={colors.white}
            style={styles.shadow, styles.playbuttons}
          />
        </TouchableOpacity>
        <Slider
          style={(styles.shadow, styles.slider)}
          value={props.seekSliderPosition}
          onValueChange={props.onSliderValueChange}
          onSlidingComplete={props.onSlidingComplete}
          thumbTintColor={colors.gray}
          thumbStyle={styles.thumb}
          trackStyle={styles.thumb}
          disabled={props.isLoading}
          minimumTrackTintColor={colors.white}
        />
        <Text style={[styles.shadow, styles.currenttime, {color: colors.white}]}>
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
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 30,
    //activar si quiere verificar la ubicación del componente
    //borderColor: '#F00',
    //borderWidth: 1,
  },
  playscreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    height: '100%',
    width: '100%',
    //borderColor: '#F0F',
    //borderWidth: 1,
  },
  thumb: {
    width: 5,
    height: 5,
    backgroundColor: colors.gray,
  },
  playbuttons: {
    marginRight: 15,
    flex:1,
    paddingVertical: 10
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