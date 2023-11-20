<template>
  <q-btn
    icon="home"
    label="Home"
    stack
    flat
    no-caps
    :to="{ name: RouteNames.home }"
    clickable
    v-ripple
  >
  </q-btn>
  <q-btn
    icon="account_circle"
    label="Profile"
    no-caps
    stack
    flat
    :to="{ name: RouteNames.profile, params: { id: '' } }"
    clickable
    v-ripple
  >
  </q-btn>

  <q-btn
    icon="group"
    label="Friends"
    stack
    flat
    no-caps
    :to="{ name: RouteNames.friends }"
    clickable
    v-ripple
  >
  </q-btn>
  <q-btn
    icon="settings"
    label="Settings"
    stack
    flat
    no-caps
    :to="{ name: RouteNames.settings }"
    clickable
    v-ripple
  >
  </q-btn>
  <q-space />
</template>
<script setup lang="ts">
import { RouteNames } from 'src/router/routes';
</script>
