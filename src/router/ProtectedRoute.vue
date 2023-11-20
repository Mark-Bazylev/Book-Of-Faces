<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from 'stores/auth-store';
import { RouteNames } from 'src/router/routes';
function routeUpdate() {
  const { isLoggedIn } = useAuthStore();
  if (!isLoggedIn()) {
    return { name: RouteNames.auth };
  }
}
export default defineComponent({
  beforeRouteEnter: routeUpdate,
  beforeRouteUpdate: routeUpdate,
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
