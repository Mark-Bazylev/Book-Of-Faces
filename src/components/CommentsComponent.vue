<template>
  <CommentInput :postId="props.postId" />
  <div class="q-ma-md">
    <q-list :key="comment" v-for="comment in sortedComments">
      <q-item
        class="q-mb-md"
        :to="{
          name: RouteNames.profile,
          params: { id: accountsMap[comment.createdBy]?.createdBy },
        }"
      >
        <q-item-section avatar class="self-start">
          <q-avatar size="40px">
            <img :src="accountsMap[comment?.createdBy]?.avatarUrl" alt="" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="row justify-between">
            {{ accountsMap[comment?.createdBy]?.name }}
          </q-item-label>
          <q-item-label class="comment-box">
            {{ comment?.content }}
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label>
            {{ getDayOfWeek(comment.createdAt) }}
          </q-item-label>
          <q-item-label>
            <q-btn
              v-if="!comment.likes.includes(tokenData?.userId || '')"
              @click="setLikeComment(comment)"
              icon="thumb_up"
              round
              flat
              size="12px"
              >{{ comment.likes.length }}</q-btn
            >
            <q-btn
              v-else
              @click="setUnlikeComment(comment)"
              icon="thumb_up"
              round
              flat
              size="12px"
              color="secondary"
              >{{ comment.likes.length }}</q-btn
            >
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCommentsStore } from 'stores/comments-store';
import { storeToRefs } from 'pinia';
import { getDayOfWeek } from '../utils/dates';
import CommentInput from 'components/CommentInput.vue';
import { useAuthStore } from 'stores/auth-store';
import { useAccountStore } from 'stores/account-store';
import { RouteNames } from 'src/router/routes';
import { Comment } from 'src/services/api-services/comments-service/models';

const props = defineProps(['postId']);
const commentsStore = useCommentsStore();
const { getPostComments, likeComment, unlikeComment } = commentsStore;
const { comments } = storeToRefs(commentsStore);
const sortedComments = computed(() => comments.value.slice().reverse());
const authStore = useAuthStore();
const { tokenData } = storeToRefs(authStore);
const { currentAccount, accountsMap } = storeToRefs(useAccountStore());
const { getMyAccount } = useAccountStore();
onMounted(async () => {
  try {
    await getPostComments(props.postId);
    await getMyAccount();
  } catch (error) {
    console.log(error);
  }
});

async function setLikeComment(comment: Comment) {
  try {
    await likeComment(comment._id);
    currentAccount.value?.createdBy &&
      comment.likes.push(currentAccount.value.createdBy);
  } catch (error) {
    console.log('failed to like comment', error);
  }
}
async function setUnlikeComment(comment: Comment) {
  try {
    await unlikeComment(comment._id);
    comment.likes.splice(
      comment.likes.findIndex((id: string) => id === tokenData.value?.userId),
      1
    );
  } catch (error) {
    console.log('failed to unlike comment', error);
  }
}
</script>

<style scoped>
.comment-box {
  word-break: break-word;
}
</style>
