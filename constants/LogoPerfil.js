import React, {Component} from 'react';
import Svg, {G, Path, Rect} from 'react-native-svg';

/**
 * @typedef Props
 * @prop {string} [tintColor] Color to used
 *
 * @extends {Component<Props>}
 */
export default class LogoPerfil extends Component {
  render() {
    return (
      <Svg width="26px" height="26px" viewBox="0 0 55.9 54.1">
        <G id="Layer_2" data-name="Layer 2">
          <G id="Layer_1-2" data-name="Layer 1">
            <Path fill="#97a3ce" class="cls-1" d="M24.83,51.88a4.33,4.33,0,0,0,3,1.22h0a4.32,4.32,0,0,0,3-1.2c11.82-11.45,24-23.3,24-35.82C54.9,7.62,48,1,39.27,1c-5.33,0-8.81,1.94-11.36,4.71C25.44,3,22,1,16.63,1,7.86,1,1,7.62,1,16.08,1,28.4,12.82,40,24.26,51.31ZM16.62,9c3.15,0,5,.85,7.4,5.91a4.3,4.3,0,0,0,7.6.1c2.65-5.14,4.5-6,7.64-6a7,7,0,0,1,7.21,7c0,8.35-9,17.87-18.6,27.24C18.43,34,9.42,24.43,9.42,16.08A7,7,0,0,1,16.62,9Z"/>
            <Rect fill="#fff" class="cls-2" x="2.71" y="29.35" width="15.48" height="2.87" transform="translate(-18.15 15.32) rotate(-42.84)"/>
          </G>
        </G>
      </Svg>
    );
  }
}
