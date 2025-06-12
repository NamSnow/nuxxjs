<template>
  <div class="border border-b-amber-700 bg-gray-700 text-white">
    <div class="flex flex-col items-center w-full mx-auto mt-4 h-screen">
      <div class="">
        <div class="flex mx-auto gap-2">
          <input
            v-model="newTask"
            @keyup.enter="addTask()"
            type="text"
            class="border p-2"
            placeholder="Add task"
          />
          <button
            @click="addTask()"
            class="bg-red-500 hover:bg-red-800 p-2 cursor-pointer"
          >
            ADD
          </button>
        </div>

        <div class="flex mt-8 gap-4 items-center">
          <div class="flex gap-2">
            <input
              type="text"
              class="border p-2"
              v-model="newSearchTask"
              placeholder="Nhập tìm kiếm ..."
              @keyup.enter="searchTaskButtons()"
            />
            <button
              @click="searchTaskButtons()"
              class="bg-blue-500 hover:bg-blue-800 p-2 cursor-pointer"
            >
              Search
            </button>
          </div>

          <div>Task</div>

          <div>
            <select
              name=""
              id=""
              class="border p-2 rounded-2xl"
              v-model="selectedTask"
            >
              <option value="#" class="bg-gray-700">-- Chọn --</option>
              <option value="incomplete" class="bg-gray-700">
                Chưa hoàn thành
              </option>
              <option value="completed" class="bg-gray-700">
                Đã hoàn thành
              </option>
            </select>
          </div>

          <div class="relative cursor-pointer">
            <img src="../../tasks-app.svg" alt="" class="w-8 h-8" />
            <div
              class="absolute top-[-13px] right-[-8px] rounded-full text-center"
            >
              {{ taskAccountCompleted }} /
              {{ finalFilterTasks.length }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col mt-6 border gap-6 p-4 rounded-xl w-[500px] h-[700px]"
      >
        <div
          class="flex gap-4 items-center"
          v-for="(task, index) in finalFilterTasks"
          :key="index"
        >
          <div
            v-if="!task.isEditing"
            class="w-[200px] text-2xl"
            :class="task.completedTask ? 'text-red-500 line-through' : ''"
          >
            {{ task.text }}
          </div>
          <input
            v-else
            v-model="task.text"
            type="text"
            class="w-[200px] text-2xl border"
          />
          <button
            class="bg-yellow-500 hover:bg-yellow-800 px-4 py-2 cursor-pointer"
            @click="completedButtonTask(task)"
          >
            {{ task.completedTask ? "Undo" : "Comple" }}
          </button>
          <button
            @click="!task.isEditing ? eidtTask(task) : saveTask(task)"
            class="bg-violet-500 hover:bg-violet-800 px-4 py-2 cursor-pointer"
          >
            {{ !task.isEditing ? "Ed" : "Save" }}
          </button>
          <button
            class="bg-emerald-700 hover:bg-emerald-800 px-4 py-2 cursor-pointer"
            @click="deleteTask(task, index)"
          >
            Del
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const tasks = ref([]);
const newTask = ref("");
const selectedTask = ref("");
const newSearchTask = ref("");
const searchTerm = ref("");

let taskSearch = computed(() => {
  let filterTask = tasks.value;
  if (selectedTask.value === "incomplete") {
    filterTask = filterTask.filter((task) => !task.completedTask);
  } else if (selectedTask.value === "completed") {
    filterTask = filterTask.filter((task) => task.completedTask);
  }
  return filterTask;
});

const finalFilterTasks = computed(() => {
  let searched = taskSearch.value;
  if (searchTerm.value) {
    const searchTermLowerCase = searchTerm.value.toLowerCase();
    searched = searched.filter((e) => {
      const taskTextLowerCase = e.text.toLowerCase();
      const includesSearchTerm =
        taskTextLowerCase.includes(searchTermLowerCase);
      return includesSearchTerm;
    });
  }
  return searched;
});

const searchTaskButtons = () => {
  searchTerm.value = newSearchTask.value.trim();
};

const taskAccountCompleted = computed(() => {
  const countTrue = tasks.value.filter((task) => {
    const count = task.completedTask;
    return count;
  });
  return countTrue.length;
});

const addTask = () => {
  if (newTask.value.trim() === "") {
    return;
  } else {
    tasks.value.push({
      text: newTask.value,
      isEditing: false,
      completedTask: false,
    });
    newTask.value = "";
  }
};

const eidtTask = (taskToEdit) => {
  tasks.value.forEach((task) => {
    task.isEditing = false;
  });

  taskToEdit.isEditing = true;
};

const saveTask = (task) => {
  task.isEditing = false;
};

const deleteTask = (task, index) => {
  console.log(
    `${task.value} ${
      task.completedTask ? "hoàn thành, " : "chưa hoàn thành"
    }, ${task} ${task.isEditing ? "đang sửa" : "sửa hoàn tất"}`
  );
  tasks.value.splice(index, 1);
};

const completedButtonTask = (task) => {
  if (task.isEditing === true) {
    return;
  } else {
    task.completedTask = !task.completedTask;
  }
};

watch(
  tasks,
  (newTask) => {
    localStorage.setItem("tasks-list", JSON.stringify(newTask));
  },
  { deep: true }
);

onMounted(() => {
  const storedTask = localStorage.getItem("tasks-list");
  if (storedTask) {
    tasks.value = JSON.parse(storedTask);
  }
});
</script>
