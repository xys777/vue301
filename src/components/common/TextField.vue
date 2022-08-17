<script setup lang="ts">
import { ref, computed } from "vue";
defineEmits(["update:modelValue"]);
const props = defineProps({
  label: String,
  modelValue: String,
});
const name = computed(() => label2name(props.label));
function label2name(str: string = "") {
  return str.replace(/ /g, "").toLowerCase();
}
</script>
<template>
  <label :for="name">{{ label }}</label>
  <input
    type="text"
    :id="name"
    :name="name"
    :placeholder="`Your ${label}`"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
<style scoped>
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>