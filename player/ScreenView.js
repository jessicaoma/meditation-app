import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Video} from 'expo-av';

/**
 * @typedef {Object} Props Properties of the component
 * @property {(ref: any) => void} refVideo Callback to get the video player reference
 * @property {(status: any) => void} onPlaybackStatusUpdate Callback on the status updates
 * @property {import('react-native').ViewStyle} [styleVideo] Extra Style to the player
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
        resizeMode={Video.RESIZE_MODE_STRETCH}
        onPlaybackStatusUpdate={props.onPlaybackStatusUpdate}
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
    //activar si quiere verificar la ubicación del componente
    //borderColor: '#0F0',
    //borderWidth: 1,
  },
  player: {
    width: '100%',
    height: '100%',
  },
});
