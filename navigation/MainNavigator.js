import {createStackNavigator} from 'react-navigation';

import MeditacionScreen from '../screens/MeditacionScreen';
import AudiolibroScreen from '../screens/AudiolibroScreen';
import BottomNavigator from './BottomNavigator';

const MainNavigator = createStackNavigator(
  {
    Main: {screen: BottomNavigator, navigationOptions: {header: null}},
    Meditacion: {
      screen: MeditacionScreen,
      navigationOptions: {},
    },
    Audiolibro: {screen: AudiolibroScreen, navigationOptions: {}},
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTitleStyle: {
        // #Editar aca va los estilos, si no te funciona se debera colocar esta propiedad en el navigationOptions de cada pantalla
      },
    },
  },
);

export default MainNavigator;
