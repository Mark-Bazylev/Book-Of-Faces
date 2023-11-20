<template>
  <q-card
    :key="post"
    v-for="(post, index) in posts"
    class="column card-container justify-center q-ma-md"
  >
    <q-list>
      <q-item
        clickable
        v-ripple
        :to="{
          name: RouteNames.profile,
          params: { id: accountsMap[post.createdBy]?.createdBy },
        }"
      >
        <q-item-section side>
          <q-avatar size="64px">
            <img :src="accountsMap[post.createdBy]?.avatarUrl" alt="" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ accountsMap[post.createdBy]?.name }}</q-item-label>
          <q-item-label caption>{{
              getFormatedDate(post.createdAt)
          }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        {{ post.content }}
      </q-item>
      <q-item class="row justify-between">
        <q-btn @click="showLikesDialog(post.likes, post._id)" flat
          >{{ post.likes.length }}
          {{ post.likes.length === 1 ? 'like' : 'likes' }}</q-btn
        >
        <q-btn @click="showChat[index] = !showChat[index]" flat>
          {{ post.commentsLength }}
          {{ post.commentsLength === 1 ? 'comment' : 'comments' }}</q-btn
        >
      </q-item>
      <q-separator />

      <q-item class="row justify-between">
        <q-btn
          :loading="loadingLike"
          unelevated
          v-if="!post.likes.includes(tokenData?.userId)"
          @click="setLikePost(post)"
          icon="thumb_up"
          label="Like"
          no-caps
        />
        <q-btn
          :loading="loadingLike"
          unelevated
          v-else
          @click="setUnlikePost(post)"
          icon="thumb_up"
          label="Like"
          no-caps
          color="secondary"
        />
        <q-btn
          unelevated
          @click="showChat[index] = !showChat[index]"
          icon="chat"
          label="Comment"
          no-caps
        />
      </q-item>
    </q-list>

    <div v-if="showChat[index]">
      <CommentsComponent :postId="post._id" />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePostsStore } from 'stores/posts-store';
import { useQuasar } from 'quasar';
import LikesDialog from 'components/LikesDialog.vue';
import { useAuthStore } from 'stores/auth-store';
import { storeToRefs } from 'pinia';
import CommentsComponent from 'components/CommentsComponent.vue';
import {getDayOfWeek, getFormatedDate} from '../utils/dates';
import { RouteNames } from 'src/router/routes';
import { Post } from 'src/services/api-services/posts-service/models';
const props = defineProps(['posts', 'accountsMap']);
const authStore = useAuthStore();
const postsStore = usePostsStore();
const { likePost, unlikePost } = postsStore;
const { tokenData } = storeToRefs(authStore);
const showChat = ref([false]);
const isLikesDialog = ref(false);
const loadingLike = ref(false);
const $q = useQuasar();
onMounted(() => {
  showChat.value = Array.from({ length: props.posts?.length }, () => false);
});
function showLikesDialog(likes: [string], id: string) {
  isLikesDialog.value = true;
  $q.dialog({
    position: 'right',
    component: LikesDialog,
    componentProps: {
      isLikesDialog,
      likes,
      id,
    },
  });
}
async function setLikePost(post: Post) {
  try {
    loadingLike.value = true;
    await likePost(post._id);
    post.likes.push(tokenData.value?.userId as string);
  } catch (error) {
    console.log('Failed to like post', error);
  } finally {
    loadingLike.value = false;
  }
}
async function setUnlikePost(post: Post) {
  try {
    loadingLike.value = true;
    await unlikePost(post._id);
    post.likes.splice(
      post.likes.findIndex((id: string) => id === tokenData.value?.userId),
      1
    );
  } catch (error) {
    console.log('Failed to unlike post', error);
  } finally {
    loadingLike.value = false;
  }
}
</script>

<style scoped>
.card-container {
  width: 90vh;
}
</style>
