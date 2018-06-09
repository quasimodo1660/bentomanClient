import React from 'react';
import { Button, View, Text } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';



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
           <Card>
    <CardImage 
      source={{uri: 'http://bit.ly/2GfzooV'}} 
      title="Top 10 South African beaches"
    />
    <CardTitle
      subtitle="Number 6"
    />
    <CardContent text="Clifton, Western Cape" />
    <CardAction 
      separator={true} 
      inColumn={false}>
      <CardButton
        onPress={() => {}}
        title="Share"
        color="#FEB557"
      />
      <CardButton
        onPress={() => {}}
        title="Explore"
        color="#FEB557"
      />
    </CardAction>
  </Card>
        </View>
      );
    }
  }
  