import React from 'react';
import { StyleSheet,Dimensions,Image,ScrollView,ActivityIndicator,Text } from 'react-native';
import { observer } from 'mobx-react/native'
import {jsuser, conversation} from '../store/Store.js'
import { GiftedChat,Bubble } from 'react-native-gifted-chat'
import socket from '../config/Socket.js'



@observer
export default class ChatScreen extends React.Component {
    constructor(props){
        super(props)
        this.chater=this.props.navigation.getParam('chaterID')
    }

    static navigationOptions = ({navigation}) => {
        return{
          title: navigation.getParam('chatTitle','shaxixi'),
        };     
    }; 

   
    onSend(messages,chater) {
        console.log(messages)
        socket.sendMessage(messages[0],chater)
      }
    
    renderBubble= (props) => {
      return (
        <Bubble  
          {...props}      
          textStyle={{
            left: {
              color: '#c48843'
            }
          }}
          wrapperStyle={{
            left: {
              backgroundColor: '#ffe6cb',
            },
          }}
        />
      );
    }


    
    render() {
        return (
          <GiftedChat
            messages={conversation.getConversation()}
            onSend={messages => 
                {this.onSend(messages,this.chater)}
            }
            user={{
              _id: jsuser.getUser().user_id,
              name:jsuser.getUser().username,
              avatar:jsuser.getUser().img
            }}
            renderBubble={this.renderBubble}
          />
        )
      }
    
}