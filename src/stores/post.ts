import { defineStore } from 'pinia'
interface Post{id:number,userId:number}
export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    posts: [] as Array<Post>,
    post: {userId:0} as Post|null,
    loading: false,
    error: null as any
  }),
  getters: {
    getPostsPerAuthor: (state) => {
      return (authorId:number) => state.posts.filter((post) => post.userId === authorId)
    }
  }, 
  actions: {
    async fetchPosts() {
      this.posts = []
      this.loading = true
      try {
        this.posts = await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json()) 
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchPost(id:number) {
      this.post = null 
      this.loading = true
      try {
        this.post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})