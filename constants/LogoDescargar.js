import React, {Component} from 'react';
import Svg, {G, Path, Polyline} from 'react-native-svg';

export default class LogoDescargar extends Component {
  render() {
    return (
      <Svg width="25" height="30" viewBox="0 0 25 30">
        <G
          id="Symbols"
          stroke="none"
          strokeWidth="3"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="round"
          stroke-linejoin="round">
          <G
            id="icon_compartir"
            transform="translate(-7.000000, -5.000000)"
            stroke="#FFFFFF"
            stroke-width="2">
            <G id="descargar" transform="translate(8.000000, 6.000000)">
              <Polyline
                id="Path-12"
                transform="translate(9.000000, 7.500000) rotate(-180.000000) translate(-9.000000, -7.500000) "
                points="3.6 0 0 0 0 15 18 15 18 0 14.9142857 0"
              />
              <Path
                d="M9,20 L9,10"
                id="Path-13"
                transform="translate(9.000000, 15.000000) rotate(-180.000000) translate(-9.000000, -15.000000) "
              />
              <Path
                d="M5,21 C5,21 6.33333333,20.1666667 9,18.5 L13,21"
                id="Path-14"
                transform="translate(9.000000, 19.750000) scale(-1, 1) rotate(180.000000) translate(-9.000000, -19.750000) "
              />
            </G>
          </G>
        </G>
      </Svg>
    );
  }
}
