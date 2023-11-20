<template>
  <q-page class="row justify-center align-center">
    <q-card class="card-container">
      <q-splitter v-model="splitterModel" class="fit">
        <template v-slot:before>
          <q-tabs v-model="tab" vertical class="text-teal" inline-label>
            <q-tab name="changeEmail" icon="mail" label="Change Email" />
            <q-tab
              name="changePassword"
              icon="password"
              label="Change Password"
            />
            <q-tab name="editProfile" icon="edit" label="Edit Profile" />
            <q-tab name="deleteAccount" icon="delete" label="Delete Account" />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="changeEmail">
              <ChangeEmail />
            </q-tab-panel>

            <q-tab-panel name="changePassword">
              <ChangePassword />
            </q-tab-panel>

            <q-tab-panel name="editProfile">
              <EditProfile />
            </q-tab-panel>
            <q-tab-panel name="deleteAccount">
              <DeleteAccount />
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ChangeEmail from 'components/settings/ChangeEmail.vue';
import ChangePassword from 'components/settings/ChangePassword.vue';
import EditProfile from 'components/settings/EditProfile.vue';
import DeleteAccount from 'components/settings/DeleteAccount.vue';

const splitterModel = ref(30);
const tab = ref('changeEmail');
</script>

<style scoped>
.card-container {
  width: 100vh;
}
</style>
