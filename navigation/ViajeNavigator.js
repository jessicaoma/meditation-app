import {createStackNavigator} from 'react-navigation';
import ViajeScreen from '../screens/ViajeScreen';
import PasoScreen from '../screens/PasoScreen';

const ViajeNavigator = createStackNavigator(
  {
    Viaje: ViajeScreen,
    Paso: PasoScreen,
  },
  {
    initialRouteName: 'Viaje',
    navigationOptions: {
      //back
    },
  },
);

export default ViajeNavigator;
