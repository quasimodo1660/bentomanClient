import {observable, action, computed} from 'mobx'



class ObservableUser {
  @observable jsuser
  constructor(){
    this.jsuser={
      username:'',
      client:null,
      isUser:false
    };
  }
  @computed get user(){
    return this.jsuser
  }
}


class ObservableUserlist {
  @observable userList
  // constructor(){
  //   this.userList=[]
  // }
  @action.bound 
  setUserList(data){
    this.userList=data;
  }

  @action getUserList(){
    return this.userList
  }
}

const jsuser = new ObservableUser()
export {jsuser}

const userList= new ObservableUserlist()
export {userList}