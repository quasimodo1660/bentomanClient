import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/Home'
import Third from '../screens/Third'
import Modal from '../screens/Modal'
import DetailsScreen from '../screens/Details'
import {userList,jsuser} from '../store/Store.js'


const MainStack = createStackNavigator(
    {
      Home: HomeScreen,
      // Details: DetailsScreen,
      Third:Third,
    },
    {
      initialRouteName: 'Home',
      
      navigationOptions:{
      headerStyle: {
        backgroundColor: '#fafafa',
      },
      headerTintColor: '#424242',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    
  },
    }  
)

const DetailsStack = createStackNavigator({
  Datails:DetailsScreen,
  Third:Third,
})



const MainRootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: Modal,
    },
  },
  {
    mode: 'card',
    headerMode: 'none',
  }
);

const NavBottom = createBottomTabNavigator(
  {
    Home:MainRootStack,
    Massaging:DetailsStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
          // icon=require('../assets/bm@3x.png')
        } else if (routeName === 'Massaging') {
          iconName = `ios-chatbubbles${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#fb6e1c',
      inactiveTintColor: 'gray',
    },
    passProps:{
      users:userList,
      user:jsuser
    }
  }
)

export default NavBottom;