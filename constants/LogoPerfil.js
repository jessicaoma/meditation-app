import React, {Component} from "react";
import {View, Text} from "react-native";

//Importamos los componentes del package
import Svg, {G, Path, Polygon, Circle} from "react-native-svg";

export const LogoPerfil = (props) =>
<Svg width="23px" height="23px" viewBox="0 0 23 23" version="1.1">
    <G id="Symbols" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
        <G id="Icons/Tab_bar/icon_perfil2" transform="translate(-13.000000, -6.000000)">
            <G id="Group" transform="translate(14.000000, 7.000000)">
                <Circle id="Oval" fill="#494C6B" fill-rule="nonzero" cx="6" cy="13" r="1"></Circle>
                <Circle id="Oval" fill="#494C6B" fill-rule="nonzero" cx="14" cy="13" r="1"></Circle>
                <Circle id="Oval" stroke="#494C6B" strokeWidth="2" cx="10.5" cy="10.5" r="10.5"></Circle>
                <Path d="M0,11 C6.66666667,10.2561754 10,6.5895087 10,0" id="Path-19" stroke="#494C6B" strokeWidth="1.3"></Path>
                <Path d="M10,11 C16.6666667,10.2561754 20,6.5895087 20,0" id="Path-19" stroke="#494C6B" strokeWidth="1.3" transform="translate(15.000000, 5.500000) scale(-1, 1) translate(-15.000000, -5.500000) "></Path>
                <Path d="M0,8 C4,7.77403731 6.33333333,5.44070398 7,1" id="Path-18" stroke="#494C6B" strokeWidth="1.3"></Path>
                <Path d="M13,8 C17.5326595,8.29033333 20.1993261,5.76883333 21,0.4355" id="Path-18-Copy" stroke="#494C6B" strokeWidth="1.3" transform="translate(17.000000, 4.228992) scale(-1, 1) translate(-17.000000, -4.228992) "></Path>
            </G>
        </G>
    </G>
</Svg>