import React, {Component} from 'react';
import Svg, {G, Path} from 'react-native-svg';

/**
 * @typedef {Object} Props
 *
 * @extends {Component<Props>}
 */
export default class LogoGoogle extends Component {
  render() {
    return (
      <Svg width="30" height="30" viewBox="0 0 48 48">
        <G id="Layer_2" data-name="Layer 2">
          <G id="Layer_1-2" data-name="Layer 1">
            <Path
              fill="#7883a4"
              d="M0,40V8c.05-.22.11-.44.16-.67A8.9,8.9,0,0,1,6,.51C6.66.28,7.32.17,8,0H40c.18,0,.36.11.54.14a8.78,8.78,0,0,1,6.55,5.07A20.59,20.59,0,0,1,48,8V40c-.05.2-.11.4-.15.6a8.69,8.69,0,0,1-4.61,6.26A21.46,21.46,0,0,1,40,48H8c-.16,0-.31-.1-.47-.14a8.65,8.65,0,0,1-6.36-4.58A21.46,21.46,0,0,1,0,40"
            />
            <Path
              fill="#ffffff"
              d="M25.79,14.72l-3.26,3.49a6.81,6.81,0,0,0-10.45,2.33,6.74,6.74,0,0,0,3.67,9.08c3.35,1.29,7.57-.53,8.52-3.76H20c-2.11,0-2.11,0-2.11-2.1,0-.72,0-1.44,0-2.16,0-.53.18-.73.72-.73q5.07,0,10.13,0c.55,0,.75.2.85.74a11.65,11.65,0,0,1-7,12.45A11.57,11.57,0,1,1,20.2,12a11.77,11.77,0,0,1,5.39,2.53,1.35,1.35,0,0,1,.2.21"
            />
            <Path
              fill="#ffffff"
              d="M39,24.33c0,1.19,0,2.25,0,3.3,0,.54-.19.71-.72.72-2.4.06-2.4.08-2.39-2.3,0-1.73,0-1.73-1.75-1.73-.52,0-1,0-1.55,0s-.7-.22-.71-.73c-.09-2.33-.1-2.33,2.18-2.33,1.82,0,1.82,0,1.82-1.84a11.47,11.47,0,0,1,0-1.62.78.78,0,0,1,.53-.52c.66-.07,1.34,0,2,0,.46,0,.57.21.56.61,0,.93,0,1.85,0,2.78,0,.48.18.64.64.62.9,0,1.8,0,2.7,0,.51,0,.69.18.67.67a13.47,13.47,0,0,0,0,1.54c0,.62-.17.88-.83.85-1,0-2,0-3.18,0"
            />
          </G>
        </G>
      </Svg>
    );
  }
}