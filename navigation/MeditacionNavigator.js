import React from 'react';
import {createStackNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MeditacionScreen from '../screens/MeditacionScreen';
import MeditacionesScreen from '../screens/MeditacionesScreen';

const MeditacionNavigator = createStackNavigator(
  {
    Meditaciones: MeditacionesScreen,
    Meditacion: MeditacionScreen,
  },
  {
    initialRouteName: 'Meditaciones',
    navigationOptions: {
      tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={'md-link'} />
      ),
      headerBackTitle: null,
    },
  },
);

export default MeditacionNavigator;
