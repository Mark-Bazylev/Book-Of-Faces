import { httpService } from 'src/services/http-services/http.service';

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
