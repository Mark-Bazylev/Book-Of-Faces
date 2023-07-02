<template>
  <CommentInput :postId="props.postId" />
  <div class="q-ma-md">
    <q-list :key="comment" v-for="comment in sortedComments">
      <q-item class="q-mb-md">
        <q-item-section side class="self-start">
          <q-avatar size="40px">
            <img :src="accountsMap[comment?.createdBy]?.avatarUrl" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="row justify-between">
            <span>
              {{ accountsMap[comment?.createdBy]?.name }}
            </span>
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
              v-if="!comment.likes.includes(<string>tokenData?.userId)"
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

const props = defineProps(['postId']);
const commentsStore = useCommentsStore();
const { getPostComments, likeComment, unlikeComment } = commentsStore;
const { comments, accountsMap } = storeToRefs(commentsStore);
const sortedComments = computed(() => comments.value.slice().reverse());
const authStore = useAuthStore();
const { tokenData } = storeToRefs(authStore);

onMounted(async () => {
  try {
    const res = await getPostComments(props.postId);
  } catch (error) {
    console.log(error);
  }
});

async function setLikeComment(comment: any) {
  try {
    const res = await likeComment(comment._id);
    comment.likes.push(tokenData.value?.userId);
  } catch (error) {}
}
async function setUnlikeComment(comment: any) {
  try {
    const res = await unlikeComment(comment._id);
    comment.likes.splice(
      comment.likes.findIndex((id: string) => id === tokenData.value?.userId),
      1
    );
  } catch (error) {}
}
</script>

<style scoped>
.comment-box {
  word-break: break-word;
}
</style>
