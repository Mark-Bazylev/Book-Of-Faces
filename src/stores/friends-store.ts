import { defineStore } from 'pinia';
import { friendsService } from 'src/services/api-services/friends-service/friends.service';
import { ref } from 'vue';
import { FriendsData } from 'src/services/api-services/friends-service/models';
import { useAccountStore } from 'stores/account-store';
const { addAccounts } = useAccountStore();
export const useFriendsStore = defineStore('friends', () => {
  const friendsData = ref<FriendsData | null>(null);
  const potentialFriends = ref<string[] | null>(null);
  const getFriendsData = async () => {
    const res = await friendsService.getFriendsData();
    friendsData.value = res.data.friendsData;
    potentialFriends.value = res.data.potentialFriends;
    addAccounts(res.data.accountsMap);
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

    potentialFriends,
    getFriendsData,
    sendFriendRequest,
    acceptFriendRequest,
  };
});
