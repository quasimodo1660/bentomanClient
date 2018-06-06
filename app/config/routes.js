import React from 'react'
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/Home'
import Third from '../screens/Third'
import Modal from '../screens/Modal'
import DetailsScreen from '../screens/Details'


const MainStack = createStackNavigator(
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
)





const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: Modal,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default RootStack;