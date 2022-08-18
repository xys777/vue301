<script setup lang="ts">
import UserList from "@/components/user/UserList.vue";
import UserDetail from "../components/user/UserDetail.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import type { User } from "../stores/user";
const { userList, loading, error } = storeToRefs(useUserStore());
const { fetchUsers } = useUserStore();
fetchUsers();
</script>

<template>
  <main>
    <div class="loader" v-if="loading"></div>

    <p class="error" v-else-if="error">{{ (error as any).message }}</p>
    <div v-else class="user row">
      <UserList />
      <UserDetail></UserDetail>
    </div>
  </main>
</template>

<style scoped>
.loader {
  margin: 10rem auto;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.user {
}
</style>
