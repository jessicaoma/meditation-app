import React, {Component} from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';
import colors from './Colors';

/**
 * @typedef Props
 * @prop {string} tintColor Color to used
 *
 * @extends {Component<Props>}
 */
export default class LogoSalir extends Component {
  render() {
    return (
      <Svg width="30px" height="27px" viewBox="0 0 27 19">
        <G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <G id="SE---Perfil-vista" transform="translate(-18.000000, -463.000000)" fill="#97A3CE" fill-rule="nonzero">
                <G id="logout-(1)" transform="translate(31.500000, 472.500000) scale(-1, 1) translate(-31.500000, -472.500000) translate(18.000000, 463.000000)">
                    <Path d="M4.27178759,10.6249859 L18.0298814,10.6249859 C18.6857035,10.6249859 19.2173913,10.1212838 19.2173913,9.49998125 C19.2173913,8.87867866 18.6857035,8.37497656 18.0298814,8.37497656 L4.27178759,8.37497656 L5.80715872,6.9204955 C6.27092092,6.48121867 6.27092092,5.7688657 5.80715872,5.32951387 C5.34355486,4.89016204 4.59162359,4.89016204 4.12778222,5.32951387 L0.565490039,8.70430293 C0.537939809,8.73032804 0.511972926,8.75755316 0.48727272,8.78605328 C0.481256003,8.7930283 0.476110127,8.80052834 0.470251745,8.80765337 C0.452122427,8.82947846 0.434309779,8.85137855 0.418001309,8.87447864 C0.41325127,8.88122867 0.409372071,8.8883537 0.404701199,8.89517873 C0.388392729,8.91932883 0.372400929,8.94370393 0.357992476,8.96912904 C0.35522162,8.97415406 0.352925767,8.97947908 0.350154911,8.9845041 C0.335192286,9.01202922 0.320783833,9.03992933 0.308196228,9.06872945 C0.306612881,9.07225447 0.305504539,9.07600448 0.304000359,9.0796045 C0.291096085,9.10990462 0.279141819,9.14057975 0.269008401,9.17215488 C0.267662557,9.1761299 0.266950051,9.18025492 0.265762541,9.18430493 C0.256183294,9.21528006 0.247395721,9.24655519 0.240666498,9.27858033 C0.238687315,9.28810537 0.237816475,9.29793041 0.235995626,9.30753045 C0.231087252,9.33408056 0.226178878,9.36063067 0.223408021,9.38770578 C0.219370488,9.42483094 0.217391304,9.46233109 0.217391304,9.49998125 C0.217391304,9.53763141 0.219370488,9.57513156 0.223408021,9.61233172 C0.226178878,9.63978183 0.231245586,9.66655694 0.236074793,9.69333206 C0.237816475,9.70263209 0.238687315,9.71215713 0.240666498,9.72138217 C0.247474888,9.75370731 0.256183294,9.78528244 0.265841708,9.81655757 C0.267029218,9.82023258 0.267741724,9.8241326 0.268929234,9.82780762 C0.279141819,9.85953275 0.291096085,9.89050788 0.304158694,9.921108 C0.305583706,9.92440802 0.306612881,9.92793303 0.30811706,9.93123305 C0.320783833,9.96025817 0.335271453,9.98830828 0.350392413,10.0159834 C0.353004934,10.0208584 0.35522162,10.0259584 0.357913309,10.0308335 C0.372480097,10.0564086 0.388551064,10.0810087 0.405097035,10.1053838 C0.409530406,10.1119838 0.413330437,10.1189588 0.417922142,10.1254089 C0.434309779,10.148584 0.452280762,10.170634 0.470330912,10.1925341 C0.476110127,10.1995842 0.481256003,10.2070092 0.487193553,10.2139092 C0.511972926,10.2423343 0.537939809,10.2696345 0.565410871,10.2956596 L4.12770306,13.6704486 C4.35958416,13.8901995 4.66350752,14 4.96743089,14 C5.27135425,14 5.57527762,13.8901995 5.80707955,13.6704486 C6.27084175,13.2310968 6.27084175,12.5188188 5.80707955,12.079467 L4.27178759,10.6249859 Z" id="XMLID_4_"></Path>
                    <Path d="M17.034607,0 C13.9704109,0 11.1195051,1.57263592 9.40831806,4.20667721 C9.06256323,4.73896708 9.19936838,5.46055859 9.7138845,5.81833481 C10.2284755,6.17603361 10.9258974,6.03465742 11.2718019,5.5022127 C12.5650896,3.511255 14.7193967,2.32264203 17.034607,2.32264203 C20.8599875,2.32271946 23.9722301,5.54239574 23.9722301,9.5 C23.9722301,13.4576043 20.8599875,16.6772805 17.034607,16.6772805 C14.726207,16.6772805 12.5754174,15.4940098 11.2811567,13.5121107 C10.93398,12.9805951 10.2363335,12.8409222 9.72249096,13.1999372 C9.20879806,13.5590297 9.07363935,14.2809309 9.42074128,14.8123691 C11.1331258,17.4345645 13.9793915,19 17.034607,19 C22.0979694,19 26.2173913,14.7383518 26.2173913,9.5 C26.2173913,4.26164823 22.0979694,0 17.034607,0 Z" id="XMLID_5_"></Path>
                </G>
            </G>
        </G>
      </Svg>
    );
  }
}