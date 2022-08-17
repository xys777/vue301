<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import type { User } from "../../stores/user";
import TextField from "../common/TextField.vue";
import { mapState } from "pinia";
import { storeToRefs } from "pinia";

const searchQuery = ref("");
const gridColumns = ["id", "name", "age", "phone", "power"];
const store = useUserStore();
const { userDetail } = storeToRefs(store);
</script>

<template>
  <div class="form" data-test="form">
    <form @submit.prevent="store.updateUser">
      <TextField label="ID" v-model="userDetail.id"></TextField>
      <TextField label="Name" v-model="userDetail.name"></TextField>
      <TextField label="User Name" v-model="userDetail.username"></TextField>
      <TextField label="Email" v-model="userDetail.email"></TextField>

      <label for="address">Address</label>
      <div class="address row space">
        <input
          class="address-item"
          name="street"
          v-model="userDetail.address.street"
          placeholder="Street..."
        />
        <input
          class="address-item"
          name="suite"
          v-model="userDetail.address.suite"
          placeholder="Suite..."
        />
        <input
          class="address-item"
          name="city"
          v-model="userDetail.address.city"
          placeholder="City..."
        />
        <input
          class="address-item"
          name="zipcode"
          v-model="userDetail.address.zipcode"
          placeholder="Zipcode..."
        />
      </div>

      <TextField label="Phone" v-model="userDetail.phone"></TextField>
      <TextField label="Web site" v-model="userDetail.website"></TextField>

      <label for="">Company</label>
      <div class="row space">
        <input
          class="company-item"
          name="name"
          v-model="userDetail.company.name"
          placeholder="Name..."
        />
        <input
          class="company-item"
          name="catchPhrase"
          v-model="userDetail.company.catchPhrase"
          placeholder="Catch Phrase..."
        />
        <input
          class="company-item"
          name="bs"
          v-model="userDetail.company.bs"
          placeholder="Business..."
        />
      </div>

      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<style scoped>
.toolbar {
}

input {
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.address-item {
  width: 24%;
}
.company-item {
  width: 30%;
}
input[type="submit"] {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

.form {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
