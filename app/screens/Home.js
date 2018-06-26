import React from 'react';
import { ActivityIndicator,View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Masonry from 'react-native-masonry';
import FastImage from 'react-native-fast-image';
import { observer } from 'mobx-react/native'
import {bentoList} from '../store/Store'
import {getBentoList} from '../services/HttpDelegate'

@observer
export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={isLoading:true}
    this.getBL=getBentoList
  }

  static navigationOptions = ({navigation}) => {
    return{
      title: 'BENTOMAN',    
      // headerLeft: <LogoTitle />,
      headerRight:(
        <Ionicons
          name='ios-add' 
          size={30}
          //color='orange'
          style={{paddingRight:10}}
          onPress = {()=>navigation.navigate('AddNew')}
        />
      ),
    }
  };

  componentDidMount(){
    this.getBL().then(
      this.setState({isLoading:false})
    ).catch((error)=>{
      console.log(error)
    })  
  }
  
  componentWillUnmount(){
    this.getBL=null
    this.setState({isLoading:true})
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
    bentoList.getBentoList().map((b,i)=>{
      var item={}
      item['data']={}
      item['key']="image"+i
      item.data['caption']=b.title
      item.data['url']=b.url
      item['uri']=b.images[0].image

      item.renderFooter=(data)=>{
        // console.log(self)
        return (
          <View key={'brick-footer'+i} style={{backgroundColor: '#fafafa', padding: 5, paddingRight: 9, paddingLeft: 9,borderRadius:10}}>
            <Text style={{lineHeight: 20, fontSize: 16}}>{data.caption}</Text>
          </View>
        )
      }
      item.onPress=(data)=>{
        this.props.navigation.navigate('Third',{
          itemUrl:data.url,
          itemTitle:data.caption
        })
      }
      data.push(item)
    })

    return (
      <View style={{ flex: 1, flexGrow: 10, padding:5,paddingTop:10 }}>
          <Masonry
          bricks={data}
          imageContainerStyle={{borderRadius:10}}
          spacing={3}
          customImageComponent={FastImage} 
        />
      </View>
    );
    }
  }

