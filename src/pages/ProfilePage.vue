<template>
  <q-page padding class="page">
    <q-card class="profile-card">
      <!--      Thumbnail with profile img-->
      <ProfileThumbnail
        :coverUrl="currentAccount?.coverUrl"
        :avatarUrl="currentAccount?.avatarUrl"
        :name="currentAccount?.name"
      />
      <!--      add friend button or friend already sent and stuff-->

      <!--      input and post form-->
      <div v-if="showInput">
        <ProfileInput />
      </div>
      <template v-else>
        <div v-if="friendStatus.isFriend" class="row justify-center q-ma-md">
          <q-chip
            square
            text-color="white"
            size="16px"
            color="primary"
            icon="how_to_reg"
            label="Friends"
            no-caps
          />
        </div>
        <div
          v-else-if="friendStatus.isPendingAccept"
          class="row justify-center q-ma-md"
        >
          <q-btn
            @click="acceptFriend"
            :loading="acceptFriendLoading"
            icon="person_add"
            label="Accept Friend"
            no-caps
          />
        </div>
        <div
          v-else-if="friendStatus.isRequestSent"
          class="row justify-center q-ma-md"
        >
          <q-chip
            square
            text-color="white"
            size="16px"
            color="primary"
            icon="done"
            label="Friend Request Sent"
            no-caps
          />
        </div>
        <div v-else class="row justify-center q-ma-md">
          <q-btn
            @click="addFriend"
            :loading="addFriendLoading"
            icon="person_add"
            label="Add Friend"
            no-caps
          />
        </div>
      </template>

      <!--      Posts-->
      <!--      <ProfilePosts :posts="posts" :account="currentAccount" />-->
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div v-if="showPosts" class="row justify-center">
          <template v-if="sortedPosts.length != 0">
            <PostsComponent
              :posts="sortedPosts"
              :accountsMap="{
                [posts?.[0]?.createdBy.toString()]: currentAccount,
              }"
            />
          </template>
          <template v-else>
            <h5>No Posts To Show</h5>
          </template>
        </div>
        <div v-else class="row justify-center">
          <PostsSkeleton />
        </div>
      </transition>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';

import { computed, defineComponent, ref } from 'vue';
import { usePostsStore } from 'stores/posts-store';
import { useAccountStore } from 'stores/account-store';
import { RouteNames } from 'src/router/routes';
import { useFriendsStore } from 'stores/friends-store';
import { Loading } from 'quasar';

const { getFriendsData } = useFriendsStore();
const accountStore = useAccountStore();
const { getMyAccount, getAccount } = accountStore;
const { currentAccount } = storeToRefs(accountStore);
const postsStore = usePostsStore();
const { getPosts, getUserPosts } = postsStore;
const { posts } = storeToRefs(postsStore);
const showInput = ref(false);
const friendStatus = {
  isFriend: false,
  isPendingAccept: false,
  isRequestSent: false,
};
function friendCondition(userId: string, friendsData: any) {
  friendStatus.isFriend = false;
  friendStatus.isPendingAccept = false;
  friendStatus.isRequestSent = false;
  if (friendsData.friendsList.includes(userId)) {
    friendStatus.isFriend = true;
  } else if (friendsData.receivedRequests.includes(userId)) {
    friendStatus.isPendingAccept = true;
  } else if (friendsData.sentRequests.includes(userId)) {
    friendStatus.isRequestSent = true;
  } else {
  }
}
async function beforeUpdate(to: any, from: any) {
  try {
    Loading.show();
    const userId = to.params.id;
    const res = await getFriendsData();
    friendCondition(userId, res.friendsData);

    if (userId) {
      currentAccount.value = await getAccount(userId);
      await getUserPosts(userId);
      showInput.value = false;
    } else {
      await getMyAccount();
      await getPosts();
      showInput.value = true;
    }
    showTextLoading();
  } catch (error) {
    console.log(error);
    return { name: RouteNames.profileNotFound };
  } finally {
    Loading.hide();
  }
}
export default defineComponent({
  async beforeRouteEnter(to, from) {
    return await beforeUpdate(to, from);
  },
  async beforeRouteUpdate(to, from) {
    return await beforeUpdate(to, from);
  },
});
const showPosts = ref(false);
const sortedPosts = computed(() => posts.value.slice().reverse());

function showTextLoading() {
  showPosts.value = false;
  setTimeout(() => {
    showPosts.value = true;
  }, 1000);
}
</script>

<script setup lang="ts">
import ProfileThumbnail from 'components/profile/ProfileThumbnail.vue';
import ProfileInput from 'components/profile/ProfileInput.vue';
import { useAccountStore } from 'stores/account-store';
import { computed } from 'vue';
import { usePostsStore } from 'stores/posts-store';
import { storeToRefs } from 'pinia';
import PostsSkeleton from 'components/PostsSkeleton.vue';
import PostsComponent from 'components/PostsComponent.vue';
import { useFriendsStore } from 'stores/friends-store';
import { useRoute } from 'vue-router';
const friendsStore = useFriendsStore();
const { sendFriendRequest, acceptFriendRequest } = friendsStore;
const { friendsData, potentialFriends } = storeToRefs(friendsStore);
const addFriendLoading = ref(false);
const acceptFriendLoading = ref(false);

const route = useRoute();
const userId = route.params.id as string;
async function addFriend() {
  try {
    addFriendLoading.value = true;
    const res = await sendFriendRequest(userId);
    console.log('yes maan: ', res);
    const index = potentialFriends.value?.findIndex(
      (id) => id.toString() === userId
    );

    if (index != -1 && index != undefined) {
      potentialFriends.value?.splice(index, 1);
      friendsData.value?.sentRequests.push(userId);
    }
  } catch (error) {
    console.log(error);
  } finally {
    addFriendLoading.value = false;
    friendStatus.isRequestSent = true;
  }
}
async function acceptFriend() {
  try {
    acceptFriendLoading.value = true;
    await acceptFriendRequest(userId);
    const index = friendsData.value?.receivedRequests.findIndex(
      (id) => id.toString() === userId
    );

    if (index != -1 && index != undefined) {
      friendsData.value?.receivedRequests.splice(index, 1);
      friendsData.value?.friendsList.push(userId);
    }
  } catch (error) {
    console.log(error);
  } finally {
    acceptFriendLoading.value = false;
    friendStatus.isPendingAccept = false;
    friendStatus.isFriend = true;
  }
}
</script>

<style scoped>
.profile-card {
  max-width: 820px;
}
</style>
