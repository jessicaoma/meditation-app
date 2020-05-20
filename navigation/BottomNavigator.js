import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AudiolibrosScreen from '../screens/AudiolibrosScreen';
import MeditacionesScreen from '../screens/MeditacionesScreen';
import CategoriasScreen from '../screens/CategoriasScreen';
import Colors from '../constants/Colors';
import AngelNavigator from './AngelNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function homeStack() {
  return (
    <Stack.Navigator screenOptions={{title: ''}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={HomeScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
}

function BottomNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.tabIconSelected,
        inactiveTintColor: Colors.tabIconDefault,
      }}
      screenOptions={{unmountOnBlur: true}}>
      <Tab.Screen
        name="Inicio"
        component={homeStack}
        options={{
          title: 'Inicio',
          tabBarIcon: ({color}) => (
            <TabBarIcon name={'inicio'} tintColor={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Categorias"
        component={CategoriasScreen}
        options={{
          title: 'Cursos',
          tabBarIcon: ({color}) => (
            <TabBarIcon name={'viajes'} tintColor={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Meditar"
        component={MeditacionesScreen}
        options={{
          title: 'Medita',
          tabBarIcon: ({color}) => (
            <TabBarIcon name={'meditar'} tintColor={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Audiolibros"
        component={AudiolibrosScreen}
        options={{
          title: 'Audiolibros',
          tabBarIcon: ({color}) => (
            <TabBarIcon name={'audiolibros'} tintColor={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AngelStack"
        component={AngelNavigator}
        options={{
          title: 'Mensajes',
          tabBarIcon: ({color}) => (
            <TabBarIcon name={'angel'} tintColor={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
