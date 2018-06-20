import React from 'react';
import NavBottom from './app/config/routes'
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import socket from './app/config/Socket'
import { pushNotifications } from './app/services';




export default class App extends React.Component {
  componentDidMount(){
    pushNotifications.configure()
  }
  render() {
  return (
    <NavBottom />
  );
  }
}