import { ref, computed, watch, onMounted } from "vue";
// import { useStore } from "vuex/types/index.js";

// const store = useStore();
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    tasks: [],
    newTask: "",
    dateTask: new Date().toLocaleString(),
    selectedTask: "",
    newSearchTask: "",
    searchTerm: "",
    editingInProgress: false,
    orgTaskValue: new Map(),
    currentEdit: -1,
    arraySearch: [],
    _array: [],
  }),

  getters: {
    taskAccountCompleted: (state) => {
      const countTrue = state.tasks.filter((task) => {
        return task.completedTask;
      });
      return countTrue.length;
    },
  },

  actions: {
    setupSelectedTaskWatcher() {
      watch(
        () => [selectedTask.value],
        () => {
          handleResearch();
          if (selectedTask.value) {
            if (selectedTask.value === "incomplete") {
              tasks.value = tasks.value.filter((task) => !task.completedTask);
              console.log("123", 123);
            } else if (selectedTask.value === "completed") {
              tasks.value = tasks.value.filter((task) => task.completedTask);
            }
          }
        }
      );
    },

    initializeStore() {
      tasks.value = JSON.parse(localStorage.getItem("tasks-list")) || [];
    },

    addTask() {
      if (newTask.value.trim() === "") {
        return;
      } else {
        tasks.value.push({
          text: newTask.value,
          date: dateTask.value,
          completedTask: false,
        });
        localStorage.setItem("tasks-list", JSON.stringify(tasks.value));
        newTask.value = "";
      }
    },

    editTask(task, index) {
      if (task.completedTask === true) return;
      // orgTaskValue.set(task, task.text);
      currentEdit.value = index;
    },

    handleSearch() {
      if (searchTerm.value) {
        const searchTermLowerCase = searchTerm.value.toLowerCase();
        tasks.value = tasks.value.filter((e) => {
          const taskTextLowerCase = e.text.toLowerCase();
          const includesSearchTerm =
            taskTextLowerCase.includes(searchTermLowerCase);
          return includesSearchTerm;
        });
      } else {
        tasks.value = JSON.parse(localStorage.getItem("tasks-list")) || [];
      }
    },

    handleResearch() {
      tasks.value = JSON.parse(localStorage.getItem("tasks-list"));
      handleSearch();
    },

    saveTask(task, index) {
      if (task.text === "") {
        if (
          confirm(
            "You just edited the empty task, the task will be deleted, ok"
          ) === true
        ) {
          tasks.value.splice(index, 1);
        }
      } else {
        console.log(orgTaskValue);
        // orgTaskValue.delete(task);
        localStorage.setItem("tasks-list", JSON.stringify(tasks.value));
        currentEdit.value = -1;
        tasks.value = [...tasks.value];
      }
    },

    deleteTask(task, index) {
      console.log(
        `${task.text} ${
          task.completedTask ? "hoàn thành" : "chưa hoàn thành"
        }, ${currentEdit.value !== -1 ? "đang sửa" : "sửa hoàn tất"}`
      );
      tasks.value.splice(index, 1);
      localStorage.setItem("tasks-list", JSON.stringify(tasks.value));
    },

    completedButtonTask(task, index) {
      if (currentEdit.value === index) return;
      task.completedTask = !task.completedTask;
      localStorage.setItem("tasks-list", JSON.stringify(tasks.value));
    },
  },
});

// onMounted(() => {
//   tasks.value = JSON.parse(localStorage.getItem("tasks-list")) || [];
// });

// watch(
//   () => [selectedTask.value],
//   () => {
//     console.log(_array.value);

//     let a = _array.value.length === 0 ? tasks.value : _array.value;
//     console.log("a", a);

//     if (selectedTask.value) {
//       if (selectedTask.value === "incomplete") {
//         tasks.value = a.filter((task) => !task.completedTask);
//       } else if (selectedTask.value === "completed") {
//         tasks.value = a.filter((task) => task.completedTask);
//       }
//     }
//   }
// );

//
// const taskSearch = computed(() => {
//   let filterTask = tasks.value;
//   if (selectedTask.value === "incomplete") {
//     filterTask = filterTask.filter((task) => !task.completedTask);
//   } else if (selectedTask.value === "completed") {
//     filterTask = filterTask.filter((task) => task.completedTask);
//   }
//   return filterTask;
// });

// const finalFilterTasks = computed(() => {
//   let searched = taskSearch.value;
//   if (searchTerm.value) {
//     const searchTermLowerCase = searchTerm.value.toLowerCase();
//     searched = searched.filter((e) => {
//       const taskTextLowerCase = e.text.toLowerCase();
//       const includesSearchTerm =
//         taskTextLowerCase.includes(searchTermLowerCase);
//       return includesSearchTerm;
//     });
//   }
//   return searched;
// });

//
// const taskSearch = computed(() => {
//   let filterTask = tasks.value;
//   if (selectedTask.value === "incomplete") {
//     filterTask = filterTask.filter((task) => !task.completedTask);
//   } else if (selectedTask.value === "completed") {
//     filterTask = filterTask.filter((task) => task.completedTask);
//   }
//   return filterTask;
// });
// const finalFilterTasks = computed(() => {
//   let searched = taskSearch.value;
//   if (searchTerm.value) {
//     const searchTermLowerCase = searchTerm.value.toLowerCase();
//     searched = searched.filter((e) => {
//       const taskTextLowerCase = e.text.toLowerCase();
//       const includesSearchTerm =
//         taskTextLowerCase.includes(searchTermLowerCase);
//       return includesSearchTerm;
//     });
//   }
//   return searched;
// });

// watch(
//   tasks,
//   (newTask) => {
//     editingInProgress.value = newTask.some((task) => task.isEditing);
//   },
//   { deep: true }
// );

const onBlur = (task) => {
  // if (orgTaskValue.has(task)) {
  //   task.text = orgTaskValue.get(task);
  //   orgTaskValue.delete(task);
  // }
  // task.isEditing = false;
};

// watch(
//   tasks,
//   (newTask) => {
//     localStorage.setItem("tasks-list", JSON.stringify(newTask));
//   },
//   { deep: true }
// );
