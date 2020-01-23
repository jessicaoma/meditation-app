import React, {Component} from 'react';
import Svg, {G, Path} from 'react-native-svg';

/**
 * @typedef Props
 * @prop {string} tintColor Color to used
 *
 * @extends {Component<Props>}
 */
export default class LogoFacebook extends Component {
  render() {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30" height="30" fill="#7883a4" stroke="#7883a4">
        <G id="Layer_2" data-name="Layer 2">
        <G id="Layer_1-2" data-name="Layer 1">
          <Path class="cls-1" 
            d="M0,40V8c.05-.22.11-.44.17-.67A8.9,8.9,0,0,1,6.05.51,19.66,19.66,0,0,1,8,0H40c.18,0,.36.11.54.14a8.78,8.78,0,0,1,6.55,5.07A20.59,20.59,0,0,1,48,8V40c-.05.2-.11.4-.15.6a8.69,8.69,0,0,1-4.62,6.26A21.43,21.43,0,0,1,40,48H8c-.16,0-.31-.1-.47-.14a8.65,8.65,0,0,1-6.36-4.58A21.25,21.25,0,0,1,0,40M38.77,9.34c-2.44,0-4.83-.17-7.2,0-3.57.31-5.46,2.39-5.71,6-.1,1.37-.05,2.74-.07,4.11,0,.25,0,.5,0,.82H22.92v5.57H25.8V42.41h7.5V25.84h4.48l.61-5.62h-5.1c0-1.07,0-2.07,0-3.05.05-2,.46-2.34,2.41-2.37h3.07Z"/>
        </G></G>
      </Svg>
    );
  }
}
