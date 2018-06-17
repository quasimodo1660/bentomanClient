import { observer } from 'mobx-react/native'
import config from './config.js'
import SocketIOClient from 'socket.io-client';
import { userList,jsuser,conversation } from '../store/Store.js'

// @observer
class Socket  {
    constructor() {
        this.socket=SocketIOClient(config.socketServer.server);
        // console.log(jsuser)
        this.socket.on('connect',()=>{
            this.socket.emit('authentication',jsuser.getUser())
        })
        this.socket.on('generate_id',(data)=>{
            // console.log(data)
            jsuser.setUserID(data.client_id)
            // console.log(jsuser.getUser().user_id)
        })
    
    
        this.socket.on('my_full_broadcast_event',(data)=>{
            userList.setUserList(data.users)
            // console.log('insocket:'+userList)
        })

        this.socket.on('return_conversations',(data)=>{
            // console.log(data)
            conversation.setConversation(data.messages)
        
        })
        
        this.socket.on('received_message',(data)=>{
            conversation.addMessage(data)
            console.log(conversation.getConversation())
        })
    }
    
    loadConversation=(data)=>{
        this.socket.emit('load_conversation',data)
    }
}

const socket = new Socket()
export default socket