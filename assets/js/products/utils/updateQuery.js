import getHashPath from "./getHashPath.js";
import buildHash from "./buildHash.js";

//Hàm updateQuery dùng để cập nhật query params trên URL (hash)
//mà không làm mất các giá trị query hiện tại
//
//Mục đích:
// Cập nhật filter, phân trang, tìm kiếm,...
// Đồng bộ state của UI với URL
const updateQuery = (newQuery = {}) => {
  //Lấy path và query hiện tại (URLSearchParams). Xem chi tiết tại getHashPath.js
  const { path, query } = getHashPath();

  //Nếu không truyền page thì mặc định = 1
  if (!newQuery.page) newQuery.page = 1;

  //Duyệt từng key-value trong newQuery
  Object.entries(newQuery).forEach(([key, value]) => {
    //Nếu value không hợp lệ → xóa khỏi query
    if (value === null || value === undefined || value === "") {
      query.delete(key);
      return;
    }

    //Nếu key có value là mảng thì vào đây
    if (Array.isArray(value)) {
      if (value.length === 0) {
        query.delete(key); //Mảng rỗng([]) thì xóa khỏi query
      } else {
        //Convert mảng thành chuỗi (phân cách bằng dấu phẩy)
        query.set(key, value.join(","));
      }
      return;
    }

    //Trường hợp value bình thường thì set vào query
    query.set(key, value);
  });

  //Tạo hash mới từ path + query
  const newHash = buildHash(path, Object.fromEntries(query));

  //Nếu hash không thay đổi thì không cập nhật
  if (newHash == window.location.hash) return;

  //Nếu có thay đổi thì cập nhật URL
  window.location.hash = newHash;
};

export default updateQuery;
