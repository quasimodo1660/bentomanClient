import React from 'react';
import NavBottom from './app/config/routes'
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import socket from './app/config/Socket'


export default class App extends React.Component {
  render() {
  return (
    <NavBottom />
  );
  }
}