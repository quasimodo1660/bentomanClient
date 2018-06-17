import React from 'react';
import { StyleSheet,Dimensions,Image,ScrollView,ActivityIndicator,Text } from 'react-native';
import { observer } from 'mobx-react/native'
import {jsuser, userList} from '../store/Store.js'

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
    
    render(){
        return(
            <Text>sbb</Text>
        )     
    }
}