import { httpService } from 'src/services/http-services/http.service';

class CommentsService {
  getMyComments() {
    return httpService.get('comments');
  }
  getComment(commentId: string) {
    return httpService.get(`comments/${commentId}`);
  }
  getPostComments(postId: string) {
    return httpService.get(`comments/post/${postId}`);
  }
  createComment(content: string, commentedIn: string) {
    return httpService.post('comments', { content, commentedIn });
  }
  likeComment(commentId: string) {
    return httpService.post('comments/likes/like', { commentId });
  }
  unlikeComment(commentId: string) {
    return httpService.post('comments/likes/unlike', { commentId });
  }

  getCommentLikes(id: string) {
    return httpService.get(`comments/likes/${id}`);
  }
}

export const commentsService = new CommentsService();
