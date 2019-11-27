import React, {Component} from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';
import colors from './Colors';

/**
 * @typedef Props
 * @prop {string} tintColor Color to used
 *
 * @extends {Component<Props>}
 */
export default class LogoViajesCompletados extends Component {
  render() {
    const opacity =
      this.props.tintColor === colors.tabIconDefault ? '0.5' : '1';
    return (
      //   <Svg width="24px" height="24px" viewBox="0 0 24 24" opacity={opacity}>
      //     <G
      //       id="Icons/Perfil/icon_2"
      //       stroke="none"
      //       strokeWidth="2"
      //       fill="none"
      //       fill-rule="evenodd"
      //       stroke-linejoin="round">
      //       <G
      //         id="Group"
      //         transform="translate(4.000000, 5.000000)"
      //         stroke="#494C6B"
      //         strokeWidth="2">
      //         <Path
      //           d="M0.21539961,0.466666667 L0.21539961,0.466666667 C0.337210479,0.202761489 0.640774542,0.0760357695 0.914068917,0.175000486 L17,6 L2.75048733,14 L0.105870763,1.43629074 C0.0371278328,1.10971554 0.0755385196,0.769677934 0.21539961,0.466666667 Z"
      //           id="Path-5"
      //         />
      //         <Path
      //           d="M0.144087424,0.760306574 C0.56075409,1.18882571 3.84605828,4.2945417 10,10.0774546 L10,15 L7.1875,12.1074958"
      //           id="Path-6"
      //         />
      //       </G>
      //     </G>
      //   </Svg>
      <Svg width="24" height="22" viewBox="0 0 28 22" opacity={opacity}>
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
