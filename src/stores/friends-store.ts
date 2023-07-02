import { defineStore } from 'pinia';
import { friendsService } from 'src/services/http-services/friends-service/friends.service';
import { ref } from 'vue';
import {
  AccountsMap,
  FriendsData,
} from 'src/services/http-services/friends-service/models';

export const useFriendsStore = defineStore('friends', () => {
  const friendsData = ref<FriendsData | null>(null);
  const accountsMap = ref<AccountsMap | null>({});
  const potentialFriends = ref<[string] | null>(null);
  const getFriendsData = async () => {
    const res = await friendsService.getFriendsData();

    friendsData.value = res.data.friendsData;
    potentialFriends.value = res.data.potentialFriends;
    accountsMap.value = res.data.accountsMap;
    return res.data;
  };
  async function sendFriendRequest(userId: string) {
    return await friendsService.sendFriendRequest(userId);
  }
  async function acceptFriendRequest(userId: string) {
    return await friendsService.acceptFriendRequest(userId);
  }

  return {
    friendsData,
    accountsMap,
    potentialFriends,
    getFriendsData,
    sendFriendRequest,
    acceptFriendRequest,
  };
});
