<template>
  <div class="border border-b-amber-700 bg-gray-700 text-white min-h-screen">
    <div class="flex flex-col items-center w-full mx-auto mt-8 p-4">
      <div class="mb-8">
        <div class="flex mx-auto gap-4 mb-6">
          <input
            v-model="newTask"
            @keyup.enter="addTask()"
            type="text"
            class="border p-3 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Add new task"
          />
          <button
            @click="addTask()"
            class="bg-red-500 hover:bg-red-700 p-3 rounded-md cursor-pointer font-semibold transition duration-200 ease-in-out"
          >
            ADD TASK
          </button>
        </div>

        <TaskFilter />
      </div>

      <div
        class="flex flex-col mt-8 border border-gray-600 gap-6 p-6 rounded-xl w-full max-w-3xl bg-gray-800 shadow-lg min-h-[500px]"
      >
        <div
          class="flex flex-col sm:flex-row gap-4 items-center p-4 bg-gray-700 rounded-md shadow-sm"
          v-for="(task, index) in tasks"
          :key="index"
        >
          <input
            v-if="index === currentEdit"
            v-model="task.text"
            @keyup.enter="saveTask(task, index)"
            @blur="saveTask(task, index)"
            type="text"
            class="flex-grow text-xl sm:text-2xl border border-gray-500 p-2 rounded-md overflow-auto focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <div
            v-else
            class="flex-grow text-xl sm:text-2xl font-medium break-words max-h-20 overflow-auto"
            :class="
              task.completedTask ? 'text-green-400 line-through' : 'text-white'
            "
          >
            {{ task.text }}
          </div>

          <div class="flex flex-wrap gap-3 mt-3 sm:mt-0">
            <button
              :class="{ disabled: index === currentEdit }"
              class="bg-yellow-500 hover:bg-yellow-700 w-20 h-8 rounded-md cursor-pointer font-semibold transition duration-200 ease-in-out"
              @click="completedButtonTask(task, index)"
            >
              {{ task.completedTask ? "Undo" : "Complete" }}
            </button>
            <button
              @click="
                index === currentEdit
                  ? saveTask(task, index)
                  : editTask(task, index)
              "
              class="bg-violet-500 hover:bg-violet-700 w-20 h-8 rounded-md cursor-pointer font-semibold transition duration-200 ease-in-out"
            >
              {{ index === currentEdit ? " Save" : "Edit" }}
            </button>
            <button
              class="bg-red-600 hover:bg-red-800 w-20 h-8 rounded-md cursor-pointer font-semibold transition duration-200 ease-in-out"
              @click="deleteTask(task, index)"
            >
              Delete
            </button>
          </div>
        </div>
        <div
          v-if="tasks.length === 0"
          class="text-center text-gray-400 text-lg py-10"
        >
          No tasks found. Try adding some or adjusting your search/filter.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTodoStore } from "~/store/todo.js";
import { storeToRefs } from "pinia";
import TaskFilter from "~/components/TaskFilter.vue";

const store = useTodoStore();

const {
  newTask,
  searchTerm,
  selectedTask,
  tasks,
  currentEdit,
  taskAccountCompleted,
} = storeToRefs(store);

const {
  addTask,
  handleSearch,
  editTask,
  saveTask,
  deleteTask,
  completedButtonTask,
  initializeStore,
} = store;

onMounted(() => {
  tasks.value = JSON.parse(localStorage.getItem("tasks-list")) || [];
});
</script>

<style lang="css">
button.disabled {
  cursor: not-allowed;
  opacity: 0.6; /* Add visual feedback for disabled */
}
</style>
