<template>
  <div class="text-h4 q-mb-md">Delete Account</div>
  <div class="column justify-center align-center">
    <q-banner rounded dense inline-actions class="text-white bg-red">
      This will permanently delete your Account
    </q-banner>
    <q-btn
      class="q-ma-md"
      color="red"
      label="Delete Account"
      @click="dialog = true"
    />
  </div>
  <q-dialog v-model="dialog">
    <q-card style="width: 370px">
      <q-card-section class="row justify-center no-wrap">
        <q-banner rounded class="text-weight-bold text-white bg-negative">
          Are you sure you want to delete your Account?
        </q-banner>
      </q-card-section>
      <q-card-section class="row justify-end">
        <q-btn class="q-mr-md" v-close-popup>Cancel</q-btn>
        <q-btn class="bg-negative text-white" @click="confirmDeletion">Confirm</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useRouter} from 'vue-router';
import {RouteNames} from 'src/router/routes';
import {useAuthStore} from 'stores/auth-store';
const dialog = ref(false);
const router=useRouter()
const authStore=useAuthStore()
const {removeAuthData,deleteAccount}=authStore
async function confirmDeletion() {
  try{
    await deleteAccount()
    removeAuthData();
    await router.push(RouteNames.auth)

  }catch (e) {
    console.log(e)
  }
}
</script>

<style scoped></style>
