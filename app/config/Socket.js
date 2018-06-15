import { observable, Reaction } from 'mobx';
import config from './config.js'
import SocketIOClient from 'socket.io-client';
import { userList,jsuser } from '../store/Store.js'

// @observable
class Socket  {
    constructor() {
        this.socket=SocketIOClient(config.socketServer.server);
        // console.log(jsuser)
        this.socket.on('connect',()=>{
            this.socket.emit('authentication',jsuser.user)
        })

        this.socket.on('my_full_broadcast_event',(data)=>{
            userList.setUserList(data.users)
        })


    }
}

const socket = new Socket()
export default socket