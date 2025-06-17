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
            <img
              src="/tasks-app.svg"
              alt="Tasks icon"
              class="w-8 h-8 text-white"
            />
            <div
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full items-center justify-center border-2 border-gray-700"
            >
              {{ taskAccountCompleted }} /
              {{ tasks.length }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col mt-8 border border-gray-600 gap-6 p-6 rounded-xl w-full max-w-3xl bg-gray-800 shadow-lg min-h-[500px]"
      >
        <div
          class="flex flex-col sm:flex-row gap-4 items-center p-4 bg-gray-700 rounded-md shadow-sm"
          v-for="(task, index) in tasks"
          :key="index"
        >
          {{ currentEdit }}
          <input
            v-if="index === currentEdit"
            v-model="task.text"
            @keyup.enter="saveTask(task, index)"
            @blur="onBlur(task)"
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

          <!-- <div>{{ task.date }}</div> -->
          <div class="flex flex-wrap gap-3 mt-3 sm:mt-0">
            <button
              :class="index === currentEdit ? 'disabled' : ''"
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
    <Store />
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from "vue";
// import { useStore } from "vuex/types/index.js";

const tasks = ref([]);
const newTask = ref("");
const dateTask = ref(new Date().toLocaleString());
const selectedTask = ref("");
const newSearchTask = ref("");
const searchTerm = ref("");
const editingInProgress = ref(false);
const orgTaskValue = new Map();
const currentEdit = ref(-1);
const arraySearch = ref([]);
const _array = ref([]);
// const store = useStore();

watch(
  () => [selectedTask.value],
  () => {
    console.log(_array.value);

    let a = _array.value.length === 0 ? tasks.value : _array.value;
    console.log("a", a);

    if (selectedTask.value) {
      if (selectedTask.value === "incomplete") {
        tasks.value = a.filter((task) => !task.completedTask);
      } else if (selectedTask.value === "completed") {
        tasks.value = a.filter((task) => task.completedTask);
      }
    }
  }
);

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

const handleResearch = () => {
  tasks.value = JSON.parse(localStorage.getItem("tasks-list"));
  handleSearch();
};
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
const handleSearch = () => {
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
};
const taskAccountCompleted = computed(() => {
  const countTrue = tasks.value.filter((task) => {
    return task.completedTask;
  });
  return countTrue.length;
});
const addTask = () => {
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
};
// watch(
//   tasks,
//   (newTask) => {
//     editingInProgress.value = newTask.some((task) => task.isEditing);
//   },
//   { deep: true }
// );
const editTask = (task, index) => {
  if (task.completedTask === true) return;
  // orgTaskValue.set(task, task.text);
  currentEdit.value = index;
};

const saveTask = (task, index) => {
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
};

const onBlur = (task) => {
  // if (orgTaskValue.has(task)) {
  //   task.text = orgTaskValue.get(task);
  //   orgTaskValue.delete(task);
  // }
  // task.isEditing = false;
};
const deleteTask = (task, index) => {
  console.log(
    `${task.text} ${task.completedTask ? "hoàn thành" : "chưa hoàn thành"}, ${
      currentEdit.value !== -1 ? "đang sửa" : "sửa hoàn tất"
    }`
  );
  tasks.value.splice(index, 1);
  localStorage.setItem("tasks-list", JSON.stringify(tasks.value));
};
const completedButtonTask = (task, index) => {
  if (currentEdit.value === index) return;
  task.completedTask = !task.completedTask;
  localStorage.setItem("tasks-list", JSON.stringify(tasks.value));
};

// watch(
//   tasks,
//   (newTask) => {
//     localStorage.setItem("tasks-list", JSON.stringify(newTask));
//   },
//   { deep: true }
// );
onMounted(() => {
  tasks.value = JSON.parse(localStorage.getItem("tasks-list")) || [];
});
</script>
<style lang="css">
button.disabled {
  cursor: not-allowed;
}
</style>
