import { defineStore } from "pinia";
import { usePostStore } from './post'
export interface User {
  id: number
  name:string
  username:string,
  website:string,
  address:Address,
  company:any
  // ... more fields
}
interface Address{
street:string
}
interface Error{
  message:string
}
export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userList: [] as User[],
    selectedUser: {} as User,
    loading: false,
    error: null 
  }),
  getters: {
    getPostAuthor: (state) => {
      const postStore = usePostStore()
      return state.userList.find((author) => author.id === postStore.post?.userId)
    },
    userDetail: (state)=>{
      const user = {
        id:'',
        name:'',
        username:'',
        email:'',
        phone:'',
        address:{
          street:'',
          city:'',
          suite:'',
          zipcode:''
        },
        company:{
          name:'',bs:'',catchPhrase:''
        }
      }
      return Object.assign(user,state.selectedUser)
    }
  },
  actions: {
    async fetchUsers() {
      this.loading=true;
      return fetch('api/users')
      .then((response) => response.json())
      .then(list=>this.userList=list)
      .catch(e=>this.error=e)
      .finally(()=>this.loading=false)
    },
    async updateUser(){
      // const index=this.userList.findIndex((user)=>user.id==this.selectedUser.id)
      // this.userList.splice(index,1,this.userDetail)
      // this.selectedUser=this.userDetail
      Object.assign(this.selectedUser,this.userDetail)      
    },
    addUser(){
      this.selectedUser = { id:new Date().getTime()} as User;
      this.userList.push(this.selectedUser)
    },
    delUser () {
      const index = this.userList.findIndex(user=>user.id==this.selectedUser.id)
      this.userList.splice(index,1);
        if(this.userList.length)
        this.selectedUser = this.userList[index>0?index-1:index];
        
    }
  }
});
