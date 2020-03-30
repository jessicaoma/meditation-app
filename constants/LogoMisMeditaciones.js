import React, {Component} from 'react';
import Svg, {G, Path} from 'react-native-svg';
import colors from './Colors';

/**
 * @typedef Props
 * @prop {string} tintColor Color to used
 *
 * @extends {Component<Props>}
 */
export default class LogoMisMeditaciones extends Component {
  render() {
    const opacity =
      this.props.tintColor === colors.tabIconDefault ? '0.5' : '1';
    return (
      <Svg width="30px" height="30px" viewBox="0 0 56.22 40.42">
        <G id="Layer_2" data-name="Layer 2" stroke="transparent" fill="#97a3ce">
          <G id="Layer_1-2" data-name="Layer 1" stroke="transparent" fill="#97a3ce">
            <Path class="cls-1" d="M9.68,35.35c5,3.66,12.51,5.29,18.43,5,5.82.25,13.33-1.33,18.43-5a31.38,31.38,0,0,0,3.1-2.8c6.85-7.68,6.59-19.5,6.57-20a1.84,1.84,0,0,0-1.74-1.78,36.81,36.81,0,0,0-8.24.71,35.25,35.25,0,0,0-2.42-7.62,1.84,1.84,0,0,0-2.27-.94,35.58,35.58,0,0,0-7.06,3.67A35,35,0,0,0,29.34.47a1.84,1.84,0,0,0-2.45,0,35,35,0,0,0-5.15,6.1A35.56,35.56,0,0,0,14.67,2.9a1.84,1.84,0,0,0-2.27.94A35.18,35.18,0,0,0,10,11.46a36.81,36.81,0,0,0-8.24-.71A1.84,1.84,0,0,0,0,12.54c0,.52-.28,12.34,6.57,20,1,1,3.1,2.8,3.1,2.8M52.49,14.43c-.21,3.51-1.25,11.38-6.21,16.33-4,4-9.83,5.32-13.8,5.76C36.78,31.24,39.78,24.76,39,18c4.73-2.86,10.6-3.45,13.5-3.56M41.17,7a34,34,0,0,1,1.51,5.33,26.67,26.67,0,0,0-4.47,1.85,26.56,26.56,0,0,0-1.84-4.49A34.5,34.5,0,0,1,41.17,7M28.11,4.44c3.91,4.19,7.34,10,7.34,15.76,0,7-5,13.21-7.35,15.76-2.37-2.54-7.34-8.72-7.34-15.76,0-5.76,3.41-11.52,7.35-15.76M15.05,7a34.54,34.54,0,0,1,4.81,2.69A26.53,26.53,0,0,0,18,14.22a26.6,26.6,0,0,0-4.47-1.85A34.15,34.15,0,0,1,15.05,7M3.73,14.43c2.9.1,8.75.69,13.5,3.56-.78,6.76,2.22,13.24,6.51,18.53-4-.44-9.82-1.78-13.8-5.76-5-5-6-12.83-6.21-16.33"/>
          </G>
        </G>
      </Svg>
    );
  }
}
