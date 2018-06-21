import React from 'react';
import RootNav from './app/config/routes'
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
// import socket from './app/config/Socket'
import { pushNotifications } from './app/services';


pushNotifications.configure()

export default class App extends React.Component {
  render() {
  return (
    <RootNav />
  );
  }
}