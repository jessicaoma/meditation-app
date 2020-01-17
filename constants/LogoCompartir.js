import React, {Component} from 'react';
import Svg, {G, Path, Polygon} from 'react-native-svg';

/**
 * @typedef {Object} Props
 *
 * @extends {Component<Props>}
 */
export default class LogoCompartir extends Component {
  render() {
    return (
      <Svg width="24" height="26" viewBox="0 0 24 26">
        <G
          id="Page-1"
          stroke="#FFFFFF"
          stroke-width="1"
          fill="transparent"
          fill-rule="evenodd">
          <G transform="translate(-243.000000, -756.000000)">
            <G id="share-24px" transform="translate(240.000000, 754.000000)">
              <Polygon id="Path" points="0 0 30 0 30 30 0 30" />
              <Path
                d="M22.5,20.1 C21.55,20.1 20.7,20.475 20.05,21.0625 L11.1375,15.875 C11.2,15.5875 11.25,15.3 11.25,15 C11.25,14.7 11.2,14.4125 11.1375,14.125 L19.95,8.9875 C20.625,9.6125 21.5125,10 22.5,10 C24.575,10 26.25,8.325 26.25,6.25 C26.25,4.175 24.575,2.5 22.5,2.5 C20.425,2.5 18.75,4.175 18.75,6.25 C18.75,6.55 18.8,6.8375 18.8625,7.125 L10.05,12.2625 C9.375,11.6375 8.4875,11.25 7.5,11.25 C5.425,11.25 3.75,12.925 3.75,15 C3.75,17.075 5.425,18.75 7.5,18.75 C8.4875,18.75 9.375,18.3625 10.05,17.7375 L18.95,22.9375 C18.8875,23.2 18.85,23.475 18.85,23.75 C18.85,25.7625 20.4875,27.4 22.5,27.4 C24.5125,27.4 26.15,25.7625 26.15,23.75 C26.15,21.7375 24.5125,20.1 22.5,20.1 Z"
                id="Path"
                fill="#FFFFFF"
                fill-rule="nonzero"
              />
            </G>
          </G>
        </G>
      </Svg>
    );
  }
}
