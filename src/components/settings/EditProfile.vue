<template>
  <div class="text-h4 q-mb-md">Edit Profile</div>
  <q-form @submit="onSubmit" class="column justify-center align-center">
    <div>Current Name: {{ currentAccount?.name }}</div>
    <q-input v-model="newName" label="New name" />
    <q-input v-model="newAvatarUrl" label="Avatar Image Link">
      <template v-slot:prepend>
        <q-avatar size="48px">
          <q-img :src="currentAccount?.avatarUrl" />
        </q-avatar>
      </template>
    </q-input>
    <q-img :src="currentAccount?.coverUrl" />
    <q-input v-model="newCoverUrl" label="Cover Image Link" />

    <!--REALLY WANT TO ADD STOCK AVATAR PICS-->
    <q-btn class="q-ma-md" @click="onSubmit">Make Changes</q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { useAccountStore } from 'stores/account-store';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const accountStore = useAccountStore();
const { getMyAccount, editAccount } = accountStore;
const { currentAccount } = storeToRefs(accountStore);
onMounted(async () => {
  try {
    await getMyAccount();
  } catch (e) {
    console.log(e);
  }
});
const newName = ref('');
const newAvatarUrl = ref('');
const newCoverUrl = ref('');

async function onSubmit() {
  try {
    const res = await editAccount({
      newName: newName.value,
      newAvatarUrl: newAvatarUrl.value,
      newCoverUrl: newCoverUrl.value,
    });
    await getMyAccount()
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}
</script>
