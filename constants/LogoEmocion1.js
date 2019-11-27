import React, {Component} from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';

export default class LogoEmocion1 extends Component {
  render() {
    return (
      <Svg width="24px" height="24px" viewBox="0 0 24 24">
        <G
          id="Icons/Emociones/icon_e_1"
          stroke="none"
          strokeWidth="2"
          fill="none"
          fill-rule="evenodd">
          <Circle
            id="Oval"
            fill="#494C6B"
            fill-rule="nonzero"
            cx="8"
            cy="12"
            r="1"
          />
          <Circle
            id="Oval"
            fill="#494C6B"
            fill-rule="nonzero"
            cx="16"
            cy="12"
            r="1"
          />
          <Circle
            id="Oval"
            stroke="#494C6B"
            strokeWidth="2"
            cx="12"
            cy="12"
            r="10"
          />
          <Path
            d="M2,10 C8.66666667,9.45903663 12,6.79236996 12,2"
            id="Path-19"
            stroke="#494C6B"
            strokeWidth="1.3"
          />
          <Path
            d="M12,10 C18,9.45903663 21,6.79236996 21,2"
            id="Path-19"
            stroke="#494C6B"
            strokeWidth="1.3"
            transform="translate(16.500000, 6.000000) scale(-1, 1) translate(-16.500000, -6.000000) "
          />
          <Path
            d="M4,7 C7.42857143,6.87087846 9.42857143,5.53754513 10,3"
            id="Path-18"
            stroke="#494C6B"
            strokeWidth="1.3"
          />
          <Path
            d="M14,6.98518279 C17.3994946,7.17651926 19.3994946,5.51479167 20,2"
            id="Path-18-Copy"
            stroke="#494C6B"
            strokeWidth="1.3"
            transform="translate(17.000000, 4.500000) scale(-1, 1) translate(-17.000000, -4.500000) "
          />
          <Path
            d="M10,15.4951722 C10.4417123,16.8285055 11.108379,17.4951722 12,17.4951722 C12.891621,17.4951722 13.5582877,16.8285055 14,15.4951722"
            id="Path-23"
            stroke="#494C6B"
            strokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </G>
      </Svg>
    );
  }
}
