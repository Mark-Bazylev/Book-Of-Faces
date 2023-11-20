import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { Comment } from 'src/services/api-services/comments-service/models';
import { commentsService } from 'src/services/api-services/comments-service/comments.service';
import { usePostsStore } from 'stores/posts-store';
import { useAccountStore } from 'stores/account-store';
const { posts } = storeToRefs(usePostsStore());

const { addAccounts, getMyAccount } = useAccountStore();
export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Comment[]>([]);
  async function getMyComments() {
    const res = await commentsService.getMyComments();
    return res.data;
  }
  async function getPostComments(postId: string) {
    const res = await commentsService.getPostComments(postId);
    comments.value = res.data.comments;
    addAccounts(res.data.accountsMap);
    return res.data;
  }

  async function getComment(commentId: string) {
    const res = await commentsService.getComment(commentId);
    return res.data;
  }
  async function createComment(content: string, commentedIn: string) {
    const newComment = await commentsService.createComment(
      content,
      commentedIn
    );
    comments.value.push(newComment.data);
    const newAccount = await getMyAccount();
    addAccounts({ [newComment.data.createdBy]: newAccount });
    const post = posts.value.find((post) => post._id === commentedIn);
    if (post) post.commentsLength++;
    return newComment.data;
  }
  async function likeComment(commentId: string) {
    const res = await commentsService.likeComment(commentId);
    return res.data;
  }
  async function unlikeComment(commentId: string) {
    const res = await commentsService.unlikeComment(commentId);
    return res.data;
  }

  async function getCommentLikes(id: string) {
    const res = await commentsService.getCommentLikes(id);
    return res.data;
  }

  return {
    comments,
    getMyComments,
    getPostComments,
    getComment,
    createComment,
    likeComment,
    unlikeComment,
    getCommentLikes,
  };
});
