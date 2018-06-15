import React from 'react';
import { Button, View,Text } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import {jsuser, userList} from '../store/Store.js'
import { observer } from 'mobx-react/native'
import { autorun } from 'mobx'



@observer
export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    
  }
  static navigationOptions = ({navigation}) => {
    return{
      headerTitle: 'Messaging'
    
    };  
  } 
  componentDidMount(){
    
  }

 
  render() {
   
    return(  
     <View>
       <Text>sbb</Text>
       <Text>{userList.getUserList().length}</Text>
    </View>
    );
  }
}  