import React, {Component} from 'react';
import Svg, {G, Polyline} from 'react-native-svg';

/**
 * @typedef Props
 * @prop {string} tintColor Color to used
 *
 * @extends {Component<Props>}
 */
export default class LogoArrowRight extends Component {
  render() {
    return (
      <Svg width="15px" height="26px" viewBox="0 0 20 32" >
          <G id="Page-1" stroke="#B3B3B3" strokeWidth="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
              <G id="right-arrow" transform="translate(2.000000, 2.000000)" stroke="#B3B3B3" stroke-width="5">
                  <Polyline id="Path" points="0.5 0.5 13.78 13.85 0.5 27.2"></Polyline>
              </G>
          </G>
      </Svg>
    );
  }
}
