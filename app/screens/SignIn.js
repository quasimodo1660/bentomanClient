import React from 'react';
import {
  AsyncStorage,
  Linking,
  Platform,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import config from '../config/config'
import axios from 'axios'
import { toJS } from 'mobx'
import { SocialIcon,Text,Divider } from 'react-native-elements'



export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    this._handleOpenURL = this._handleOpenURL.bind(this);
  } 

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }



  openURL = (url) =>{
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  }

  loginWithGithub = () => {
    this.openURL(config.githubLogin.url)
  }

  _handleOpenURL(event) {
    console.log(this)
    console.log(event.url.match(/\d+/g)[0]);
    axios.get('http://127.0.0.1:8000/accounts/renderUser/'+event.url.match(/\d+/g)[0]).then(res=>{
      console.log(res)
      AsyncStorage.setItem('StoreUser', JSON.stringify(toJS(res.data)));
      if (Platform.OS === 'ios') {
        SafariView.dismiss();
      }
    })
    this.props.navigation.navigate('App')
  }
  
  render() {
      return (
        <View style={styles.container}>
          <Image
            source={{uri:'https://i.imgur.com/Keg7X6S.png'}}
            style={{
              width:200,
              height:200,
              alignSelf: 'center',
            }}
          />
          <Text h3 style={styles.subtitle}>Welcome to</Text>
          <Text h1 style={styles.title}>BENTOMAN{'\n'}</Text>
          <Divider style={{ backgroundColor: 'white',marginBottom:30 }} />
          <SocialIcon
            title='Sign In With Facebook'
            button
            type='facebook'
          />
          <SocialIcon
            title='Sign In With Google'
            button
            type='google-plus-official'
          />
          <SocialIcon
            title='Sign In With Github'
            button
            type='github'
            onPress={this.loginWithGithub}
          />
        </View>
      );
    }
  
   
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FE8050',
      justifyContent: 'center',
      padding:15
    },
    subtitle:{
      alignSelf:'center',
      color:'white'
    },
    title:{
      alignSelf:'center',
      color:'white',
      fontWeight:'bold'
    },
  })

