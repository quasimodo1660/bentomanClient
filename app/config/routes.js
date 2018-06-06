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
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
  );

export default RootStack;