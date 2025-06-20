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

        <TaskFilter
          :tasks="tasks"
          @update:searchTerm="todoStore.handleSearchUpdate"
          @update:selectedFilter="todoStore.handleFilterUpdate"
          :taskAccountCompleted="taskAccountCompleted"
        />
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
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from "vue";
// import { useStore } from "vuex/types/index.js";
import { useTodoStore } from "~/store/todo";
const todoStore = useTodoStore();

// const tasks = ref([]);
const tasks = computed(() => todoStore.tasks);
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

// function getAllTasks() {
//   return JSON.parse(localStorage.getItem("tasks-list")) || [];
// }

// function updateTasks() {
//   let allTasks = getAllTasks();

//   if (selectedTask.value === "incomplete") {
//     allTasks = allTasks.filter((task) => !task.completedTask);
//   } else if (selectedTask.value === "completed") {
//     allTasks = allTasks.filter((task) => task.completedTask);
//   }

//   if (searchTerm.value) {
//     const searchTermLowerCase = searchTerm.value.toLowerCase();
//     allTasks = allTasks.filter((task) =>
//       task.text.toLowerCase().includes(searchTermLowerCase)
//     );
//   }
//   tasks.value = allTasks;
// }

// function handleSearchUpdate(val) {
//   searchTerm.value = val;
//   updateTasks();
// }
// function handleFilterUpdate(val) {
//   selectedTask.value = val;
//   updateTasks();
// }

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

// const handleResearch = () => {
//   tasks.value = JSON.parse(localStorage.getItem("tasks-list")) || [];
//   handleSearch();
// };

// watch(
//   () => [selectedTask.value],
//   () => {
//     handleResearch();
//     if (selectedTask.value) {
//       if (selectedTask.value === "incomplete") {
//         tasks.value = tasks.value.filter((task) => !task.completedTask);
//         console.log("123", 123);
//       } else if (selectedTask.value === "completed") {
//         tasks.value = tasks.value.filter((task) => task.completedTask);
//       }
//     }
//   }
// );

const taskAccountCompleted = computed(() => {
  const countTrue = tasks.value.filter((task) => {
    return task.completedTask;
  });
  return countTrue.length;
});

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
</script>
<style lang="css">
button.disabled {
  cursor: not-allowed;
}
</style>
