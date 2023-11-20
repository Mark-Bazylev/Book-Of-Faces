<template>

  <q-page>
    <q-scroll-area ref="scrollAreaRef" style="height: 370px; width: 100%">
      <q-infinite-scroll reverse @load="onLoad" :offset="250">
        <div v-for="(messageGroup, index) in groupedMessages" :key="index">
          <q-chat-message
            :name="accountsMap[messageGroup[0].createdBy]?.name"
            :avatar="accountsMap[messageGroup[0].createdBy]?.avatarUrl"
            :sent="currentAccount?.createdBy === messageGroup[0].createdBy"
          >
            <template v-slot:default>
              <q-item
                v-for="(messageData, index) in messageGroup"
                :key="index"
                class="row q-pa-xs"
                style="max-width: 100px"
              >
                <q-item-section>
                  <q-item-label>
                    {{ messageData.message }}
                  </q-item-label>
                  <q-item-label
                    caption
                    class="row"
                    :class="
                          currentAccount?.createdBy !== messageData.createdBy
                            ? 'justify-start'
                            : 'justify-end'
                        "
                  >
                    {{
                      getFormatedDate(
                        messageGroup[messageGroup.length - 1]?.createdAt ||
                        '2023-09-10T10:15:00.000Z'
                      )
                    }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-chat-message>
        </div>

        <template v-slot:loading>
          <div class="text-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-scroll-area>
  </q-page>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn
      round
      color="accent"
      icon="arrow_downward"
      @click="animateScrollToBottom()"
    /></q-page-sticky>
</template>
<script setup lang="ts">

import { ref, onMounted, computed, nextTick } from 'vue';
import io from 'socket.io-client';
import { authService } from 'src/services/api-services/auth.service';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAccountStore } from 'stores/account-store';
import { useAuthStore } from 'stores/auth-store';
import { getFormatedDate, isTimeGapExceeded } from 'src/utils/dates';
import { Message } from 'src/services/api-services/chat-services/models';
import { useChatStore } from 'stores/chat-store';
import { QScrollArea } from 'quasar';
import { useFriendsStore } from 'stores/friends-store';

const socket = io('http://localhost:3000/', {
  auth: {
    token: authService.getAuthToken(),
  },
});
const chatStore = useChatStore();
const { getChatMessagesByPage } = chatStore;
const { chatMessages } = storeToRefs(chatStore);
const authStore = useAuthStore();
const { tokenData } = storeToRefs(authStore);
const accountStore = useAccountStore();
const { getMyAccount, getAccount, addAccounts } = accountStore;
const { accountsMap, currentAccount } = storeToRefs(accountStore);


const route = useRoute();
const userId = tokenData?.value?.userId || '';
const otherUserId = route.params.id as string;
const scrollAreaRef = ref<QScrollArea | null>(null);
const router = useRouter();


async function onLoad(index: any, done: any) {
  // user,otheruserId page number

  // messages.value=[...chatMessages.data,...messages.value]
  console.log(index);
  await getChatMessagesByPage(index, userId, otherUserId);

  console.log(chatMessages.value);

  messages.value = [...chatMessages.value.reverse(), ...messages.value];
  chatMessages.value.length === 0 ? done(true) : done();
}

function animateScrollToBottom({ animated = true } = {}) {
  const scrollTarget = scrollAreaRef.value?.getScrollTarget();
  scrollTarget?.scrollTo({
    top: scrollTarget?.scrollHeight,
    behavior: animated ? 'smooth' : 'auto',
  });
}


const messages = ref<Message[]>([]);

const groupedMessages = computed<Message[][]>(() => {
  return messages.value.reduce((result: any, message: any) => {
    const lastGroup = result[result.length - 1];
    const lastMessage = lastGroup?.[lastGroup.length - 1];
    if (
      !lastMessage ||
      lastMessage.createdBy !== message.createdBy ||
      isTimeGapExceeded(lastMessage.createdAt, message.createdAt)
    ) {
      result.push([message]);
    } else {
      lastGroup.push(message);
    }
    return result;
  }, []);
});
socket.on('previousMessages', (messagesData) => {
  messages.value = messagesData;
});

socket.on('message', (message) => {
  messages.value.push(message);
  nextTick(() => {
    animateScrollToBottom({ animated: false });
  });
});

onMounted(async () => {
  const res1 = await getMyAccount();
  const res2 = await getAccount(otherUserId);
  await addAccounts({ [res1.createdBy]: res1, [res2.createdBy]: res2 });
  console.log(res1, ' and ', res2, 'accounts map: ', accountsMap.value);

  socket.on('connect', () => {
    // Socket is connected
    console.log('Socket is connected');
  });
  socket.emit('join', userId, otherUserId);
});

</script>



<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
}
</style>
