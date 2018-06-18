import React from 'react';
import { StyleSheet,Dimensions,Image,ScrollView,ActivityIndicator,Text } from 'react-native';
import { observer } from 'mobx-react/native'
import {jsuser, conversation} from '../store/Store.js'
import { GiftedChat } from 'react-native-gifted-chat'



@observer
export default class ChatScreen extends React.Component {
    constructor(props){
        super(props)
    }

    static navigationOptions = ({navigation}) => {
        return{
          title: navigation.getParam('chatTitle','shaxixi'),
        };     
    }; 

   
    onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }
    
    render() {
        return (
          <GiftedChat
            messages={conversation.getConversation()}
            onSend={messages => 
                {this.onSend(messages)
                console.log(this.state.messages)}}
            // user={{
            //   _id: 1,
            // }}
          />
        )
      }
    
}