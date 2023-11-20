<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-icon size="28px" name="menu_book" />
        <q-toolbar-title> Book Of Faces </q-toolbar-title>
        <DrawerList />
        <q-btn flat @click="signOut" to="/auth">Sign Out</q-btn>
      </q-toolbar>
    </q-header>
    <div class="page-container">
      <q-page-container>

          <router-view />

      </q-page-container>
    </div>
  </q-layout>
</template>
<script lang="ts"></script>

<script setup lang="ts">
import DrawerList from 'components/NavList.vue';
import { useAuthStore } from 'stores/auth-store';
const { removeAuthData } = useAuthStore();

function signOut() {
  removeAuthData();
}
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
}
</style>
