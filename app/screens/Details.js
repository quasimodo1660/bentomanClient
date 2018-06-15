import React from 'react';
import { Button, View,Text } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import {jsuser, userList} from '../store/Store.js'
import { observable } from 'mobx'



// @observable
export default class DetailsScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    
  }
  static navigationOptions = ({navigation}) => {
    return{
      headerTitle: 'Messaging'
    
    };  
  } 
  componentDidMount(){
    console.log(userList.getUserList())
  }

 
  render() {
   
    
    return(
     <View>
       <Text>{userList.getUserList().length}</Text>
     </View>
    );
  }
}  