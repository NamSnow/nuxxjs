<template>
  <div class="container mx-auto p-4 md:p-6 lg:p-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
      Danh sách khóa học
    </h2>

    <ul id="list-courses" class="space-y-4 mb-8">
      <li
        v-for="course in courses"
        :key="course.id"
        class="bg-white p-5 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <div class="text-xl font-semibold text-gray-700">
            {{ course.name }}
          </div>
          <p class="text-gray-600 mt-1">{{ course.description }}</p>
        </div>
        <div class="flex gap-4">
          <button
            @click="handleDeleteCourse(course.id)"
            class="mt-3 sm:mt-0 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            Delete
          </button>
          <button
            @click="handleEditCourse(course.id)"
            class="mt-3 sm:mt-0 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            Edit
          </button>
        </div>
      </li>
    </ul>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-2xl font-bold text-gray-800 mb-4">Thêm khóa học mới</h3>
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
          >Tên khóa học</label
        >
        <input
          type="text"
          name="name"
          id="name"
          v-model="newCourse.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Nhập tên khóa học"
        />
      </div>
      <div class="mb-6">
        <label
          for="description"
          class="block text-gray-700 text-sm font-bold mb-2"
          >Mô tả</label
        >
        <input
          type="text"
          name="description"
          id="description"
          v-model="newCourse.description"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Nhập mô tả khóa học"
        />
      </div>
      <button
        type="button"
        @click="handleCreateForm"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
      >
        Tạo khóa học
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
var courseApi = "http://localhost:3001/courses";
const courses = ref([]);
const newCourse = reactive({
  name: "",
  description: "",
});

// Functions
function getCourses() {
  fetch(courseApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      courses.value = data;
    });
}

function createCourse(data) {
  var options = {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(courseApi, options).then(function (response) {
    // return response.json();
  });
  // .then(function () {
  //   // getCourses();
  //   newCourse.name = "";
  //   newCourse.description = "";
  // });
}

function handleDeleteCourse(id) {
  var options = {
    method: "DELETE",
    headers: {
      // "Content-Type": "application/json",
    },
  };
  fetch(`${courseApi}/${id}`, options).then(function (response) {
    // return response.json();
  });
}

function handleEditCourse(id) {
  var options = {
    method: "PUT",
    headers: {
      // "Content-Type": "application/json",
    },
  };
  fetch(`${courseApi}/${id}`, options).then(function (response) {
    // return response.json();
  });
}

function handleCreateForm(event) {
  if (newCourse.name && newCourse.description) {
    createCourse({
      name: newCourse.name,
      description: newCourse.description,
    });
  } else {
    alert("Please fill");
  }
  event.preventDefault();
}

getCourses();
</script>

<style lang="scss" scoped></style>
