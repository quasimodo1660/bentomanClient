import React from 'react';
import { Button, View, Text } from 'react-native';

export default class Third extends React.Component {
    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};

        return{
          title: navigation.getParam('name','shaxixi'),
          headerRight: (
            <Button onPress={params.increaseCount} title="+1" color="#fff" />
          ),
          headerLeft: (
            <Button 
                onPress={()=>navigation.navigate('MyModal')}
                title='Info'
                color='white'
            />
          ),
        };     
      };  

    componentWillMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount });
    }
    
    state = {
        count:0,
    }
    
    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 });
    };

    render(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Third Screen</Text>
                <Text>Count:{this.state.count}</Text>
                <Button 
                title='Go back to Details'
                onPress={()=> this.props.navigation.navigate('Details')}
                />
                <Button 
                title='Go back to Home'
                onPress={()=> this.props.navigation.popToTop()}
                />
                <Button
                title="Update the title"
                onPress={() => this.props.navigation.setParams({name: 'Updated!'})}
                />
        </View>
        );
    }
}