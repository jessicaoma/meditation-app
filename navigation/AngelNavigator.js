import {createSwitchNavigator} from 'react-navigation';
import AngelCartasScreen from '../screens/AngelCartasScreen';
import AngelScreen from '../screens/AngelScreen';

const AngelNavigator = createSwitchNavigator(
  {
    Cartas: AngelCartasScreen,
    Angel: AngelScreen,
  },
  {
    initialRouteName: 'Cartas',
  },
);

export default AngelNavigator;
