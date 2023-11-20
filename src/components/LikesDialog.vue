<template>
  <q-dialog v-model="isLikesDialog" :position="'right'"
    ><q-card class="card-container">
      <q-list :key="likeId" v-for="likeId in likes">
        <q-item clickable v-ripple>
          <q-item-section side>
            <q-avatar v-if="!!accountsMap[likeId]" size="64px">
              <img :src="accountsMap[likeId]?.avatarUrl" />
            </q-avatar>
            <q-skeleton v-else type="QAvatar" size="64px" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ accountsMap[likeId]?.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card></q-dialog
  >
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePostsStore } from 'stores/posts-store';
import { useAccountStore } from 'stores/account-store';
import {storeToRefs} from "pinia";

const postsStore = usePostsStore();
const { getLikes } = postsStore;
const props = defineProps(['isLikesDialog', 'likes', 'id']);
const isLikesDialog = ref(props.isLikesDialog);
const accountsStore=useAccountStore()
const { addAccounts } = accountsStore
const {accountsMap}=storeToRefs(accountsStore)

onMounted(async () => {
  try {
    const res = await getLikes(props.id);
    addAccounts(res.data.accountsMap);
  } catch (error) {}
});
</script>

<style scoped>
.card-container {
  width: 200px;
}
</style>
