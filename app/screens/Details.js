import React from 'react';
import { Button, View, Text } from 'react-native';

export default class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return{
      headerTitle: navigation.getParam('name','shaxixi'),
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#fff"
        />
      )
    };
    
  };  
  
  render() {

      const {navigation} = this.props;
      const name = navigation.getParam('name','ajj')
      const age = navigation.getParam('age','diao')

      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen</Text>
          <Text>name:{JSON.stringify(name)}</Text>
          <Text>age:{age}</Text>
          <Button 
            title='Go to Third'
            onPress={()=> this.props.navigation.navigate('Third')}
          />
        </View>
      );
    }
  }
  