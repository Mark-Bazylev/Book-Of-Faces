import { httpService } from 'src/services/api-services/http.service';
import io from 'socket.io-client';
import { authService } from 'src/services/api-services/auth.service';
import { nextTick } from 'vue';

class ChatService {
  public socket = io('http://localhost:3000/', {
    auth: {
      token: authService.getAuthToken(),
    },
  });

  emitMessage(messageInput: string) {
    this.socket.emit('message', messageInput);
  }
  onConnect() {
    this.socket.on('connect', () => {
      // Socket is connected
      console.log('Socket is connected');
    });
  }
  emitJoin(userId: string, otherUserId: string) {
    this.socket.emit('join', userId, otherUserId);
  }
  onPreviousMessages(cb:(messagesData:any)=>unknown) {
    this.socket.once('previousMessages', cb)
  }
  // onMessage() {
  //   this.socket.on('message', (message) => {
  //     messages.value.push(message);
  //     nextTick(() => {
  //       animateScrollToBottom({ animated: false });
  //     });
  //   });
  // }

  getChatMessagesByPage(query: any) {
    return httpService.get('chat/chatMessages', { params: query });
  }
}

export const chatService = new ChatService();
