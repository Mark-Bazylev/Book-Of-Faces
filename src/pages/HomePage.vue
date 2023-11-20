<template>
  <q-page class="q-pa-md q-gutter-md">
    <q-card class="relative-position card-example" flat bordered>
      <q-card-section>
        <template v-if="showPosts">
          <div v-if="sortedFriendsPosts.length != 0">
            <PostsComponent
              :posts="sortedFriendsPosts"
              :accountsMap="accountsMap"
            />
          </div>
          <div v-else class="posts-container">
            <h4>No Posts to show</h4>
          </div>
        </template>
        <div v-else>
          <PostsSkeleton />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePostsStore } from 'stores/posts-store';
import { useFriendsStore } from 'stores/friends-store';
const postsStore = usePostsStore();
const friendsStore = useFriendsStore();
const { getPosts, getFriendsPosts } = postsStore;
const { getFriendsData } = friendsStore;
const friendsPosts = ref([]);
const sortedFriendsPosts = computed(() => friendsPosts.value.slice().reverse());
const showPosts = ref(false);
async function getData() {
  await getPosts();
  friendsPosts.value = await getFriendsPosts();
  await getFriendsData();
}
export default defineComponent({
  async beforeRouteEnter() {
    try {
      showPosts.value = false;
      await getData();
    } catch (error) {
      console.log('failed to load Home Page', error);
    } finally {
      showPosts.value = true;
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
import PostsSkeleton from 'components/PostsSkeleton.vue';
import { useAccountStore } from 'stores/account-store';

const { accountsMap } = storeToRefs(useAccountStore());
</script>

<style scoped>
.posts-container {
  display: flex;
  width: 100vh;
  height: 100vh;
  justify-content: center;
}
</style>
