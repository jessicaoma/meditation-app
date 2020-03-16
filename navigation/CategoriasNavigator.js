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
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTitleStyle: {
        color: '#030303',
        fontFamily: 'MyriadPro-Semibold',
      },
    },
  },
);

export default CategoriasNavigator;
