import React from 'react';
import { Image,Button, View, Text } from 'react-native';
import LogoTitle from '../components/Logo'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'BENTOMAN',    
    // headerLeft: <LogoTitle />,
    // headerRight:(
    //   <Ionicons
    //     name='ios-add-circle' 
    //     size={25}
    //     color='orange'
    //     onPress = {()=> this.props.navigation.navigate('Third')}
    //   />
    // ),
  };
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
          {/* <Button
            title="Go to Details"
            onPress={() => this.props.navigation.push('Details',{name:'sb',age:'da sha cha'})}
          /> */}
          <Button
            title="Go to Third"
            onPress={() => this.props.navigation.navigate('Third')}
          />
        </View>
      );
    }
  }

