import React, {Component} from 'react';
import Svg, {G, Path} from 'react-native-svg';
import colors from './Colors';

/**
 * @typedef Props
 * @prop {string} tintColor Color to used
 *
 * @extends {Component<Props>}
 */
export default class LogoInicio extends Component {
  render() {
    const opacity =
      this.props.tintColor === colors.tabIconDefault ? '0.5' : '1';
    return (
      <Svg width="24" height="25" viewBox="0 0 24 25" opacity={opacity}>
        <G
          fill="none"
          fillOpacity="0.4"
          fill-rule="nonzero"
          stroke-linejoin="round"
          strokeWidth="2">
          <G
            id="Icons/Tab_bar/icon_home1"
            transform="translate(-12.000000, -5.000000)"
            stroke="#494C6B"
            strokeWidth="2">
            <Path d="M20.6521739,29 L13,29 L13,14.3191489 L24,6 L35,14.3191489 L35,29 L27.3478261,29 L27.3478261,24.106383 C27.0289855,22.1489362 25.9130435,21.1702128 24,21.1702128 C22.0869565,21.1702128 20.9710145,22.1489362 20.6521739,24.106383 L20.6521739,29 Z" />
          </G>
        </G>
      </Svg>
    );
  }
}
