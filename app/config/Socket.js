import config from './config.js'
import SocketIOClient from 'socket.io-client';
import { userList,jsuser,conversation } from '../store/Store.js'

class ReceivedMessage {
    constructor(id,text,createdAt,user_id,user_name,user_avatar){
        this._id=id,
        this.text=text,
        this.createdAt=createdAt
        this.user._id=user_id
        this.user.name=user_name
        this.user.avatar=user_avatar
    }
}

const text= new ReceivedMessage(1,'sg',new Date(),'G1','sb','dads')

console.log(text)


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
                //if(x.sender!=jsuser.getUser().user_id){
                    msg=new ReceivedMessage(x.mid,x.content,x.createdAt,x.sender,x.sender_username,x.sender_img)
                //}
                conversation.addMessage(msg)
                
                
            })
        })
        
        this.socket.on('rn_received_message',(x)=>{
            console.log(x)
            let msg = new ReceivedMessage(x.mid,x.content,x.createdAt,x.sender,x.sender_username,x.sender_img)
            console.log(conversation.getConversation())
            conversation.addMessage(msg)
            
        })
    }
    
    loadConversation=(data)=>{
        this.socket.emit('load_conversation',data)
    }
    
    sendMessage=(message,chater)=>{
        this.socket.emit('new_message_node',{'sender':jsuser.getUser(),'receiver':chater,'content':message.text,'mid':message._id})
    }
}

const socket = new Socket()
export default socket