import { httpService } from 'src/services/http-services/http.service';

class FriendsService {
  getFriendsData() {
    return httpService.get('friendsRequest');
  }
  sendFriendRequest(requestedUserId: string) {
    return httpService.post('friendsRequest/send', { requestedUserId });
  }
  acceptFriendRequest(acceptedUserId: string) {
    return httpService.post('friendsRequest/accept', { acceptedUserId });
  }
}

export const friendsService = new FriendsService();
