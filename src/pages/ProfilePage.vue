<template>
  <q-page padding class="page">
    <q-card class="profile-card">
      <!--      Thumbnail with profile img-->
      <ProfileThumbnail
        :coverUrl="currentAccount?.coverUrl"
        :avatarUrl="currentAccount?.avatarUrl"
        :name="currentAccount?.name"
      />

      <!--      input and post form-->
      <ProfileInput />
      <!--      Posts-->
      <ProfilePosts :posts="posts" :account="currentAccount" />
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import ProfileThumbnail from 'components/profile/ProfileThumbnail.vue';
import ProfileInput from 'components/profile/ProfileInput.vue';
import ProfilePosts from 'components/profile/ProfilePosts.vue';
import { useAccountStore } from 'stores/account-store';
import { onMounted } from 'vue';
import { usePostsStore } from 'stores/posts-store';
import { storeToRefs } from 'pinia';

const { currentAccount } = storeToRefs(useAccountStore());
const postsStore = usePostsStore();
const { getPosts } = postsStore;
const { posts } = storeToRefs(postsStore);
onMounted(async () => {
  try {
    posts.value = await getPosts();
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
.profile-card {
  max-width: 820px;
}
</style>
