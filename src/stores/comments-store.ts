import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { Comment } from 'src/services/http-services/comments-service/models';
import { commentsService } from 'src/services/http-services/comments-service/comments.service';
import { AccountsMap } from 'src/services/http-services/friends-service/models';
import { usePostsStore } from 'stores/posts-store';
import { useAccountStore } from 'stores/account-store';
const { posts } = storeToRefs(usePostsStore());
const { getAccount } = useAccountStore();
export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Comment[]>([]);
  const accountsMap = ref<AccountsMap>({});
  async function getMyComments() {
    const res = await commentsService.getMyComments();
    return res.data;
  }
  async function getPostComments(postId: string) {
    const res = await commentsService.getPostComments(postId);
    comments.value = res.data.comments;
    accountsMap.value = res.data.accountsMap;
    return res.data;
  }

  async function getComment(commentId: string) {
    const res = await commentsService.getComment(commentId);
    return res.data;
  }
  async function createComment(content: string, commentedIn: string) {
    const res = await commentsService.createComment(content, commentedIn);
    comments.value.push(res.data);
    const res2 = await getAccount(res.data.createdBy);
    accountsMap.value[res.data.createdBy] = res2.data;
    const post = posts.value.find((post) => post._id === commentedIn);
    if (post) post.commentsLength++;

    console.log(posts);
    console.log(comments.value);
    return res.data;
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
    accountsMap,
    getMyComments,
    getPostComments,
    getComment,
    createComment,
    likeComment,
    unlikeComment,
    getCommentLikes,
  };
});
