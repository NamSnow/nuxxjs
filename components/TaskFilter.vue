<template>
  <div
    class="flex flex-wrap items-center justify-between gap-4 mt-8 p-4 bg-gray-800 rounded-lg shadow-md"
  >
    <div class="flex gap-4">
      <input
        type="text"
        class="border p-3 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        v-model="searchTerm"
        placeholder="Search tasks..."
        @keyup.enter="handleSearch()"
      />
      <button
        @click="handleSearch()"
        class="bg-blue-500 hover:bg-blue-700 p-3 rounded-md cursor-pointer font-semibold transition duration-200 ease-in-out"
      >
        SEARCH
      </button>
    </div>

    <div class="font-semibold text-lg">Filter Tasks:</div>

    <div>
      <select
        name="task-filter"
        id="task-filter"
        class="border p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        v-model="selectedTask"
      >
        <option value="#" class="bg-gray-700">-- Select --</option>
        <option value="incomplete" class="bg-gray-700">Incomplete</option>
        <option value="completed" class="bg-gray-700">Completed</option>
      </select>
    </div>

    <div class="relative cursor-pointer p-2 bg-gray-600 rounded-full">
      <img src="/tasks-app.svg" alt="Tasks icon" class="w-8 h-8 text-white" />
      <div
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full items-center justify-center border-2 border-gray-700"
      >
        {{ taskAccountCompleted }} /
        {{ tasks.length }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useTodoStore } from "~/store/todo";

const todoStore = useTodoStore();

const props = defineProps({
  tasks: Array,
  taskAccountCompleted: Number,
});

const emit = defineEmits(["update:searchTerm", "update:selectedFilter"]);
const searchTerm = ref("");
const selectedTask = ref("");

watch(selectedTask, (val) => emit("update:selectedFilter", val));

function handleSearch() {
  emit("update:searchTerm", searchTerm.value);
}
</script>

<style lang="scss" scoped></style>
