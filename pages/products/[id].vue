<template>
  <div class="product-details">
    <h1>Chi tiết sản phẩm</h1>

    <div v-if="loading">Đang tải dữ liệu sản phẩm...</div>
    <div v-else-if="error" class="error-message">Lỗi: {{ error.message }}</div>
    <div v-else-if="product">
      <h2>{{ product.name }}</h2>
      <p><strong>ID:</strong> {{ product.id }}</p>
      <p><strong>Giá:</strong> ${{ product.price }}</p>
      <p><strong>Mô tả:</strong> {{ product.description }}</p>
    </div>
    <div v-else>Không tìm thấy thông tin sản phẩm.</div>

    <nuxt-link to="/">Về trang chủ</nuxt-link>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router"; // Nuxt 3 sử dụng useRoute từ vue-router
import { fetchProductDetails } from "~/utils/api"; // Sử dụng alias '~'

// Khởi tạo các ref để quản lý trạng thái
const product = ref(null);
const loading = ref(true);
const error = ref(null);

// Lấy đối tượng route từ Nuxt Router
const route = useRoute();

// Hàm để lấy dữ liệu sản phẩm
const getProduct = async (productId) => {
  loading.value = true;
  error.value = null;
  product.value = null; // Đặt lại dữ liệu sản phẩm khi bắt đầu tải mới

  try {
    const data = await fetchProductDetails(productId);
    product.value = data;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

// Gọi hàm getProduct khi component được mount (lần đầu tiên)
onMounted(() => {
  // Lấy ID từ params ngay khi component được mount
  const productId = route.params.id;
  if (productId) {
    getProduct(productId);
  }
});

// Sử dụng watch để theo dõi thay đổi của route.params.id
// Điều này rất quan trọng nếu người dùng điều hướng từ /products/1 sang /products/2
// mà không tải lại toàn bộ trang.
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      getProduct(newId);
    }
  },
  { immediate: true }
); // `immediate: true` để chạy watcher ngay lập tức khi component được tạo
</script>

<style scoped>
.product-details {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: sans-serif;
}

h1,
h2 {
  color: #333;
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>
