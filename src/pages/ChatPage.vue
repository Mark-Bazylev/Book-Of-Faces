<template>
  <q-layout container view="lHh Lpr lff" class="layout-container">
    <q-header>
      <q-toolbar>
        <q-btn @click="router.go(-1)" round flat icon="arrow_back_ios_new" />
        <q-avatar size="44px">
          <q-img :src="accountsMap[otherUserId]?.avatarUrl" />
        </q-avatar>
        <q-toolbar-title>
          <q-item>
            <q-item-section style="font-size: 16px">
              <q-item-label> {{ accountsMap[otherUserId]?.name }}</q-item-label>
              <q-item-label class="tex">Online</q-item-label>
            </q-item-section>
          </q-item>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <ChatDrawer/>
    <q-page-container :style-fn="styleFn" class="page-container">
      <router-view/>
    </q-page-container>
    <q-footer class="transparent-footer">
      <q-input
        v-model="messageInput"
        @keydown.enter.prevent="sendMessage"
        rounded
        outlined
        class="input"
        placeholder="Message"
        type="text"
        trim
      />
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">

import ChatDrawer from "components/chat/ChatDrawer.vue";
import {ref} from "vue";
import io from "socket.io-client";
import {authService} from "src/services/api-services/auth.service";
import {useAccountStore} from "stores/account-store";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";
const messageInput = ref('');
const router = useRouter();

;
const accountStore = useAccountStore();
const { getMyAccount, getAccount, addAccounts } = accountStore;
const { accountsMap, currentAccount } = storeToRefs(accountStore);
const route = useRoute();
const otherUserId = route.params.id as string;


const styleFn = (offset: number, height: number) => {
  const pageHeight = height - offset;
  return `height: ${pageHeight}px`;
};

const sendMessage = () => {
  if (!messageInput.value) {
    return;
  }
  socket.emit('message', messageInput.value);
  messageInput.value = '';
};
</script>

<style scoped>

.layout-container {
  display: flex;
  flex-direction: column;
  width: 70vw;
  height: 500px;
}
.transparent-footer {
  background-color: transparent;
  color: white;
}
</style>
