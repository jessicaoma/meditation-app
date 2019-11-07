import {createStackNavigator} from 'react-navigation';
import AngelCartasScreen from '../screens/AngelCartasScreen';
import AngelScreen from '../screens/AngelScreen';

const AngelNavigator = createStackNavigator(
  {
    Cartas: AngelCartasScreen,
    Angel: AngelScreen,
  },
  {
    initialRouteName: 'Cartas',
    navigationOptions: {},
  },
);

export default AngelNavigator;
