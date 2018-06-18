import {observable, action, computed} from 'mobx'
import { Platform } from 'react-native'


class ObservableUser {
  @observable jsuser
  constructor(){
    this.jsuser={
      username:'',
      client:null,
      user_id:null,
      isUser:false,
      platform:Platform.OS
    };
  }
  getUser(){
    return this.jsuser
  }
  @action.bound
  setUserID(data){
    this.jsuser.user_id=data
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
    return this.conversation
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