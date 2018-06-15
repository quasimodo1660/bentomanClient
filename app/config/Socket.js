import { observer } from 'mobx-react/native'
import config from './config.js'
import SocketIOClient from 'socket.io-client';
import { userList,jsuser } from '../store/Store.js'

// @observer
class Socket  {
    constructor() {
        this.socket=SocketIOClient(config.socketServer.server);
        // console.log(jsuser)
        this.socket.on('connect',()=>{
            this.socket.emit('authentication',jsuser.getUser())
        })

        this.socket.on('generate_id',(data)=>{
            jsuser.setUserID(data.client_id)
        })


        this.socket.on('my_full_broadcast_event',(data)=>{
            userList.setUserList(data.users)
            console.log('insocket:'+userList)
        })


    }
}

const socket = new Socket()
export default socket