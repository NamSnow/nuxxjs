<template>
  <div class="rounded-full w-8 h-8 border relative cursor-pointer">
    <div
      id="heart"
      class="w-[1/2] h-1/2 absolute bg-red-500 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    ></div>
    <div
      id="hour-hand"
      class="rounded-full w-1 h-1 bg-blue-500 absolute top-1/2 left-1/2 -translate-y-1/2 origin-left rotate-270"
    ></div>
    <div
      id="minute-hand"
      class="rounded-full w-2 h-1 bg-blue-500 absolute top-1/2 left-1/2 -translate-y-1/2 origin-left rotate-233"
    ></div>
    <div
      id="second-hand"
      class="rounded-full w-4 h-1 bg-blue-500 absolute top-1/2 left-1/2 -translate-y-1/2 origin-left rotate-55"
    ></div>
    <div>00:00:00</div>
  </div>
</template>
