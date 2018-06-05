import React from 'react';
import { Button, View, Text } from 'react-native';

export default class Third extends React.Component {
    render(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Third Screen</Text>
                <Button 
                title='Go back to Details'
                onPress={()=> this.props.navigation.navigate('Details')}
                />
                <Button 
                title='Go back to Home'
                onPress={()=> this.props.navigation.popToTop()}
                />
        </View>
        );
    }
}