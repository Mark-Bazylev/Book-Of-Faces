<template>
  <div>
    <h1>This is Home Page</h1>
  </div>
  <div class="column justify-center">
    <PostsComponent :posts="sortedFriendsPosts" :accountsMap="accountsMap" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePostsStore } from 'stores/posts-store';
import { useFriendsStore } from 'stores/friends-store';
import { Loading } from 'quasar';

const postsStore = usePostsStore();
const friendsStore = useFriendsStore();
const { getPosts, getFriendsPosts } = postsStore;
const { getFriendsData } = friendsStore;
const friendsPosts = ref([]);
const sortedFriendsPosts = computed(() => friendsPosts.value.slice().reverse());
async function getData() {
  await getPosts();
  friendsPosts.value = await getFriendsPosts();
  await getFriendsData();
}
export default defineComponent({
  async beforeRouteEnter() {
    try {
      Loading.show();
      await getData();
    } catch (e) {
    } finally {
      Loading.hide();
    }
  },
});
</script>
<script setup lang="ts">
import { usePostsStore } from 'stores/posts-store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useFriendsStore } from 'stores/friends-store';
import PostsComponent from 'components/PostsComponent.vue';

const { accountsMap } = storeToRefs(friendsStore);
</script>
