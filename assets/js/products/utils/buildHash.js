// Hàm buildHash dùng để tạo chuỗi hash URL phục vụ điều hướng (routing)
// Bao gồm:
// - path: đường dẫn chính (ví dụ: "/", "/productId")
// - query: object chứa các tham số (filter, phân trang,...)

const buildHash = (path = "/", query = {}) => {
  // Khởi tạo đối tượng URLSearchParams để xử lý query string
  const params = new URLSearchParams();

  // Duyệt qua từng cặp key-value trong object query
  Object.entries(query).forEach(([key, value]) => {
    // Chỉ thêm vào query nếu value hợp lệ (không null, undefined hoặc rỗng)
    if (value !== null && value !== undefined && value !== "") {
      params.set(key, value);
    }
  });

  // Chuyển params thành chuỗi query string
  const qs = params.toString();

  // Nếu có query thì trả về dạng: #/path?key=value
  // Nếu không có query thì trả về dạng: #/path
  return qs ? `#${path}?${qs}` : `#${path}`;
};

/*
Ví dụ:
buildHash("/", { brand: "Nike", page: 2 })
ra  "#/?brand=Nike&page=2"

buildHash("/123", {})
ra  "#/123"
*/

export default buildHash;
