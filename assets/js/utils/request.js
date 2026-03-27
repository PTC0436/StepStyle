//Đây là link lấy dữ liệu
const API_DOMAIN = "https://stepstyle-api.onrender.com";
const TIMEOUT = 500000; //Khoảng 8p20s

//Lưu lại user
export const saveAuth = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

//Lấy user từ localStorage
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

//Đăng xuất
export const logout = () => {
  //Xóa user
  localStorage.removeItem("user");
  //Về trang chủ
  window.location.href = "/index.html";
};

//Hàm fetchWithTimeout dùng để gửi request fetch kèm timeout
//Nếu request vượt quá thời gian quy định thì sẽ tự động reject
const fetchWithTimeout = (url, options, timeout = TIMEOUT) => {
  //Sử dụng Promise.race để chạy song song:
  //    fetch request
  //    một Promise timeout
  //Promise nào hoàn thành trước sẽ được trả về
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeout),
    ),
  ]);
};

//Hàm request là wrapper chung cho tất cả API calls
const request = async (method, path, data = null) => {
  //Thiết lập headers mặc định
  const headers = {
    "Content-Type": "application/json",
  };

  //Tạo options để fetch
  const options = {
    method,
    headers,
  };

  //Nếu có data thì chuyển thành JSON string để gửi lên server
  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    //Gửi request với timeout
    const res = await fetchWithTimeout(`${API_DOMAIN}${path}`, options);

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    //Parse dữ liệu trả về từ server
    const result = await res.json();

    //Nếu response không OK thì throw error
    if (!res.ok) {
      throw new Error(result.message || "API error");
    }

    return result;
  } catch (err) {
    //Ném lại lỗi để xử lý ở tầng gọi API
    throw err;
  }
};

//Đối tượng api cung cấp các method tương ứng với HTTP methods
//Giúp gọi API ngắn gọn và dễ sử dụng
const api = {
  get: (path) => request("GET", path),
  post: (path, data) => request("POST", path, data),
};

export default api;
