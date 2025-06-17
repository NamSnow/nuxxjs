<template>
  <div class="container mx-auto p-4">
    <form
      @submit.prevent="handleCreateCourse"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label
          for="courseName"
          class="block text-gray-700 text-sm font-bold mb-2"
          >Tên</label
        >
        <input
          name="name"
          type="text"
          id="courseName"
          placeholder="Nhập tên"
          v-model="newCourse.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div class="mb-6">
        <label
          for="courseDescription"
          class="block text-gray-700 text-sm font-bold mb-2"
          >Mô tả</label
        >
        <input
          name="description"
          type="text"
          id="courseDescription"
          placeholder="Nhập mô tả"
          v-model="newCourse.description"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create
        </button>
      </div>
    </form>

    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <li
        v-for="course in courses"
        :key="course.id"
        class="bg-white shadow-md rounded p-4 flex gap-4 items-center justify-between"
      >
        <div class="flex gap-4">
          <div class="font-bold text-xl mb-2">{{ course.name }}</div>
          <p class="text-gray-700 text-xl">{{ course.description }}</p>
        </div>
        <div class="flex gap-4">
          <button
            @click="deleteCourse(course.id)"
            class="bg-red-500 p-2 rounded-2xl hover:bg-red-700"
          >
            Delete
          </button>
          <button class="bg-green-500 p-2 rounded-2xl hover:bg-green-700">
            Edit
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
const courseApi = "http://localhost:3002/courses";
const courses = ref([]);
const newCourse = reactive({
  name: "",
  description: "",
});

function getCourse() {
  var options = {
    method: "GET",
  };

  fetch(courseApi, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      courses.value = data;
    });
}

function createCourse(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(courseApi, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function handleCreateCourse() {
  var formData = {
    name: newCourse.name,
    description: newCourse.description,
  };

  if (newCourse.name === "" || newCourse.description === "") {
    console.log("Nhập thiếu");
    return;
  } else {
    createCourse(formData);
  }
}

getCourse();
</script>
