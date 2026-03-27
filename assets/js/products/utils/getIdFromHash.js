// Hàm getIdFromHash dùng để lấy id từ URL hash
// Ví dụ:
// "#/123" → id = "123"
// "#/products/123" → id = "123"

function getIdFromHash() {
  const hash = location.hash.replace(/^#\/?/, ""); //Loại bỏ ký tự "#" hoặc "#/" ở đầu chuỗi hash
  const parts = hash.split("/"); //Tách chuỗi theo dấu "/" thành mảng

  //Lấy phần tử cuối cùng làm id
  //Nếu không có id thì trả về null
  return parts[parts.length - 1] || null;
}

export default getIdFromHash;

/*
Ví dụ:
URL: http://127.0.0.1:3000/pages/products.html#/69b9483d557ba1976ca07474
thì getIdFromHash() = "69b9483d557ba1976ca07474"
*/
