import React from 'react';
import {createStackNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AngelCartasScreen from '../screens/AngelCartasScreen';
import AngelScreen from '../screens/AngelScreen';

const AngelNavigator = createStackNavigator(
  {
    Cartas: AngelCartasScreen,
    Angel: AngelScreen,
  },
  {
    initialRouteName: 'Cartas',
    navigationOptions: {
      tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={'md-link'} />
      ),
    },
  },
);

export default AngelNavigator;
