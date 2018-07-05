import React from 'react';
import { View,StyleSheet,AsyncStorage,Image,ScrollView, } from 'react-native';
import socket from '../config/Socket.js'
import {jsuser,bentoList} from '../store/Store'
import {Text,Avatar,Button} from 'react-native-elements'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'



export default class ProfileScreen extends React.Component {
    constructor(props) {
      super(props);     
      this.user_id=this.props.navigation.getParam('user_id',jsuser.getUser().user_id)
      this.bento=bentoList.getBentoList()
    }
    static navigationOptions = ({navigation}) => {
        return{
          headerTitle: 'Profile'
        
        };  
    }
    
    componentDidMount(){
        console.log(this.user_id)
        
        // this.bento=bentoList.getBentoList().filter(x=>x.user_id==jsuser.getUser().user_id)
        // console.log(this.bento.getBentoList())
    }




    _signOutAsync = async () => {
        await AsyncStorage.clear();
        socket._closeConnection()
        this.props.navigation.navigate('Auth');
    }; 
    
    render(){
        console.log(this.bento)
        return(
            <ScrollView style={styles.container}>
                <View  style={{flexDirection: 'row',paddingBottom:10}}>   
                    <Avatar
                        medium
                        rounded
                        source={{uri: jsuser.getUser().img}}
                        activeOpacity={0.7}
                    />
                    <Text h2>{jsuser.getUser().username}</Text>
                </View>
                {
                    
                    this.bento.map((x,i)=>{
                    if(x.user_id==jsuser.getUser().user_id){
                        return(
                            <Card
                                mediaSource={{uri:x.images[0].image}}
                            >
                            {/* <CardImage 
                                source={{uri: x.images[0].image}} 
                            /> */}
                            <CardTitle 
                                title={x.title}
                                // subtitle="This is subtitle"
                            />
                            <CardContent text={x.description} />
                            <CardAction 
                                separator={true} 
                                inColumn={false}>
                                <CardButton
                                onPress={() => {
                                    this.props.navigation.navigate('Third',{
                                    itemUrl:x.url,
                                    itemTitle:x.title
                                  })
                                }}
                                title="View"
                                color="#FE8050"
                                />
                            </CardAction>
                            </Card>
                            )
                        } 
                    })
                }
                <Button
                    raised
                    buttonStyle={{backgroundColor:'red'}}
                    title="Sign Out"
                    onPress={this._signOutAsync}
                    containerViewStyle={{width: '100%', marginLeft: 0,paddingTop:20}}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft:15,
      paddingRight:15,
      // backgroundColor: 'white'
    },
  })