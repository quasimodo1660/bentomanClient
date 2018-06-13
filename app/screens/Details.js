import React from 'react';
import { Button, View,Text } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import SocketIOClient from 'socket.io-client';



export default class DetailsScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.socket=SocketIOClient('http:///127.0.0.1:6789');
    this.jsuser={}
  }
  static navigationOptions = ({navigation}) => {
    return{
      headerTitle: 'Messaging'
    
    };  
  } 
  componentDidMount(){
    this.socket.on('connect',()=>{
      this.socket.emit('authentication',this.jsuser)
    })
  
  }


  render() {
   

    return(
     <View>
       <Text>sbb</Text>
     </View>
    );
  }
}  