import React from 'react';
import { StyleSheet,Button, Image,ScrollView,Text, } from 'react-native';
import {jsuser, userList} from '../store/Store.js'
import { observer } from 'mobx-react/native'
import { SearchBar, ListItem, } from 'react-native-elements'




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
  componentDidMount(){
    
  }

 
  render() {
   
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