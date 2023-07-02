import { defineStore } from 'pinia';
import { ref } from 'vue';
import { postsService } from 'src/services/http-services/posts-service/posts.service';
import { Post } from 'src/services/http-services/posts-service/models';

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([]);
  async function getFriendsPosts() {
    const res = await postsService.getFriendsPosts();
    posts.value = res.data;
    return res.data;
  }

  async function getPosts() {
    const res = await postsService.getPosts();
    posts.value = res.data.posts;
    return res.data.posts;
  }
  async function getPost(postId: string) {
    await postsService.getPost(postId);
  }

  async function createPost(content: string) {
    const res = await postsService.createPost(content);
    posts.value?.push(res.data);
  }

  async function likePost(postId: string) {
    console.log(postId);
    return await postsService.likePost(postId);
  }

  async function unlikePost(postId: string) {
    console.log(postId);
    return await postsService.unlikePost(postId);
  }
  async function getLikes(id: string) {
    return await postsService.getLikes(id);
  }
  return {
    posts,
    getPosts,
    getPost,
    getFriendsPosts,
    createPost,
    likePost,
    unlikePost,
    getLikes,
  };
});
