import {createStackNavigator} from 'react-navigation';
import ViajeScreen from '../screens/ViajeScreen';
import PasoAScreen from '../screens/PasoAScreen';
import PasoBScreen from '../screens/PasoBScreen';
import PasoCScreen from '../screens/PasoCScreen';
import PasoDScreen from '../screens/PasoDScreen';
import PasoEScreen from '../screens/PasoEScreen';
import PasoFScreen from '../screens/PasoFScreen';
import PasoGScreen from '../screens/PasoGScreen';

const ViajeNavigator = createStackNavigator(
  {
    Viaje: ViajeScreen,
    PasoA: PasoAScreen,
    PasoB: PasoBScreen,
    PasoC: PasoCScreen,
    PasoD: PasoDScreen,
    PasoE: PasoEScreen,
    PasoF: PasoFScreen,
    PasoG: PasoGScreen,
  },
  {
    initialRouteName: 'Viaje',
    defaultNavigationOptions: {
      headerBackTitle: null,
    },
  },
);

export default ViajeNavigator;
