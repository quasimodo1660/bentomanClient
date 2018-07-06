import React from 'react';
import { StyleSheet,Button, AsyncStorage,Image,ScrollView,Text, } from 'react-native';
import {jsuser, userList} from '../store/Store.js'
import { observer } from 'mobx-react/native'
import { SearchBar, ListItem} from 'react-native-elements'
import socket from '../config/Socket.js'




@observer
export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    
  }
  static navigationOptions = ({navigation}) => {
    return{
      headerTitle: 'Messaging'
    
    };  
  } 
  
 

 
  render() {
    const goToChatWindow = (data)=>{
      this.props.navigation.navigate('ChatWindow',{
        chatTitle:data.username,
        chaterID:data.user_id
      })
    }
    return(  
     <ScrollView>
      <SearchBar
        lightTheme
        searchIcon={true}
        placeholder='Search' />
        {
          userList.getUserList().map(l=>{
            if(l.user_id!==jsuser.getUser().user_id){
              return (
              <ListItem
              key={l.user_id}
              roundAvatar
              avatar={<Image source={{ uri: l.img }} style={{borderRadius:15, height:30, width:30 }} />}
              title={l.username}
              subtitle={l.platform}
              // badge={{
              //   value:0,
              //   textStyle:{ color: 'white' },
              //   containerStyle:{backgroundColor:'#FE8050'}
              // }}
              onPress={()=>{
                goToChatWindow(l)
                socket.loadConversation({'sender':jsuser.getUser().user_id,'receiver':l.user_id})
              }}
            />)
            }          
          })
        }
    </ScrollView>
    );
  }
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white'
  },
})