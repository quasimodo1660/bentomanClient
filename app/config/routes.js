import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createStackNavigator,createSwitchNavigator,createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/Home'
import Third from '../screens/Third'
import Modal from '../screens/Modal'
import DetailsScreen from '../screens/Details'
import AuthLoadingScreen from '../screens/AuthLoading'
import SignInScreen from '../screens/SignIn'
import ChatScreen from '../screens/Chat.js'
import SideNav from '../screens/Drawer'
import ProfileScreen from '../screens/Profile'
import AddBento from '../screens/AddOne'

const MainStack = createStackNavigator(
    {
      Home: HomeScreen,
      // Details: DetailsScreen,
      Third: Third,
      AddNew: AddBento,
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
  ChatWindow:ChatScreen,
  sideBar:SideNav
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

const ProfileStack = createStackNavigator(
  { Profile:ProfileScreen}
)



const AppStack = createBottomTabNavigator(
  {
    Home:MainRootStack,
    Massaging:DetailsStack,
    Profile:ProfileStack
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
        else{
          iconName = `ios-person${focused ? '' : '-outline'}`;
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
  }
)

// const AppStack = createDrawerNavigator(
//   {
//     Tabs:{
//       screen:NavTab
//     }

//   },
//   {
//     headerMode: 'none',
//     navigationOptions: {
//       header: (props) => ({
//           left: <Ionicons name='os-aperture-outline' />
//       }),
//   },
//   } 
// )




// const AuthStack = createStackNavigator({SignIn:SignInScreen})




const RootNav = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: SignInScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

export default RootNav