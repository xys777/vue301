<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from '@/stores/user'
import UserGird from "../common/Grid.vue";
const store = useUserStore()
const { userList, selectedUser,setUserList,selectUser } = store
const searchQuery = ref("");
const gridColumns = ["ID", "name", "age", "phone number","power"];
const gridData = [
  {ID:0, name: "Chuck Norris",age:33, "phone number":"39584650",power: Infinity },
  {ID:1, name: "Bruce Lee", age:40, "phone number":"39584720",power: 9000 },
  {ID:2, name: "Jackie Chan", age:25, "phone number":"39584678",power: 7000 },
  {ID:3, name: "Jet Li", age:54, "phone number":"39584245",power: 8000 },
];
setUserList(gridData)
</script>

<template>
  <form id="search">
    Search <input name="query" v-model="searchQuery">
  </form>
  <UserGird
    :data="userList"
    :columns="gridColumns"
    :filter-key="searchQuery"
    @selectRow="selectUser"
  ></UserGird>
</template>