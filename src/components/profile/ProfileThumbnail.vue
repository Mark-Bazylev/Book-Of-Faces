<template>
  <div class="profile-div">
    <q-img
      width="800px"
      height="200px"
      fit="cover"
      class="profile-thumbnail rounded-borders col-6 q-ma-sm"
      :src="coverUrl"
    />

    <q-avatar size="128px" class="profile-avatar">
      <img :src="avatarUrl" alt="" />
    </q-avatar>
  </div>
  <h3 class="row justify-center">{{ name }}</h3>
</template>
<script setup lang="ts">
defineProps(['coverUrl', 'avatarUrl', 'name']);
</script>

<style scoped>
.profile-thumbnail {
}
.profile-div {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
}
.profile-avatar {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -60%);
}
</style>
