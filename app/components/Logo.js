import React from 'react';
import { Image, StyleSheet,Text, View } from 'react-native';

export default class LogoTitle extends React.Component {
    render(){
        return (
                    <Image
                    source={require('../assets/bm.png')}
                    style={styles.icon}
                    />
                   
        );
    }
}

const styles = StyleSheet.create({
    contentView:{
        flex: 1,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    icon:{
        width:25,
        height:25,
        marginLeft:5,
    },
    bandName:{
       fontWeight:'bold' 
    }
})