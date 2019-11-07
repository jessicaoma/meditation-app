import {createStackNavigator} from 'react-navigation';
import Categorias from '../screens/CategoriasScreen';
import Categoria from '../screens/CategoriaScreen';
import ViajeScreen from '../screens/ViajeScreen';
import PasoScreen from '../screens/PasoScreen';

const ViajesNavigator = createStackNavigator(
  {
    Categorias: Categorias,
    Categoria: Categoria,
    Viaje: ViajeScreen,
    Paso: PasoScreen,
  },
  {
    initialRouteName: 'Categorias',
    navigationOptions: {},
  },
);

export default ViajesNavigator;
