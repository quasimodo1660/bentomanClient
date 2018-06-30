import {observable, action, computed, autorun} from 'mobx'
import { Platform,AsyncStorage, SegmentedControlIOSComponent, TouchableHighlightBase } from 'react-native'


class ObservableUser {
  @observable jsuser
  constructor(){
      this.jsuser={
        username:'',
        client:null,
        user_id:null,
        isUser:false,
        img:'',
        platform:Platform.OS,
        latestMsg:0,
        deviceToken:''
    };
  }   
  
  
  getUser(){
    return this.jsuser
  }

  @action.bound
  setUserClient(value){
    this.jsuser.client=value  
  }

  @action.bound
  InitUser(id,username,img){
    this.jsuser.user_id=id
    this.jsuser.username=username
    this.jsuser.img=img
    this.jsuser.client=id
    this.jsuser.isUser=true
  }

  @action.bound
  RMsg(){
    this.jsuser.latestMsg=this.jsuser.atestMsg++
  }
  
  @action.bound
  setLetestMsgtoZero(){
    this.jsuser.latestMsg=0
  }

}


class ObservableUserlist {
  @observable userList
  // constructor(){
  //   this.userList=[]
  // }
  
  getUserList(){
    return this.userList
  }


  @computed get users(){
    return this.userList.length
  }
 
  @action.bound 
  setUserList(data){
    this.userList=data;
  }

}

class ObservableConversation {
  @observable conversation

  constructor(){
    this.conversation=[]
  }

  getConversation(){    
    return this.conversation.slice()
  }

  @action.bound 
  EmptyConversation(){
    this.conversation=[];
  }
  @action.bound 
  setConversation(data){
    this.conversation=data;
  }
  @action.bound
  addMessage(data){
    this.conversation.unshift(data)
  }
}

class ObservableBentoList {
  @observable bentoList
  constructor(){
    this.bentoList=[]
  } 

  getBentoList(){
    return this.bentoList.slice()
    console.log(this.bentoList)
  }

  @action.bound
  setBentoList(data){
    this.bentoList=data
  }

  @action.bound
  emptyList(){
    this.bentoList=[]
  }

  @action.bound
  transformData(res){
    res.map((b,i)=>{
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
      this.bentoList.push(item)
    })
  }
}


class ObservableTag {
  @observable TagList
  constructor(){
    this.TagList=[]
  }
  getTagList(){
    return this.TagList
  }
  @action.bound
  setTagList(data){
    this.TagList=data
  }
}




const jsuser = new ObservableUser()
export {jsuser}

const userList= new ObservableUserlist()
export {userList}

const conversation = new ObservableConversation()
export {conversation}

const bentoList = new ObservableBentoList()
export {bentoList}

const tagList = new ObservableTag()
export {tagList}