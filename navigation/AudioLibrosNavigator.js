import React from 'react';
import {createStackNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AudiolibrosScreen from '../screens/AudiolibrosScreen';
import AudiolibroScreen from '../screens/AudiolibroScreen';

const AudiolibroNavigator = createStackNavigator(
  {
    Audiolibros: AudiolibrosScreen,
    Audiolibro: AudiolibroScreen,
  },
  {
    initialRouteName: 'Audiolibros',
    mode: 'card',
    navigationOptions: {
      tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={'md-link'} />
      ),
    },
  },
);

export default AudiolibroNavigator;
