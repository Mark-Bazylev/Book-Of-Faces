import { httpService } from 'src/services/api-services/http.service';

class PostsService {
  getPosts() {
    return httpService.get('posts');
  }
  getPost(postId: string) {
    return httpService.get(`posts/${postId}`);
  }
  getFriendsPosts() {
    return httpService.get('posts/friends');
  }
  getUserPosts(userId:string){
    return httpService.get(`posts/users/${userId}`)
  }
  createPost(content: string) {
    return httpService.post('posts', { content });
  }
  likePost(postId: string) {
    return httpService.post('posts/likes/like', { postId });
  }
  unlikePost(postId: string) {
    return httpService.post('posts/likes/unlike', { postId });
  }

  getLikes(id: string) {
    return httpService.get(`posts/likes/${id}`);
  }
}

export const postsService = new PostsService();
