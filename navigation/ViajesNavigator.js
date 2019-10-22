import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Categorias from '../screens/CategoriasScreen';
import Categoria from '../screens/CategoriaScreen';
import ViajeScreen from '../screens/ViajeScreen';
import PasoScreen from '../screens/PasoScreen';

import TabBarIcon from '../components/TabBarIcon';

const ViajesNavigator = createStackNavigator(
  {
    Categorias: Categorias,
    Categoria: Categoria,
    Viaje: ViajeScreen,
    Paso: PasoScreen,
  },
  {
    initialRouteName: 'Categorias',
    mode: 'card',
    navigationOptions: {
      tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={'md-link'} />
      ),
    },
  },
);

export default ViajesNavigator;
