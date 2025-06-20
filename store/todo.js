import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTodoStore = defineStore("todo", () => {
  const tasks = ref([]);

  const searchTerm = ref("");
  const selectedTask = ref("");

  function updateTasks() {
    let allTasks = JSON.parse(localStorage.getItem("tasks-list")) || [];

    if (selectedTask.value === "incomplete") {
      allTasks = allTasks.filter((task) => !task.completedTask);
    } else if (selectedTask.value === "completed") {
      allTasks = allTasks.filter((task) => task.completedTask);
    }

    if (searchTerm.value) {
      const searchTermLowerCase = searchTerm.value.toLowerCase();
      allTasks = allTasks.filter((task) =>
        task.text.toLowerCase().includes(searchTermLowerCase)
      );
    }
    tasks.value = allTasks;
  }

  function handleSearchUpdate(val) {
    searchTerm.value = val;
    updateTasks();
  }
  function handleFilterUpdate(val) {
    selectedTask.value = val;
    updateTasks();
  }

  //   Khởi tạo task

  return {
    tasks,
    searchTerm,
    handleSearchUpdate,
    handleFilterUpdate,
  };
});
