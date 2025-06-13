<!-- <template>
  <div>
    <h2>Danh sách khóa học</h2>

    <ul id="list-courses"></ul>
  </div>
</template>

<script setup>
// var listCoursesBlock = document.querySelector("#list-courses");

var courseApi = "http://localhost:3001/courses";

function start() {
  getCourses(function (courses) {
    console.log(courses);
  });
}

start();

// Functions
function getCourses(callback) {
  fetch(courseApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function
</script>

<style lang="scss" scoped></style> -->

<template>
  <div></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
