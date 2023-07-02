<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Book Of Faces </q-toolbar-title>

          <q-btn flat @click="signOut" to="/auth">Sign Out</q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      persistent
      side="left"
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <DrawerList />
    </q-drawer>
    <div class="page-container">
      <q-page-container>
        <q-page>
          <router-view />
        </q-page>
      </q-page-container>
    </div>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useAccountStore } from 'stores/account-store';
import { useAuthStore } from 'stores/auth-store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  async beforeRouteEnter() {

    const { getAccount } = useAccountStore();
    const { tokenData } = storeToRefs(useAuthStore());
    try {
      await getAccount(tokenData.value?.userId || '');
    } catch (error) {
      console.log('Failed to get account', error);
    }
  },
});
</script>

<script setup lang="ts">
import { ref } from 'vue';
import DrawerList from 'components/DrawerList.vue';
const {removeAuthData}= useAuthStore()
const miniState = ref(false);
const leftDrawerOpen = ref(false);

function signOut(){
  removeAuthData()

}
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
}
</style>
