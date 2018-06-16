import React from 'react';
import { StyleSheet,Button, View,Text, } from 'react-native';
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
     <View style={styles.container}>
      <SearchBar
        lightTheme
        round
        searchIcon={true}
        placeholder='Search' />
        {
          userList.getUserList().map((l,i)=>(
            <ListItem
              key={l.user_id}
              roundAvatar
              avatar={{source:{ uri:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
              title={l.username}
            />
          ))
        }
       <Text>sbb</Text>
       <Text>{userList.getUserList().length}</Text>
    </View>
    );
  }
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
})