export const fetchProductDetails = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === "1" || id === "123") {
        resolve({
          id: id,
          name: `Sản phẩm số ${id}`,
          price: (Math.random() * 100).toFixed(2),
          description: `Đây là mô tả chi tiết của sản phẩm số ${id}.`,
        });
      } else {
        reject(new Error(`Không tìm thấy sản phẩm với ID: ${id}`));
      }
    }, 1000); // Giả lập độ trễ mạng 1 giây
  });
};
