import React, {Component} from "react";
import {View, Text} from "react-native";

//Importamos los componentes del package
import Svg, {G, Path, Polygon} from "react-native-svg";

export const LogoEmociones = (props) =>
<Svg width="24px" height="24px" viewBox="0 0 24 24">
    <G id="Icons/Perfil/icon_1" stroke="none" strokeWidth="2" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <G id="Group" transform="translate(2.000000, 10.000000)" stroke="#494C6B" strokeWidth="2">
            <Path d="M8,0 C8,2.209 6.209,4 4,4 C1.791,4 0,2.209 0,0"></Path>
            <Polygon stroke-linejoin="round" points="4.5 5 4.5 6 4.5 5 4.5 4"></Polygon>
            <Polygon stroke-linejoin="round" points="7.5 3.5 8 4 7.5 3.5 7 3"></Polygon>
            <Path d="M0.5,4.5 L0,5 C0,5 0.223479491,4.77652051 0.5,4.5 L1,4 L0.5,4.5 Z" stroke-linejoin="round"></Path>
        </G>
        <G id="Group-Copy" transform="translate(18.000000, 13.000000) scale(-1, 1) translate(-18.000000, -13.000000) translate(14.000000, 10.000000)" stroke="#494C6B" strokeWidth="2">
            <Path d="M8,0 C8,2.209 6.209,4 4,4 C1.791,4 0,2.209 0,0"></Path>
            <Polygon stroke-linejoin="round" points="4.5 5 4.5 6 4.5 5 4.5 4"></Polygon>
            <Polygon stroke-linejoin="round" points="7.5 3.5 8 4 7.5 3.5 7 3"></Polygon>
            <Path d="M0.5,4.5 L0,5 C0,5 0.223479491,4.77652051 0.5,4.5 L1,4 L0.5,4.5 Z" stroke-linejoin="round"></Path>
        </G>
    </G>
</Svg>