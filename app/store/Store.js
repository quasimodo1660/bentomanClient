import {observable, action, computed, autorun} from 'mobx'
import { Platform } from 'react-native'


class ObservableUser {
  @observable jsuser
  constructor(){
    this.jsuser={
      username:'',
      client:null,
      user_id:null,
      isUser:false,
      img:'',
      platform:Platform.OS
    };
  }
  
  getUser(){
    return this.jsuser
  }

  @action.bound
  InitUser(id,username,img){
    this.jsuser.user_id=id
    this.jsuser.username=username
    this.jsuser.img=img
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



const jsuser = new ObservableUser()
export {jsuser}

const userList= new ObservableUserlist()
export {userList}

const conversation = new ObservableConversation()
export {conversation}