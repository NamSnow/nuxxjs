<template>
  <div class="add-task-section">
    <input
      v-model="newTask"
      type="text"
      placeholder="Thêm công việc mới..."
      @keyup.enter="addTask()"
    />
    <button @click="addTask()">Add</button>
  </div>

  <div class="task-management-section">
    <div class="search-filter-row">
      <div>
        <input
          type="search"
          placeholder="Tìm kiếm công việc..."
          v-model="searchTerm"
        />
        <button>Search</button>
      </div>

      <div>Kết quả tìm kiếm: {{ filteredAndSearchedTasks.length }}</div>
    </div>

    <div class="tasks-overview">
      <h2>Tasks</h2>
      <div class="task-count">
        <img src="~/public/tasks-app.svg" alt="tasks icon" />
        <div>{{ completedTask }} / {{ tasks.length }}</div>
      </div>
      <select v-model="selectedFilter">
        <option value="">--Chọn--</option>
        <option value="incomplete">Chưa hoàn thành</option>
        <option value="completed">Đã hoàn thành</option>
      </select>
    </div>

    <div
      class="task-list"
      v-for="(task, index) in filteredAndSearchedTasks"
      :key="index"
    >
      <div class="task-item">
        <div
          v-if="!task.isEditing"
          :class="task.complTask ? 'line-through text-gray-700' : ''"
        >
          {{ task.text }}
        </div>
        <input v-else type="text" v-model="task.text" />
        <button @click="buttonComplTask(task)">
          {{ task.complTask ? "Undo" : "Compl" }}
        </button>
        <button @click="task.isEditing ? saveTask(task) : editTask(task)">
          {{ task.isEditing ? "Save" : "Edit" }}
        </button>
        <button @click="deleteTask(index)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import "../../assets/css/main.css";
import { ref, computed, watch, onMounted } from "vue";
const tasks = ref([]);
const newTask = ref("");
const selectedFilter = ref("");
const searchTerm = ref("");

const filteredAndSearchedTasks = computed(() => {
  let filtered = tasks.value;
  if (selectedFilter.value === "incomplete") {
    filtered = filtered.filter((task) => !task.complTask);
  } else if (selectedFilter.value === "completed") {
    filtered = filtered.filter((task) => task.complTask);
  }

  if (searchTerm.value) {
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
    filtered = filtered.filter((task) =>
      task.text.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  return filtered;
});

const completedTask = computed(() => {
  return tasks.value.filter((task) => task.complTask).length;
});

const addTask = () => {
  if (newTask.value.trim() === "") {
    return;
  }

  tasks.value.push({ text: newTask.value, isEditing: false, complTask: false });
  newTask.value = "";
};

const editTask = (taskToEdit) => {
  tasks.value.forEach((task) => {
    task.isEditing = false;
  });
  taskToEdit.isEditing = true;
  taskToEdit.complTask = false;
};

const saveTask = (task) => {
  task.isEditing = false;
  console.log("Sửa thành công");
};

const deleteTask = (index) => {
  // if (confirm("Bạn có muốn xóa k")) {
  //   tasks.value.splice(index, 1);
  // }
  tasks.value.splice(index, 1);
};

const buttonComplTask = (taskToToggle) => {
  const originalIndex = tasks.value.findIndex((task) => task === taskToToggle);

  if (taskToToggle !== -1) {
    if (!taskToToggle.complTask) {
      tasks.value.splice(originalIndex, 1);
      taskToToggle.complTask = true;
      tasks.value.push(taskToToggle);
    } else {
      taskToToggle.complTask = false;
    }
  }

  taskToToggle.isEditing = false;
};

watch(
  tasks,
  (newTask) => {
    localStorage.setItem("task-list", JSON.stringify(newTask));
  },
  { deep: true }
);

onMounted(() => {
  const storedTask = localStorage.getItem("task-list");
  if (storedTask) {
    tasks.value = JSON.parse(storedTask);
  }
});
</script>
