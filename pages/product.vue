<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">
    <p>Error code: {{ error.statusCode }}</p>
    <p>Error Message {{ error.message }}</p>
  </div>
  <div v-else>
    <button @click="refresh">Refresh Data</button>
    <div class="grid grid-cols-5 gap-4 bg-black">
      <div
        v-for="product in productInfo.products"
        class="flex flex-col shadow-md bg-white p-6 rounded-md"
      >
        <img class="w-[75px] h-auto self-center" :src="product.image" alt="" />
        <h2 class="text-black mt-auto text-sm">{{ product.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
// const {
//   pending,
//   data: products,
//   refresh,
// } = useFetch("https://fakestoreapi.com/products", {
//   lazy: false,
//   transform: (products) => {
//     return products.map((product) => ({
//       id: product.id,
//       title: product.title,
//       image: product.image,
//     }));
//   },
// });

const {
  pending,
  data: productInfo,
  refresh,
  error,
} = await useAsyncData(
  "productInfo",
  async () => {
    const [products, categories] = await Promise.all([
      $fetch("https://fakestoreapi.com/products"),
      $fetch("https://fakestoreapi.com/products/categories"),
    ]);

    return {
      products,
      categories,
    };
  },
  {
    lazy: false,
  }
);
</script>

<style lang="scss" scoped></style>
