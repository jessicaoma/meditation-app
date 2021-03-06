import React, {Component} from 'react';
import Svg, {G, Path, Rect} from 'react-native-svg';

/**
 * @typedef Props
 * @prop {string} [tintColor] Color to used
 *
 * @extends {Component<Props>}
 */
export default class LogoPerfil extends Component {
  render() {
    return (
      <Svg width="26px" height="26px" viewBox="0 0 55.9 54.1">
        <G id="Layer_2" data-name="Layer 2">
          <G id="Layer_1-2" data-name="Layer 1">
            <Path
              d="M23.83,50.88 C24.6345484,51.6594058 25.7098391,52.0966906 26.83,52.1 L26.83,52.1 C27.9475739,52.1031061 29.0228645,51.6729899 29.83,50.9 C41.65,39.45 53.83,27.6 53.83,15.08 C53.9,6.62 47,0 38.27,0 C32.94,0 29.46,1.94 26.91,4.71 C24.44,2 21,0 15.63,0 C6.86,0 0,6.62 0,15.08 C0,27.4 11.82,39 23.26,50.31 L23.83,50.88 Z M15.62,8 C18.77,8 20.62,8.85 23.02,13.91 C23.7466345,15.3273895 25.1972398,16.227006 26.7898952,16.247962 C28.3825507,16.268918 29.8563238,15.4077801 30.62,14.01 C33.27,8.87 35.12,8.01 38.26,8.01 C40.1526276,7.95319541 41.987536,8.66553937 43.3460668,9.98450123 C44.7045975,11.3034631 45.4708523,13.1165203 45.47,15.01 C45.47,23.36 36.47,32.88 26.87,42.25 C17.43,33 8.42,23.43 8.42,15.08 C8.39743916,13.1744675 9.15274474,11.3421011 10.5115298,10.0059625 C11.8703148,8.66982387 13.7151157,7.94541885 15.62,8 Z"
              id="Shape"
              fill="#97A3CE"
            />
            <Rect
              id="Rectangle"
              fill="#FFFFFF"
              transform="translate(9.444883, 29.787753) rotate(-42.840000) translate(-9.444883, -29.787753) "
              x="1.70488313"
              y="28.352753"
              width="15.48"
              height="2.87"
            />
          </G>
        </G>
      </Svg>
    );
  }
}
