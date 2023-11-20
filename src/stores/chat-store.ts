import {defineStore} from "pinia";
import {chatService} from '../services/api-services/chat-services/chat-socket.service'
import {ref} from "vue";
import {ChatMessages} from "src/services/api-services/chat-services/models";

export const useChatStore=defineStore('chat',()=>{
const chatMessages=ref<ChatMessages[]>([])
  async function getChatMessagesByPage(pageIndex:string,userId:string,otherUserId:string){
    console.log(pageIndex,userId,otherUserId,' this is the stufff')
    const res= await chatService.getChatMessagesByPage({pageIndex,userId,otherUserId})
    console.log(res)
    chatMessages.value=res.data;
    return res.data
  }


  return {chatMessages,getChatMessagesByPage}
})
