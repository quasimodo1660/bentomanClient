import React from 'react';
import { StyleSheet,Button, AsyncStorage,Image,ScrollView,Text, } from 'react-native';
import socket from '../config/Socket.js'

export default class ProfileScreen extends React.Component {
    constructor(props) {
      super(props);     
    }
    static navigationOptions = ({navigation}) => {
        return{
          headerTitle: 'Profile'
        
        };  
    }
    
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        socket._closeConnection()
        this.props.navigation.navigate('Auth');
    }; 
    
    render(){
        return(
            <ScrollView style={styles.container}>
                <Button
                    title="Sign Out"
                    onPress={this._signOutAsync}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: 'white'
    },
  })