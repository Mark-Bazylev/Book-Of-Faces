<template>
  <div class="text-h4 q-mb-md">Change Email</div>
  <q-form @submit="updateEmail">
    <p>Current Email: {{ userEmail }}</p>
    <q-input
      filled
      v-model="newEmail"
      label="New email"
      hint=""
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || 'Please type something',
        (val) => emailRegEx.test(val) || 'Please type a valid email address',
      ]"
    >

      <template #append>
        <q-btn
          @click="updateEmail"
          class="button"
          icon="change_circle"
          unelevated
          rounded
          dense
          label="Update"
        />
      </template>
    </q-input>
  </q-form>
</template>

<script setup lang="ts">
import { emailRegEx } from 'src/utils/regex';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'stores/auth-store';
import { useQuasar } from 'quasar';
const authStore = useAuthStore();
const { getUserEmail, updateUserEmail } = authStore;
const { userEmail } = storeToRefs(useAuthStore());
const $q = useQuasar();
const newEmail = ref('');
onMounted(async () => {
  try {
    await getUserEmail();
  } catch (error) {
    userEmail.value = 'Error getting email';
  }
});

async function updateEmail() {
  try {
    const res = await updateUserEmail(newEmail.value);
    if (res) {
      userEmail.value = res.data.email;
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Email Updated Successfully',
      });
    }
  } catch (e) {
    console.log('yay');
  }
}
</script>

<style scoped></style>
