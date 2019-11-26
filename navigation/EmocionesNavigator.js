import {createSwitchNavigator} from 'react-navigation';
import EmocionesScreen from '../screens/EmocionesScreen';
import EmocionScreen from '../screens/EmocionScreen';

const EmocionesNavigator = createSwitchNavigator(
  {
    Emociones: EmocionesScreen,
    Emocion: EmocionScreen,
  },
  {
    initialRouteName: 'Emociones',
  },
);

export default EmocionesNavigator;
