import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import PropertyScreen from "../screens/PropertyScreen";
import Details from "../screens/Details";


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Results: PropertyScreen,
    Details: Details,
  },
  {
    headerMode: 'screen'
  },
);

export default HomeStack;
