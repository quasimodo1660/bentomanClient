import React from 'react'
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/Home'
import Third from '../screens/Third'
import DetailsScreen from '../screens/Details'



const RootStack = createStackNavigator(
    {
      Home: HomeScreen,
      Details: DetailsScreen,
      Third:Third,
    },
    {
      initialRouteName: 'Home',
    }
  );

export default RootStack;