<template>
  <q-drawer
    v-model="chatDrawer"
    :width="200"
    :breakpoint="0"
    class="bg-pink-5 text-white"
  >
    <q-scroll-area class="fit">
      <q-list padding bordered separator>
        <q-item
          v-for="friendId in friendsData?.friendsList"
          :key="friendId"
          clickable
          v-ripple
          :to="{
            name: RouteNames.chat,
            params: { id: friendId },
          }"
        >
          <q-item-section avatar>
            <q-avatar size="42px">
              <q-img :src="accountsMap[friendId].avatarUrl" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ accountsMap[friendId].name }}
            </q-item-label>
            <q-item-label caption> hello man </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import { RouteNames } from 'src/router/routes';
import { ref } from 'vue';
import { useFriendsStore } from 'stores/friends-store';
import { storeToRefs } from 'pinia';
import { useAccountStore } from 'stores/account-store';
const accountStore = useAccountStore();
const { getMyAccount, getAccount, addAccounts } = accountStore;
const { accountsMap, currentAccount } = storeToRefs(accountStore);
const friendsStore = useFriendsStore();
const { getFriendsData } = friendsStore;
const { friendsData } = storeToRefs(friendsStore);
const chatDrawer = ref(true);
</script>
