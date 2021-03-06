import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Video} from 'expo-av';

/**
 * @typedef {Object} Props Properties of the component
 * @prop {(ref: any) => void} refVideo Callback to get the video player reference
 * @prop {(status: import('expo-av/build/AV').AVPlaybackStatus) => void} onPlaybackStatusUpdate Callback on the status updates
 * @prop {import('react-native').ViewStyle} [styleVideo] Extra Style to the player
 * @prop {(event: import('expo-av/build/Video.types').VideoReadyForDisplayEvent) => any} [onReadyForDisplay] Call when the video is ready to play
 * @prop {import('expo-av/build/Video.types').ResizeMode | 'stretch' | 'cover' | 'contain'} resizeMode Resize Mode
 * @prop {boolean} [shouldPlay] A boolean describing if the media is supposed to play
 */

/**
 * Screen where the video while be show
 * @param {Props} props sended to the component
 */
export default function ScreenView(props) {
  return (
    <View style={styles.videoContainer}>
      <Video
        style={[styles.player, props.styleVideo]}
        ref={props.refVideo}
        resizeMode={props.resizeMode}
        onPlaybackStatusUpdate={props.onPlaybackStatusUpdate}
        onReadyForDisplay={props.onReadyForDisplay}
        shouldPlay={props.shouldPlay}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  player: {
    width: '100%',
    height: '100%',
  },
});
