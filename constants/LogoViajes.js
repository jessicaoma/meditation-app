import React, {Component} from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';
import colors from './Colors';

/**
 * @typedef Props
 * @prop {string} tintColor Color to used
 *
 * @extends {Component<Props>}
 */
export default class LogoViajes extends Component {
  render() {
    const opacity =
      this.props.tintColor === colors.tabIconDefault ? '0.5' : '1';
    return (
      <Svg width="28px" height="22px" viewBox="0 0 28 22" opacity={opacity}>
        <G id="Symbols" stroke="none" strokeWidth="2" fill="none">
          <G transform="translate(-10.000000, -7.000000)" fill="none">
            <G transform="translate(11.000000, 8.000000)" fill="none">
              <Path
                d="M0.888888889,0.857142857 L0.888888889,0.857142857 C1.43418493,0.331321674 2.22869626,0.156533129 2.94432251,0.404957672 L24,7.71428571 L4.88888889,18 L0.355038713,2.89697961 C0.13701672,2.17071154 0.343040452,1.38349671 0.888888889,0.857142857 Z"
                id="Path-5"
                stroke="#494C6B"
                stroke-width="3"
                strokeLinejoin="round"
              />
              <Path
                d="M1,1 C1.58333333,1.58536585 6.25,5.53658537 15,12.8536585 L15,19 L11.0625,15.0487805"
                id="Path-6"
                stroke="#494C6B"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <Circle id="Oval" fill="#7883A4" cx="19" cy="16" r="1" />
              <Circle id="Oval-Copy" fill="#7883A4" cx="22" cy="19" r="1" />
              <Circle id="Oval-Copy-2" fill="#7883A4" cx="26" cy="20" r="1" />
            </G>
          </G>
        </G>
      </Svg>
    );
  }
}
