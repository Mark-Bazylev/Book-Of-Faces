<template>
  <q-toolbar class="justify-center">
    <q-input
      rounded
      outlined
      v-model="userInput"
      class="input"
      autogrow
      label="post here"
      type="textarea"
    />
    <q-btn @click="submitPost">Post</q-btn>
  </q-toolbar>
</template>

<script setup>
import { ref } from 'vue';
import { usePostsStore } from 'stores/posts-store';

const { createPost } = usePostsStore();
const userInput = ref('');
const submitPost = async () => {
  try {
    await createPost(userInput.value);
    userInput.value = '';
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
.input {
  width: 80vh;
  padding-right: 4vh;
}
</style>
