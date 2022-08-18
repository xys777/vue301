import { defineStore } from "pinia";
import { usePostStore } from "./post";
interface Comment {
  id: number;
  postId: number;
}
export const useCommentStore = defineStore({
  id: "comment",
  state: () => ({
    comments: [] as Array<Comment>,
  }),
  getters: {
    getPostComments: (state) => {
      const postSore = usePostStore();
      return state.comments.filter((post) => post.postId === postSore.post?.id);
    },
  },
  actions: {
    async fetchComments() {
      this.comments = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      ).then((response) => response.json());
    },
  },
});
