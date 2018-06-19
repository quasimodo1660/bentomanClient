import config from './config.js'
import SocketIOClient from 'socket.io-client';
import { userList,jsuser,conversation } from '../store/Store.js'
import { autorun } from 'mobx'



class ReceivedMessage {
    constructor(text,createdAt){ 
        this.text=text,
        this.createdAt=createdAt,
        this._id=null,
        this.user={}
    }
    setID(value){
        this._id=value
    }
    setUser(user_id,user_name,user_avatar){
        this.user['_id']=user_id
        this.user['name']=user_name
        this.user['avatar']=user_avatar
    }
}


class Socket  {
    constructor() {
        this.socket=SocketIOClient(config.socketServer.server);
        // console.log(jsuser)
        this.socket.on('connect',()=>{
            this.socket.emit('authentication',jsuser.getUser())
        })
        this.socket.on('generate_id',(data)=>{
            // console.log(data)
            jsuser.InitUser(data.client_id,data.client_name,data.client_img)
            console.log(jsuser.getUser())
        })
    
    
        this.socket.on('my_full_broadcast_event',(data)=>{
            userList.setUserList(data.users)
            // console.log('insocket:'+userList)
        })

        this.socket.on('return_conversations',(data)=>{
            conversation.EmptyConversation()
            let msg
            data.messages.map((x,i)=>{            
                msg=new ReceivedMessage(x.content,x.createdAt)
                msg.setID(x.mid)
                msg.setUser(x.sender,x.sender_username,x.sender_img)
                conversation.addMessage(msg)                
            })
            console.log(conversation.getConversation())
        })
        
        this.socket.on('rn_received_message',(x)=>{
            console.log(x)
            let msg = new ReceivedMessage(x.content,x.createdAt)
            msg.setID(x.mid)
            msg.setUser(x.sender,x.sender_username,x.sender_img)
            conversation.addMessage(msg)    
            console.log(conversation.getConversation())      
        })
    }
    
    loadConversation=(data)=>{
        this.socket.emit('load_conversation',data)
    }
    
    sendMessage=(message,chater)=>{
        // console.log(message)
        this.socket.emit('new_message_node',{'sender':jsuser.getUser(),'receiver':chater,'content':message.text,'mid':message._id})
        let msg = new ReceivedMessage(message.text,message.createdAt)
        msg.setID(message._id)
        msg.setUser(message.user._id,message.user.name,message.user.avatar)
        conversation.addMessage(msg)
        console.log(conversation.getConversation())
    }
}

const socket = new Socket()
export default socket