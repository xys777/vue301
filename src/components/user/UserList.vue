<script setup lang="ts">
import { ref, onMounted } from "vue";
import UserGird from "../common/Grid.vue";
import { storeToRefs } from "pinia";

import { useUserStore } from "../../stores/user";
import type { User } from "../../stores/user";
const store = useUserStore();
const searchQuery = ref("");
const gridColumns = ["id", "name", "username", "phone", "email"];
const { selectedUser } = storeToRefs(useUserStore());

const selectUser = (user: User) =>
  store.$patch((state) => (state.selectedUser = user));
</script>

<template>
  <div data-test="userlist">
    <div class="toolbar row" data-test="tools">
      <div class="grow" data-test="search">
        Search <input name="query" v-model="searchQuery" />
      </div>
      <div data-test="actions">
        <button @click="store.addUser">New</button>
        <button @click="store.delUser">Delete</button>
      </div>
    </div>
    <UserGird
      :data="store.userList"
      :columns="gridColumns"
      :filter-key="searchQuery"
      :activeRow="selectedUser"
      @selectRow="selectUser"
    >
    </UserGird>
  </div>
</template>

<style scoped>
.toolbar {
}
</style>
