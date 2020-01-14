import React, {Component} from 'react';
import Svg, {G, Path, Polygon, Rect} from 'react-native-svg';
import colors from './Colors';

/**
 * @typedef Props
 * @prop {string} [tintColor] Color to used
 *
 * @extends {Component<Props>}
 */
export default class LogoReloj extends Component {
  render() {
    const opacity =
      this.props.tintColor === colors.tabIconDefault ? '0.5' : '1';
    return (
      <Svg
        viewBox="0 0 55.1 62.84"
        width="55.1"
        height="62.84"
        opacity={opacity}>
        <G id="Layer_2" data-name="Layer 2">
          <G id="Layer_1-2" data-name="Layer 1">
            <Path
              stroke="transparent"
              fill="#8E92A6"
              d="M27.55,8.24a27,27,0,1,0,27,27.12A27,27,0,0,0,27.55,8.24Zm0,51.33A24.21,24.21,0,1,1,51.76,35.36,24.21,24.21,0,0,1,27.55,59.57Z"
            />
            <Path
              stroke="transparent"
              fill="#8E92A6"
              d="M27.55,62.84a27.55,27.55,0,1,1,0-55.1h0a27.55,27.55,0,0,1,0,55.1Zm0-54.1A26.55,26.55,0,1,0,54.1,35.36,26.58,26.58,0,0,0,27.55,8.74Zm0,51.33h0A24.71,24.71,0,1,1,52.26,35.36,24.74,24.74,0,0,1,27.55,60.07Zm0-48.42A23.71,23.71,0,1,0,51.26,35.36,23.74,23.74,0,0,0,27.55,11.65Z"
            />
            <Rect
              stroke="transparent"
              fill="#8E92A6"
              x="21.16"
              y="0.5"
              width="12.78"
              height="2.84"
            />
            <Path
              stroke="transparent"
              fill="#8E92A6"
              d="M34.44,3.84H20.66V0H34.44Zm-12.78-1H33.44V1H21.66Z"
            />
            <Polygon
              stroke="transparent"
              fill="#8E92A6"
              points="26.06 34.29 15.84 34.29 15.84 37.13 28.9 37.13 28.97 19.39 26.13 19.39 26.06 34.29"
            />
            <Path
              stroke="transparent"
              fill="#8E92A6"
              d="M29.4,37.63H15.34V33.79H25.56l.07-14.91h3.84Zm-13.06-1H28.4l.07-16.75H26.63l-.07,14.91H16.34Z"
            />
          </G>
        </G>
      </Svg>
    );
  }
}
