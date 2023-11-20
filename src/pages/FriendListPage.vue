<template>
  <q-page class="row q-ma-md">
    <q-card class="friend-card">
      <q-tabs v-model="tab" dense class="bg-indigo text-white">
        <q-tab name="friends" label="My Friends" class="q-pa-sm" />

        <q-tab name="suggestions" label="Suggestions" class="q-pa-sm" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated class="shadow-2 rounded-borders">
        <q-tab-panel name="friends">
          <q-list>
            <q-item
              v-for="userId in friendsData?.friendsList || []"
              :key="userId"
              clickable
              v-ripple
              :to="{
                name: RouteNames.profile,
                params: { id: userId },
              }"
              class="row"

            >
              <q-item-section>
                <q-avatar>
                  <img :src="accountsMap[userId].avatarUrl" alt="avatar pic" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                {{ accountsMap[userId].name }}
              </q-item-section>
              <q-item-section>
                <q-btn
                  :to="{
                  name:RouteNames.chat,
                  params:{id:userId}
                  }"
                  icon="chat"
                  rounded
                >chat</q-btn
                >
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="suggestions">
          <q-toolbar class="bg-secondary text-white shadow-2 rounded-borders">
            Sent Requests
          </q-toolbar>

          <q-list v-if="friendsData?.sentRequests.length">
            <q-item
              class="row"
              :key="userId"
              v-for="userId in friendsData?.sentRequests || []"
              :to="{
                name: RouteNames.profile,
                params: { id: accountsMap[userId].createdBy },
              }"
            >
              <q-item-section>
                <q-avatar>
                  <img :src="accountsMap[userId].avatarUrl" alt="avatar pic" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                {{ accountsMap[userId].name }}
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <q-icon name="done" />
                  Request Sent
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <div
            v-else
            class="q-pa-md row justify-center align-center text-black"
          >
            No Sent Requests
          </div>

          <q-toolbar class="bg-secondary text-white shadow-2 rounded-borders">
            Received Requests
          </q-toolbar>
          <q-list v-if="friendsData?.receivedRequests.length">
            <q-item
              class="row"
              :key="userId"
              v-for="userId in friendsData?.receivedRequests || []"
              :to="{
                name: RouteNames.profile,
                params: { id: accountsMap[userId].createdBy },
              }"
            >
              <q-item-section>
                <q-avatar>
                  <img :src="accountsMap[userId].avatarUrl" alt="avatar pic" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                {{ accountsMap[userId].name }}
              </q-item-section>
              <q-item-section>
                <q-btn
                  :loading="acceptFriendLoading[userId]"
                  @click.stop.prevent="acceptFriend(userId)"
                  icon="person_add"
                  rounded
                  >Accept</q-btn
                >
              </q-item-section>
            </q-item>
          </q-list>
          <div
            v-else
            class="q-pa-md row justify-center align-center text-black"
          >
            No Received Requests
          </div>
          <q-toolbar class="bg-secondary text-white shadow-2 rounded-borders">
            Suggested Friends
          </q-toolbar>

          <q-list v-if="potentialFriends?.length">
            <q-item
              class="row"
              :key="userId"
              v-for="userId in potentialFriends"
              :to="{
                name: RouteNames.profile,
                params: { id: accountsMap[userId].createdBy },
              }"
            >
              <q-item-section>
                <q-avatar>
                  <img :src="accountsMap[userId].avatarUrl" alt="avatar pic" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                {{ accountsMap[userId].name }}
              </q-item-section>
              <q-item-section>
                <div>
                  <q-btn
                    :loading="addFriendLoading[userId]"
                    @click.stop.prevent="addFriend(userId)"
                    icon="person_add"
                    rounded
                    >Add</q-btn
                  >
                </div>
              </q-item-section>
            </q-item>
          </q-list>
          <div
            v-else
            class="q-pa-md row justify-center align-center text-black"
          >
            No Suggested Friends Left In this World
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import { useAccountStore } from 'stores/account-store';
import { onMounted, ref } from 'vue';
import { useFriendsStore } from 'stores/friends-store';
import { storeToRefs } from 'pinia';
import { Account } from 'src/services/api-services/accounts-service/models';
import { RouteNames } from 'src/router/routes';
const accountStore = useAccountStore();
const { getAllAccounts } = accountStore;
const { accountsMap } = storeToRefs(accountStore);
const friendsStore = useFriendsStore();
const { getFriendsData, sendFriendRequest, acceptFriendRequest } = friendsStore;
const { friendsData, potentialFriends } = storeToRefs(friendsStore);
const accounts = ref<Account[]>([]);
const addFriendLoading = ref<Record<string, boolean>>({});
const acceptFriendLoading = ref<Record<string, boolean>>({});
const tab = ref('friends');
onMounted(async () => {
  try {
    const res = await getAllAccounts();
    accounts.value = res.data.accounts;
    const res2 = await getFriendsData();
    console.log(res2);
  } catch (error) {
    console.log(error);
  }
});
const addFriend = async (userId: string) => {
  try {
    addFriendLoading.value[userId] = true;
    const res = await sendFriendRequest(userId);
    console.log('yes maan: ', res);
    const index = potentialFriends.value?.findIndex(
      (id) => id.toString() === userId
    );

    if (index != -1 && index != undefined) {
      potentialFriends.value?.splice(index, 1);
      friendsData.value?.sentRequests.push(userId);
    }
  } catch (error) {
    console.log(error);
  } finally {
    addFriendLoading.value[userId] = false;
  }
};
const acceptFriend = async (userId: string) => {
  try {
    acceptFriendLoading.value[userId] = true;
    await acceptFriendRequest(userId);
    const index = friendsData.value?.receivedRequests.findIndex(
      (id) => id.toString() === userId
    );

    if (index != -1 && index != undefined) {
      friendsData.value?.receivedRequests.splice(index, 1);
      friendsData.value?.friendsList.push(userId);
    }
  } catch (error) {
    console.log(error);
  } finally {
    acceptFriendLoading.value[userId] = false;
  }
};
</script>

<style scoped>
.friend-card {
  margin: 10px;
  width: 410px;
  height: 500px;
}
</style>
