import React from 'react';
import { ActivityIndicator,View, Text,RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Masonry from 'react-native-masonry';
import FastImage from 'react-native-fast-image';
import { observer } from 'mobx-react/native'
import {bentoList} from '../store/Store'
import {getBentoList,getTagList} from '../services/HttpDelegate'
import {autorun} from 'mobx'
import AddBento from './AddOne'
import { Icon } from 'react-native-elements'

@observer
export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={isLoading:true,data:[]}
    this.getBL=getBentoList
    this.getTags=getTagList
    this.data=[]
  }

  static navigationOptions = ({navigation}) => {
    console.log(this)
    return{
      title: 'BENTOMAN',    
      // headerLeft: <LogoTitle />,
      headerRight:(
        <Ionicons
        
          name='ios-add' 
          size={30}
          //color='orange'
          style={{paddingRight:10}}
          onPress = {()=>navigation.navigate('AddNew',{
            homeReload:()=>this.forceUpdate()
          })}
        />
      ),
    }
  };

  componentDidMount(){
    console.log(this)
    this.getBL().then(()=>{
      this.setState({isLoading:false})
      this._setData()
    })      
    .catch((error)=>{
      console.log(error)
    })  
    this.getTags()
  }
  
  componentWillUnmount(){
    this.getBL=null
    this.setState({isLoading:true})
    this.data=[]
  }
  
  _setData(){
    this.data=[]
    bentoList.getBentoList().map((b,i)=>{
      var item={}
      item['data']={}
      item['key']=i
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
      this.data.push(item)
    })
    console.log(this.data)
    this.forceUpdate()
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    
    
  

    

    return (
      <View style={{ flex: 1, flexGrow: 10, padding:5,paddingTop:10 }}>
          {console.log(this.data)}
          <Masonry
          bricks={this.data}
          imageContainerStyle={{borderRadius:10}}
          spacing={3}
          sorted={true}
          //refreshControl={AddBento}
          customImageComponent={FastImage} 
        />
        <Icon
          raised
          name='plus'
          type='font-awesome'
          color='white'
          containerStyle={{backgroundColor:'#FE8050',position: "absolute", bottom: 2, right: 1}}
          onPress={() => this.props.navigation.navigate('AddNew',{
            homeReload:()=>{
              console.log('force update')
              this._setData()
            }
          })} />
      </View>
    );
    }
  }

