import {createStackNavigator} from 'react-navigation';
import CategoriaScreen from '../screens/CategoriaScreen';
import ViajeScreen from '../screens/ViajeScreen';
import PasoAScreen from '../screens/PasoAScreen';
import PasoBScreen from '../screens/PasoBScreen';
import PasoCScreen from '../screens/PasoCScreen';
import PasoDScreen from '../screens/PasoDScreen';
import PasoEScreen from '../screens/PasoEScreen';
import PasoFScreen from '../screens/PasoFScreen';
import PasoGScreen from '../screens/PasoGScreen';
//import PasoH from '../screens/PasoH';
import PasoI from '../screens/PasoI';
// import PasoJ from '../screens/PasoJ';
import PasoK from '../screens/PasoK';

const ViajeNavigator = createStackNavigator(
  {
    Categoria: CategoriaScreen,
    Viaje: ViajeScreen,
    PasoA: PasoAScreen,
    PasoB: PasoBScreen,
    PasoC: PasoCScreen,
    PasoD: PasoDScreen,
    // PasoE: PasoEScreen,
    // PasoF: PasoFScreen,
    // PasoG: PasoGScreen,
    //PasoH: PasoH,
    // PasoI,
    // PasoJ,
    PasoK,
  },
  {
    initialRouteName: 'Categoria',
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTitleStyle: {
        color: '#030303',
        fontFamily: 'MyriadPro-Semibold',
      },
    },
  },
);

export default ViajeNavigator;
