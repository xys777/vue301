import { defineStore } from "pinia";
export interface User {
  ID: string
}
export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userList: [] as User[],
    selectedUser: {} as User
  }),
  getters: {
  },
  actions: {
    setUserList(list:User[]){
      this.userList = list;
    },
    addUser(user: User) {
      this.userList.push(user);
    },
    selectUser(user:User){
      this.selectedUser = user;
    },
  },
});
