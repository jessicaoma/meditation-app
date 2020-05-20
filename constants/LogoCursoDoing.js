import React, {Component} from 'react';
import Svg, {G, Circle} from 'react-native-svg';
import colors from '../constants/Colors';

export default class LogoCursoDoing extends Component {
  render() {
    let currentcolor = this.props.color;
    return (
      <Svg width="27px" height="27px" viewBox="0 0 27 27">
          <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
              <G id="" transform="translate(-353.000000, -617.000000)">
                  <G id="Curso-Viendo" transform="translate(37.000000, 618.000000)">
                      <G id="Group" transform="translate(317.000000, 0.000000)">
                          <Circle id="Oval" stroke="#D7D7D7" strokeWidth="2" fill="#FFFFFF" cx="12.5" cy="12.5" r="12.5"></Circle>
                          <Circle id="Oval" fill={currentcolor} cx="12.5" cy="12.5" r="6.25"></Circle>
                      </G>
                  </G>
              </G>
          </G>
      </Svg>
    );
  }
}