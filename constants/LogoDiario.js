import React, {Component} from 'react';
import Svg, {G, Path, Rect, Polyline} from 'react-native-svg';
import colors from './Colors';

/**
 * @typedef Props
 * @prop {string} tintColor Color to used
 *
 * @extends {Component<Props>}
 */
export default class LogoDiario extends Component {
  render() {
    return (
      <Svg width="24" height="24" viewBox="0 0 24 24">
        <G
          id="Icons/Perfil/icon_3"
          stroke="none"
          strokeWidth="2"
          fill="none"
          fill-rule="evenodd">
          <G
            id="Group"
            transform="translate(12.500000, 11.000000) rotate(-330.000000) translate(-12.500000, -11.000000) translate(11.000000, 3.000000)"
            stroke="#494C6B"
            stroke-linejoin="round"
            strokeWidth="2">
            <Rect id="Rectangle" x="0" y="0" width="3" height="13" />
            <Polyline
              id="Path-20"
              stroke-linecap="round"
              points="0 13 1.5 16 3 13"
            />
          </G>
          <Path
            d="M5.5,20.1782032 L18.5,20.1782032"
            id="Line-4"
            stroke="#7883A4"
            strokeWidth="2"
            stroke-linecap="round"
          />
        </G>
      </Svg>
    );
  }
}
