<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Tasks
      </h1>

      <div class="flex gap-4 mb-8">
        <input
          type="text"
          class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          placeholder="Add a new task..."
          v-model="newTask"
          @keyup.enter="addTask()"
        />
        <button
          @click="addTask()"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add
        </button>
      </div>

      <div>
        <div
          class="flex items-center justify-between bg-gray-50 p-4 rounded-t-lg border-b border-gray-200"
        >
          <div class="text-lg font-semibold text-gray-800">Tasks</div>
        </div>

        <div
          v-for="(task, index) in tasks"
          :key="index"
          class="flex items-center justify-between p-4 bg-white border-b border-gray-200 last:border-b-0"
        >
          <input
            type="text"
            class="text-gray-700 flex-1 w-full border border-black"
            v-if="task.isEditing"
            v-model="task.text"
            @keyup.enter="saveTask(task)"
          />
          <div
            v-else
            class="text-gray-700 flex-1"
            :class="task.undoTask ? 'line-through text-red-900' : ''"
          >
            {{ task.text }}
          </div>
          <div class="flex gap-2">
            <button
              @click="undoTaskButton(task)"
              class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md text-sm transition duration-300 ease-in-out"
            >
              {{ task.undoTask ? "Undo" : "Complete" }}
            </button>
            <button
              @click="!task.isEditing ? editTask(task) : saveTask(task)"
              class="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md text-sm transition duration-300 ease-in-out"
            >
              {{ !task.isEditing ? "Edit" : "Save" }}
            </button>
            <button
              @click="deleteTask(index)"
              class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md text-sm transition duration-300 ease-in-out"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "~/assets/css/main.css";
import { ref, watch, onMounted } from "vue";
const tasks = ref([]);
const newTask = ref("");
const addTask = () => {
  if (newTask.value.trim() === "") {
    return;
  }

  tasks.value.push({ text: newTask.value, isEditing: false, undoTask: false });
  newTask.value = "";
};

const editTask = (taskToEdit, index) => {
  tasks.value.forEach((task) => {
    task.isEditing = false;
  });

  taskToEdit.undoTask = false;
  taskToEdit.isEditing = true;
  newTask.value = taskToEdit.text;
};

const saveTask = (task) => {
  task.isEditing = false;
  newTask.value = "";
};

const deleteTask = (index) => {
  if (confirm("Bạn có muốn xóa không")) {
    tasks.value.splice(index, 1);
  }
};

const undoTaskButton = (task) => {
  task.undoTask = !task.undoTask;
  task.isEditing = false;
};

watch(
  tasks,
  (newTask) => {
    localStorage.setItem("storedTask", JSON.stringify(newTask));
  },
  { deep: true }
);

onMounted(() => {
  const storedTask = localStorage.getItem("storedTask");
  if (storedTask) {
    tasks.value = JSON.parse(storedTask);
  }
});
</script>

<style lang="scss" scoped></style>
