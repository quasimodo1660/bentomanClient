import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import socket from '../config/Socket'
import {jsuser} from '../store/Store'



export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('StoreUser'));
    if(user){
      jsuser.InitUser(user.user_id,user.user_name,user.img)
      socket._openConnection()
      console.log(jsuser.getUser())
    }
    else{
      socket._closeConnection()
    } 
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(user ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})