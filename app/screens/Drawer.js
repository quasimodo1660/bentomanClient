import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Button,
  View
} from 'react-native';

export default class SideNav extends React.Component {
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      };
    
    render(){
        return (
            <View>
                <Button
                    title="Sign Out"
                    onPress={this._signOutAsync}
                />
            </View>
        )
    }

}