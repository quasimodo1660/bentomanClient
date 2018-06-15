import {observable, action, computed} from 'mobx'



class ObservableUser {
  @observable jsuser
  constructor(){
    this.jsuser={
      username:'',
      client:null,
      user_id:null,
      isUser:false,
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

const jsuser = new ObservableUser()
export {jsuser}

const userList= new ObservableUserlist()
export {userList}