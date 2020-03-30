import React, {Component} from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';
import colors from './Colors';

/**
 * @typedef Props
 * @prop {string} [tintColor] Color to used
 *
 * @extends {Component<Props>}
 */
export default class LogoPerfil extends Component {
  render() {
    const opacity =
      this.props.tintColor === colors.tabIconDefault ? '0.5' : '1';
    return (
      <Svg width="26px" height="26px" viewBox="0 0 144 144" version="1.1" >
          <G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <Path d="M118.784,112.495 C116.674,103.988 112.274,96.144 105.99,89.86 C100.901,84.771 94.88,80.953 88.314,78.56 C96.208,73.207 101.404,64.163 101.404,53.93 C101.404,37.53 88.061,24.186 71.662,24.186 C55.263,24.186 41.92,37.53 41.92,53.93 C41.92,64.168 47.121,73.217 55.02,78.568 C48.979,80.769 43.389,84.174 38.579,88.656 C31.614,95.141 26.777,103.412 24.534,112.488 C15.036,101.54 9.281,87.261 9.281,71.662 C9.281,37.266 37.264,9.282 71.662,9.282 C106.059,9.282 134.043,37.266 134.043,71.662 C134.043,87.265 128.285,101.547 118.784,112.495 Z M71.662,75.391 C59.829,75.391 50.2,65.763 50.2,53.93 C50.2,42.095 59.829,32.468 71.662,32.468 C83.495,32.468 93.124,42.095 93.124,53.93 C93.124,65.763 83.495,75.391 71.662,75.391 Z M31.668,119.495 C34.001,99.419 51.263,83.919 71.662,83.919 C82.416,83.919 92.528,88.109 100.136,95.716 C106.561,102.142 110.614,110.534 111.657,119.495 C100.821,128.57 86.869,134.044 71.662,134.044 C56.455,134.044 42.504,128.571 31.668,119.495 Z M121.628,21.697 C108.281,8.35 90.536,1 71.662,1 C52.788,1 35.043,8.35 21.696,21.697 C8.35,35.042 1,52.787 1,71.662 C1,90.537 8.35,108.281 21.696,121.628 C35.043,134.974 52.788,142.324 71.662,142.324 C90.536,142.324 108.281,134.974 121.628,121.628 C134.973,108.281 142.324,90.537 142.324,71.662 C142.324,52.787 134.973,35.042 121.628,21.697 Z" id="Stroke-1" stroke="#97A3CE" strokeWidth="2" fill="#97A3CE"></Path>
          </G>
      </Svg>
    );
  }
}
