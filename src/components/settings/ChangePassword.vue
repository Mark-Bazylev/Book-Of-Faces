<template>
  <div class="text-h4 q-mb-md">Change Password</div>
  <q-form @submit="onSubmit">
    <q-input
      filled
      :type="isCurrentPasswordVisible ? 'text' : 'password'"
      v-model="currentPassword"
      label="Current Password"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    >
      <q-btn
        @click="isCurrentPasswordVisible = !isCurrentPasswordVisible"
        :icon="isCurrentPasswordVisible ? 'visibility_off' : 'visibility'"
        unelevated
        rounded
        dense
      ></q-btn>
    </q-input>

    <q-input
      filled
      :type="isNewPasswordVisible ? 'text' : 'password'"
      v-model="newPassword"
      label="New Password"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    >
      <q-btn
        @click="isNewPasswordVisible = !isNewPasswordVisible"
        :icon="isNewPasswordVisible ? 'visibility_off' : 'visibility'"
        unelevated
        rounded
        dense
      ></q-btn>
    </q-input>

    <q-btn @click="onSubmit">Change Password</q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'stores/auth-store';
import { useQuasar } from 'quasar';

const isCurrentPasswordVisible = ref(false);
const isNewPasswordVisible = ref(false);
const currentPassword = ref('');
const newPassword = ref('');
const authStore = useAuthStore();
const { changePassword } = authStore;
const $q = useQuasar();
async function onSubmit() {
  console.log(currentPassword.value, newPassword.value);
  try {
    const res = await changePassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    });
    if (res)
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Submitted',
      });
  } catch (e) {
    console.log(e);
  }
}
</script>
