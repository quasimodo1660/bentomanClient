import React from 'react';
import {
  AsyncStorage,
  Linking,
  Platform,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import config from '../config/config'
import axios from 'axios'
import { toJS } from 'mobx'

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    this._handleOpenURL = this._handleOpenURL.bind(this);
  } 



    static navigationOptions = {
      title: 'Please sign in',
    };

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
          <Icon.Button
            name="github"
            backgroundColor="#3b5998"
            onPress={this.loginWithGithub}
            // {...iconStyles}
          >
            Login with Github
          </Icon.Button>
        </View>
      );
    }
  
   
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: 'white'
    },
  })