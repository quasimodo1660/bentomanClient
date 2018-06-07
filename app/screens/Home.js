import React from 'react';
import { ActivityIndicator,Image,Button, View, Text } from 'react-native';
import LogoTitle from '../components/Logo'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Masonry from 'react-native-masonry';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={isLoading:true}
  }

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

  componentDidMount(){
    return fetch('http://bentoman.yubinwang.com/api/lunchbox')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson)
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    
    let data=[];
    for(let x=0;x<this.state.dataSource.length;x++){
      var item={}
      item['data']={}
      item.data['caption']=this.state.dataSource[x].title
      item.data['url']=this.state.dataSource[x].url
      item['uri']=this.state.dataSource[x].images[0].image
      // console.log(item)
      item.renderFooter=(data)=>{
        // console.log(self)
        return (
          <View key='brick-footer' style={{backgroundColor: '#fafafa', padding: 5, paddingRight: 9, paddingLeft: 9,borderRadius:10}}>
            <Text style={{lineHeight: 20, fontSize: 15}}>{data.caption}</Text>
          </View>
        )
      }
      data.push(item)
    }
    return (
      <View style={{ flex: 1, flexGrow: 10, padding:5,paddingTop:10 }}>
          <Masonry
          bricks={data}
          imageContainerStyle={{borderRadius:10}}
          spacing={3}
        />
      </View>
    );
    }
  }

