import {createStackNavigator} from 'react-navigation';
import Categorias from '../screens/CategoriasScreen';
import Categoria from '../screens/CategoriaScreen';

const CategoriasNavigator = createStackNavigator(
  {
    Categorias: Categorias,
    Categoria: Categoria,
  },
  {
    initialRouteName: 'Categorias',
    navigationOptions: {},
  },
);

export default CategoriasNavigator;
