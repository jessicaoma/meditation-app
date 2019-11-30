import {createStackNavigator} from 'react-navigation';
import ViajeScreen from '../screens/ViajeScreen';
import PasoScreenA from '../screens/PasoScreenA';
import PasoScreenB from '../screens/PasoScreenB';
import PasoScreenC from '../screens/PasoScreenC';
import PasoScreenD from '../screens/PasoScreenD';
import PasoScreenE from '../screens/PasoScreenE';
import PasoScreenF from '../screens/PasoScreenF';
import PasoScreenG from '../screens/PasoScreenG';

const ViajeNavigator = createStackNavigator(
  {
    Viaje: ViajeScreen,
    PasoA: PasoScreenA,
    PasoB: PasoScreenB,
    PasoC: PasoScreenC,
    PasoD: PasoScreenD,
    PasoE: PasoScreenE,
    PasoF: PasoScreenF,
    PasoG: PasoScreenG,
  },
  {
    initialRouteName: 'Viaje',
    defaultNavigationOptions: {
      headerBackTitle: null,
    },
  },
);

export default ViajeNavigator;
