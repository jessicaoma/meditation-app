import React, {Component} from 'react';
import Svg, {G, Path, Polygon} from 'react-native-svg';
import colors from './Colors';

/**
 * @typedef Props
 * @prop {string} tintColor Color to used
 *
 * @extends {Component<Props>}
 */
export default class LogoAppHeader extends Component {
  render() {
    return (
      <Svg width="192px" height="44px" ViewBox="0 0 191.51 43.56">
        <G id="Layer_2" data-name="Layer 2"><G id="Layer_1-2" data-name="Layer 1"><G id="Layer_2-2" data-name="Layer 2"><G id="Layer_1-2-2" data-name="Layer 1-2">
        <Path stroke="transparent" fill="#97a3ce" class="cls-1" 
          d="M39,22.88a1.81,1.81,0,0,1,0-2.22,9.56,9.56,0,0,0-8.13-14.6A2.39,2.39,0,0,1,28.4,4.6,9.47,9.47,0,0,0,18.31.19c-3.56.72-5.74,3-7.23,6.1a11.93,11.93,0,0,0-2.45-.19A9.61,9.61,0,0,0,1.45,20.64a1.8,1.8,0,0,1,.06,2.22,9.06,9.06,0,0,0,0,10,9.11,9.11,0,0,0,8.25,4.6,2.11,2.11,0,0,1,2.18,1.3,9.5,9.5,0,0,0,10.14,4.6c3.56-.71,5.75-3,7.26-6.06a8.86,8.86,0,0,0,9.2-3.84A9.11,9.11,0,0,0,39,22.9M33.18,10.08a5.37,5.37,0,0,1,3.7,6.31l-4.81-1.46,1.11-4.85M29.08,6.4a9.43,9.43,0,0,1-5.87,12.22c-1.05.33-1.5.1-1.77-1C20.2,12.69,23.78,7.33,29.08,6.4M23.93,4.67,20.24,8.08,16.6,4.76c1.64-2,4.92-2,7.33-.08m-13,2.94c.08-.42.15-.84.22-1.25A9.43,9.43,0,0,1,19,17.58c-.27,1.25-.81,1.37-1.88,1a9.67,9.67,0,0,1-6.25-11M7.23,10.06l1.12,4.85L3.59,16.39a5.36,5.36,0,0,1,3.65-6.34m0,23.36C4.79,33,3,30,3.61,27.23a1.59,1.59,0,0,1,.48,0c1.41.47,2.82,1,4.25,1.44L7.28,33.4M2.51,21.86c3.13-4.73,11.28-4.6,14.31,0a9.32,9.32,0,0,1-14.31,0m8.82,15.25A9.46,9.46,0,0,1,17.12,25c1.1-.36,1.6-.2,1.89,1a9.41,9.41,0,0,1-7.69,11.15m5.15,1.81,3.73-3.47,3.67,3.38c-1.89,1.9-4.77,2-7.4.09m12.84-1.69A9.36,9.36,0,0,1,21.94,24.5h0c3.9,1.12,6.74,3.4,7.49,7.54a23.67,23.67,0,0,1-.16,5.21m3.89-3.69-1.12-4.89,4.7-1.48c.77,2.54-.75,5.28-3.59,6.36M23.62,21.73a9.34,9.34,0,0,1,14.31-.1c-2.58,4.65-10.88,4.77-14.31.1"/>
        <Path stroke="#b281b1" fill="#b281b1" class="cls-2"
          d="M20.25,20.42a3.71,3.71,0,0,1,.41-.39,1.07,1.07,0,0,1,1.68.66,1.62,1.62,0,0,1-.46,1.51c-.32.32-.66.61-1,.91l-.63.57-1.47-1.32a1.76,1.76,0,0,1-.57-.88,1.69,1.69,0,0,1,0-.89,1.1,1.1,0,0,1,1.75-.51,3.81,3.81,0,0,1,.3.32"/>
        <Path stroke="transparent" fill="#97a3ce" class="cls-1"
          d="M137.24,18.68a5,5,0,0,0-3.13,1,5.36,5.36,0,0,0-1.57,2,4.46,4.46,0,0,0-1.39-2.1,4.6,4.6,0,0,0-2.94-.91A4.79,4.79,0,0,0,123.92,21l-.07-2h-1.06v4.68h0l0,.25v.63h0a8.76,8.76,0,0,1-2.9,6.3,5.11,5.11,0,0,1-1.26.72,5.92,5.92,0,0,1-2.22.44A4.17,4.17,0,0,1,113,30.38a6.06,6.06,0,0,1-1.33-4V25.7h9.91V24.42a6,6,0,0,0-1.39-4.17,4.87,4.87,0,0,0-3.74-1.55,5.4,5.4,0,0,0-4.26,2,7,7,0,0,0-1.61,3.88h-3.69V15.35h-1.17v4a7.3,7.3,0,0,1,0,.8v4.41h-3.39v1.16h3.4v3.47a4.74,4.74,0,0,0,.75,3,2.73,2.73,0,0,0,2.24,1,7.19,7.19,0,0,0,.78,0,3.56,3.56,0,0,0,.69-.15l.21-.07-.22-1-.22,0-.71.09-.57,0a1.55,1.55,0,0,1-1.29-.61,3.62,3.62,0,0,1-.5-2.19V25.69h3.63v.71a7,7,0,0,0,1.69,4.79,5.4,5.4,0,0,0,4.18,1.92,6.7,6.7,0,0,0,2.75-.52,6.23,6.23,0,0,0,1.19-.7h0l.19-.16h0l.19-.17A9.54,9.54,0,0,0,124,23.86a5.73,5.73,0,0,1,1.34-2.91,3.77,3.77,0,0,1,2.94-1.1,3.22,3.22,0,0,1,2.58,1.1,6.07,6.07,0,0,1,1,3.85c0,.15,0,.3,0,.46a2.25,2.25,0,0,0,0,.3c0,.06,0,.12,0,.18v7.11H133V25q0-.27,0-.53l0-.48a5.82,5.82,0,0,1,1.33-3,3.8,3.8,0,0,1,3-1.13,3.24,3.24,0,0,1,2.6,1.12,6.13,6.13,0,0,1,1,4v7.92H142V24.94a7.58,7.58,0,0,0-1.21-4.72A4.32,4.32,0,0,0,137.24,18.68Zm-16.76,5.85h-8.64a5.62,5.62,0,0,1,1.43-3.32,4.17,4.17,0,0,1,3.24-1.37,3.56,3.56,0,0,1,2.9,1.26,4.92,4.92,0,0,1,1.07,3.26Z"/>
        <Path stroke="transparent" fill="#97a3ce"class="cls-1" 
          d="M149.65,18.69a5.39,5.39,0,0,0-2.85.74,5.26,5.26,0,0,0-1.5,1.36l-.11-1.85h-1v4.28a.39.39,0,0,0,0,.14v5.46a.45.45,0,0,0,0,.11V38h1.16V31.29a5.12,5.12,0,0,0,1.47,1.17,6,6,0,0,0,2.84.66,4.59,4.59,0,0,0,3.89-1.91,8.28,8.28,0,0,0,1.39-5.06v-.28a8.81,8.81,0,0,0-1.39-5.21A4.57,4.57,0,0,0,149.65,18.69Zm4.13,7.18v.26a7.57,7.57,0,0,1-1.07,4.28,3.38,3.38,0,0,1-3,1.53,4.88,4.88,0,0,1-2.77-.73,4.12,4.12,0,0,1-1.55-1.93V23a5.28,5.28,0,0,1,1.48-2.22,4.11,4.11,0,0,1,2.82-.89,3.37,3.37,0,0,1,3,1.63A8.11,8.11,0,0,1,153.78,25.87Z"/>
        <Polygon stroke="transparent" fill="#97a3ce" class="cls-1" 
          points="156.8 26.75 156.8 26.75 156.8 32.84 157.95 32.84 157.95 27.23 157.95 26.75 157.95 13.01 156.8 13.01 156.8 26.75"/>
        <Path stroke="transparent" fill="#97a3ce" class="cls-1"
          d="M170.53,25.69V24.42a6,6,0,0,0-1.39-4.17,4.87,4.87,0,0,0-3.74-1.55,5.4,5.4,0,0,0-4.26,2,7.34,7.34,0,0,0-1.68,5v.79a7,7,0,0,0,1.69,4.79,5.4,5.4,0,0,0,4.18,1.9,6.7,6.7,0,0,0,2.75-.52,5.67,5.67,0,0,0,1.9-1.34l.13-.14-.64-.93-.21.22a4.74,4.74,0,0,1-1.72,1.13,5.92,5.92,0,0,1-2.22.44A4.17,4.17,0,0,1,162,30.38a6.06,6.06,0,0,1-1.33-4V25.7Zm-9.79-1.16a5.62,5.62,0,0,1,1.43-3.32,4.17,4.17,0,0,1,3.24-1.37,3.56,3.56,0,0,1,2.9,1.26,4.92,4.92,0,0,1,1.07,3.26v.17Z"/>
        <Path stroke="transparent" fill="#97a3ce" class="cls-1" 
          d="M67.55,33a8.57,8.57,0,0,1-.28-1.87c0-2.29,0-4.7,0-7.39a4.4,4.4,0,0,0-3.36-4.46,8,8,0,0,0-5,.29A24.93,24.93,0,0,0,49.18,25a.86.86,0,0,1-.88.14h0a.79.79,0,0,1,0-.26,1.57,1.57,0,0,0,0-.26c0-3.21,0-6.84,0-10.37a1,1,0,0,0-.22-.73,1,1,0,0,0-.75-.18h-.08c-.4,0-.91,0-.9.88,0,6,0,12.11,0,18.81a.94.94,0,0,0,.22.71,1,1,0,0,0,.76.21,1,1,0,0,0,.77-.22.92.92,0,0,0,.2-.7c0-1.58,0-3.2,0-4.76v-.91a1.24,1.24,0,0,0,0-.18s0-.08,0-.11h.18a1.1,1.1,0,0,1,1.05.3c.71.81,1.46,1.61,2.18,2.38s1.65,1.77,2.44,2.68a5.62,5.62,0,0,0,4.4,2h.12c2.35,0,4.8-.23,6.77-1.94.35,1.43.53,1.53,2,1.38l.27,0-.05-.26C67.63,33.37,67.59,33.19,67.55,33Zm-2.36-7.95c-.13.13-.55.14-1.24.14H63a9.58,9.58,0,0,0-3.62.41c-1.48.56-3.21,1.5-3.46,3.83a4.47,4.47,0,0,0,.53,2.65l.09.13a2,2,0,0,1-.22-.22l-.9-1c-1.43-1.57-2.91-3.2-4.38-4.78-.2-.22-.19-.22,0-.44a5,5,0,0,1,1-.73l.09-.05a37.8,37.8,0,0,1,7.55-3.69A7.18,7.18,0,0,1,62,20.93a5,5,0,0,1,1.28.16,2.49,2.49,0,0,1,2.07,2.68C65.32,24.49,65.32,24.92,65.19,25.05Zm-6.33,3a5.32,5.32,0,0,1,2.94-1h3.5a.31.31,0,0,1,0,.12,4.55,4.55,0,0,1-1.39,4,4.67,4.67,0,0,1-4.2,1,2.22,2.22,0,0,1-1.83-1.77A2.1,2.1,0,0,1,58.85,28.06Z"/>
        <Path stroke="transparent" fill="#97a3ce" class="cls-1" 
          d="M97.27,19.8a5.36,5.36,0,0,0-4.49-.62,5,5,0,0,0-3.07,2.3,4.67,4.67,0,0,0-3.54-2.41,5.68,5.68,0,0,0-4.81,1.53,1.39,1.39,0,0,1,0-.42.82.82,0,0,0-.14-.7.92.92,0,0,0-.78-.21h-.1c-.36,0-.85,0-.84.84,0,4.29,0,8.64,0,12.91a.93.93,0,0,0,.22.7,1,1,0,0,0,.78.21,1,1,0,0,0,.78-.22,1,1,0,0,0,.21-.7c0-1.53,0-3.09,0-4.6V25.23a5,5,0,0,1,.44-2.07A3.5,3.5,0,0,1,86,21c1.43.23,2.29,1.37,2.43,3.2.17,2.19.14,4.41.12,6.58,0,.76,0,1.52,0,2.28a1,1,0,0,0,.22.73.9.9,0,0,0,.7.16h.17c.34,0,.84,0,.82-.86,0-1.53,0-3.11,0-4.62V25.22a4.87,4.87,0,0,1,1.06-3.09A3.42,3.42,0,0,1,95.2,21a2.71,2.71,0,0,1,2.15,2.33,8.67,8.67,0,0,1,.22,1.94v7.84a.84.84,0,0,0,.24.71.66.66,0,0,0,.59.07.83.83,0,0,1,.26,0L99,34a.54.54,0,0,0,.36-.12.71.71,0,0,0,.21-.59c0-1,0-2,0-3a55,55,0,0,0-.16-6.46A5.38,5.38,0,0,0,97.27,19.8Z"/>
        <Path stroke="transparent" fill="#97a3ce" class="cls-1" 
          d="M77.51,19.41a.47.47,0,0,0-.41-.13,3.51,3.51,0,0,1-1.05-.14,4.6,4.6,0,0,0-1-.16,5.15,5.15,0,0,0-3.92,1.6,1.57,1.57,0,0,1,0-.4A.82.82,0,0,0,71,19.5a.85.85,0,0,0-.68-.22h-.22a.75.75,0,0,0-.63.14.78.78,0,0,0-.17.66v3.29c0,3.15,0,6.42,0,9.62a1,1,0,0,0,.22.78.91.91,0,0,0,.73.18c.5,0,1-.06,1-1,0-2.61,0-5.27,0-7.85V25a4.27,4.27,0,0,1,1.32-3.12,3.58,3.58,0,0,1,2.72-1c.4,0,.46.07.46.49,0,2.43,0,4.91,0,7.3v4.23a1.06,1.06,0,0,0,.2.78.94.94,0,0,0,.69.22h0c.91,0,1-.49,1-1.07,0-1.65,0-3.33,0-5V20a.7.7,0,0,1,0-.1A.59.59,0,0,0,77.51,19.41Z"/>
        <Path stroke="transparent" fill="#97a3ce" class="cls-1" 
          d="M76.84,16a1,1,0,0,0-1.1,1.07,1,1,0,0,0,.87,1.07h.2a1,1,0,0,0,1.06-1.07v0a1,1,0,0,0-1-1Z"/>
        <Path stroke="transparent" fill="#97a3ce" class="cls-1"
          d="M178,32.39q-.05-.26-.08-.46a3.34,3.34,0,0,1,0-.4,2.44,2.44,0,0,1-.76.69,2,2,0,0,1-1,.28,1.88,1.88,0,0,1-1.37-.46,1.69,1.69,0,0,1-.47-1.27,1.48,1.48,0,0,1,.66-1.29,3.09,3.09,0,0,1,1.81-.46h1.14v-.57a1.05,1.05,0,0,0-.31-.8,1.21,1.21,0,0,0-.88-.29,1.26,1.26,0,0,0-.82.25.77.77,0,0,0-.31.61h-1v0a1.37,1.37,0,0,1,.59-1.15,2.43,2.43,0,0,1,1.61-.52,2.37,2.37,0,0,1,1.57.5,1.75,1.75,0,0,1,.59,1.43v2.77a5.39,5.39,0,0,0,0,.59,3.07,3.07,0,0,0,.12.56Zm-1.74-.77a1.86,1.86,0,0,0,1-.29,1.39,1.39,0,0,0,.59-.67v-.93h-1.17a1.52,1.52,0,0,0-1,.32,1,1,0,0,0-.38.75.79.79,0,0,0,.24.61,1,1,0,0,0,.71.22Z"/>
        <Path stroke="transparent" fill="#97a3ce" class="cls-1" 
          d="M185.33,29.74a3.17,3.17,0,0,1-.59,2,2,2,0,0,1-1.64.76,2.28,2.28,0,0,1-.93-.18,1.78,1.78,0,0,1-.68-.54V34.6h-1V26.65h.8l.16.74a1.9,1.9,0,0,1,.7-.63,2.09,2.09,0,0,1,1-.22,1.91,1.91,0,0,1,1.66.85,3.83,3.83,0,0,1,.59,2.24Zm-1.05-.11a3,3,0,0,0-.39-1.61,1.25,1.25,0,0,0-1.13-.63,1.4,1.4,0,0,0-.77.2,1.53,1.53,0,0,0-.52.56v2.78a1.49,1.49,0,0,0,.52.55,1.44,1.44,0,0,0,.78.2,1.29,1.29,0,0,0,1.12-.54,2.39,2.39,0,0,0,.38-1.41Z"/>
        <Path stroke="transparent" fill="#97a3ce" class="cls-1" 
          d="M191.51,29.74a3.17,3.17,0,0,1-.59,2,2,2,0,0,1-1.64.76,2.28,2.28,0,0,1-.93-.18,1.78,1.78,0,0,1-.68-.54V34.6h-1V26.65h.8l.16.74a1.9,1.9,0,0,1,.7-.63,2.09,2.09,0,0,1,1-.22,1.91,1.91,0,0,1,1.66.85,3.85,3.85,0,0,1,.59,2.24Zm-1-.11a3,3,0,0,0-.39-1.61,1.25,1.25,0,0,0-1.13-.63,1.4,1.4,0,0,0-.77.2,1.53,1.53,0,0,0-.52.56v2.78a1.49,1.49,0,0,0,.52.55,1.44,1.44,0,0,0,.78.2,1.29,1.29,0,0,0,1.12-.54,2.39,2.39,0,0,0,.38-1.41Z"/></G></G></G></G>
      </Svg>
    );
  }
}