import React, {Component} from 'react';
import Svg, {G, Path, Polyline, Rect} from 'react-native-svg';
import dimensions from '../constants/Dimensions';

const width = dimensions.window.width / 4;
const height = width / 1.7;

export default class LogoNextButton extends Component {
  render() {
    return (
      <Svg width={width} height={height} viewBox="0 0 130 90">
		<G  stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
	        <G id="Group-6" fill="#7482A6">
	            <Rect id="Rectangle" fill="#7482A6" x="0" y="0" width="130" height="90" rx="45"></Rect>
	            <Polyline id="Stroke-4" stroke="#FFFFFF" strokeWidth="5" stroke-linecap="round" points="61.0735 31.6518 74.3555 44.9998 61.0735 58.3478"></Polyline>
	        </G>
	    </G>
	  </Svg>
    );
  }
}
