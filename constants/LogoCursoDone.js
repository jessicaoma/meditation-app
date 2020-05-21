import React, {Component} from 'react';
import Svg, {G, Circle, Polyline} from 'react-native-svg';

export default class LogoCursoDone extends Component {
  render() {
    let currentcolor = this.props.color;
    return (
      <Svg width="27px" height="27px" viewBox="0 0 27 27">
        <G
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd">
          <G
            id=""
            transform="translate(-352.000000, -485.000000)"
            stroke-width="2">
            <G id="Curso-Visto" transform="translate(37.000000, 486.000000)">
              <G id="Group" transform="translate(316.000000, 0.000000)">
                <Circle
                  id="Oval"
                  stroke={currentcolor}
                  fill={currentcolor}
                  cx="12.5"
                  cy="12.5"
                  r="12.5"
                />
                <Polyline
                  id="Path-11"
                  stroke="#FFFFFF"
                  stroke-linecap="round"
                  points="7 13 11 17 19 9"
                />
              </G>
            </G>
          </G>
        </G>
      </Svg>
    );
  }
}
