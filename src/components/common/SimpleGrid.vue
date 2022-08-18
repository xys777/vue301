<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  columns: string[];
  data: any[];
  filterKey?: string;
  activeRow?: any;
}>();
const emit = defineEmits(["select-row"]);

const sortKey = ref("");
const sortOrders = ref(
  props.columns.reduce((o: any, key: string) => ((o[key] = 1), o), {})
);

const filteredData = computed(() => {
  let { data, filterKey } = props;
  if (filterKey) {
    filterKey = filterKey.toLowerCase();
    data = data.filter((row: any) => {
      return Object.keys(row).some((key) => {
        return (
          String(row[key])
            .toLowerCase()
            .indexOf(filterKey as string) > -1
        );
      });
    });
  }
  const key = sortKey.value;
  if (key) {
    const order = sortOrders.value[key];
    data = data.slice().sort((a: any, b: any) => {
      a = a[key];
      b = b[key];
      return (a === b ? 0 : a > b ? 1 : -1) * order;
    });
  }
  return data;
});

function sortBy(key: string) {
  sortKey.value = key;
  sortOrders.value[key] *= -1;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function selectRow(entry: any) {
  emit("select-row", entry);
}
</script>

<template>
  <div class="table-scroll">
    <table v-if="filteredData.length">
      <thead>
        <tr data-test="title">
          <th
            v-for="key in columns"
            :key="key"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }"
            :data-test="`column:${key}`"
          >
            {{ capitalize(key) }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entry, index) in filteredData"
          :key="(entry as any).id"
          :data-test="`row:${index}`"
          @click="selectRow(entry)"
        >
          <td
            v-for="key in columns"
            :key="key"
            :data-test="`key:${key}`"
            :class="{ active: activeRow == entry }"
          >
            {{ (entry as any)[key] }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else data-test="empty">No matches found.</p>
  </div>
</template>

<style scoped>
.table-scroll {
  height: 100%;
  overflow: auto;
}
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
  color: black;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}
td {
  background-color: #f9f9f9;
}
td.active {
  background-color: burlywood;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
