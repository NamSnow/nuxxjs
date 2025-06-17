import { defineStore } from "pinia";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [],
    newTaskText: "",
    searchTerm: "",
    selectedFilter: "#",
  }),
  getters: {
    completedTasksCount: (state) => {
      return state.tasks.filter((task) => task.completedTask).length;
    },
    filteredAndSearchedTasks: (state) => {
      let filtered = state.tasks;

      // Apply filter
      if (state.selectedFilter === "incomplete") {
        filtered = filtered.filter((task) => !task.completedTask);
      } else if (state.selectedFilter === "completed") {
        filtered = filtered.filter((task) => task.completedTask);
      }

      if (state.searchTerm) {
        const searchTermLower = state.searchTerm.toLowerCase();
        filtered = filtered.filter((task) =>
          task.text.toLowerCase().includes(searchTermLower)
        );
      }

      return filtered;
    },
  },
  actions: {
    loadTasks() {
      if (process.client) {
        const storedTasks = localStorage.getItem("tasks-list");
        if (storedTasks) {
          this.tasks = JSON.parse(storedTasks);
        }
      }
    },

    saveTasks() {
      if (process.client) {
        localStorage.setItem("tasks-list", JSON.stringify(this.tasks));
      }
    },
    addTask() {
      if (this.newTaskText.trim() === "") {
        return;
      }
      this.tasks.push({
        text: this.newTaskText,
        date: new Date().toLocaleString(),
        completedTask: false,
      });
      this.newTaskText = "";
      this.saveTasks(); // Save after adding
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks(); // Save after deleting
    },
    toggleTaskCompletion(index) {
      this.tasks[index].completedTask = !this.tasks[index].completedTask;
      this.saveTasks(); // Save after toggling completion
    },
    updateTaskText(index, newText) {
      this.tasks[index].text = newText;
      this.saveTasks(); // Save after updating text
    },
    setSearchTerm(term) {
      this.searchTerm = term;
    },
    setSelectedFilter(filter) {
      this.selectedFilter = filter;
    },
    // You might need an action to reset the filtered view if the user clears the search/filter
    resetFiltersAndSearch() {
      this.searchTerm = "";
      this.selectedFilter = "#";
      this.loadTasks(); // Reload original tasks
    },
  },
});
