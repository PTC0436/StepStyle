import updateQuery from "../utils/updateQuery.js";
import getHashPath from "../utils/getHashPath.js";

//Module filterAction chứa các hàm xử lý logic filter

//Xóa toàn bộ filter (reset về trạng thái ban đầu)
const clearAll = () => {
  updateQuery({
    search: null,
    brand: null,
    gender: null,
    sort: null,
    order: null,
    tags: [],
    priceMin: null,
    priceMax: null,
  });
};

//Xóa filter theo brand
const clearBrand = () => {
  updateQuery({ brand: null });
};

//Xóa filter theo gender
const clearGender = () => {
  updateQuery({ gender: null });
};

//Xóa toàn bộ tag
const clearTags = () => {
  updateQuery({ tags: [] });
};

//Xóa filter khoảng giá
const clearPriceRange = () => {
  updateQuery({ priceMin: null, priceMax: null });
};

//Thay đổi brand filter
const changeBrand = (newBrand) => {
  updateQuery({ brand: newBrand });
};

//Thay đổi gender filter
const changeGender = (newGender) => {
  updateQuery({ gender: newGender });
};

//Thay đổi khoảng giá
//Nếu giá trị là (0, 0) thì coi như reset filter
const changePriceRange = (priceMin, priceMax) => {
  const isDefault = priceMin === 0 && priceMax === 0;

  updateQuery({
    priceMin: isDefault ? null : priceMin,
    priceMax: isDefault ? null : priceMax,
  });
};

//Thêm một tag vào filter
const addTag = (tag) => {
  //Đầu vào luôn đảm bảo tag hợp lệ
  //tag = "" thì hiển thị tất cả tags (không áp dụng filter)
  if (tag == "") {
    updateQuery({ tags: [] });
    return;
  }

  //Lấy danh sách tag hiện tại từ URL
  const { query } = getHashPath();
  const current = query.get("tags")?.split(",") || [];

  //Nếu tag đã tồn tại thì không thêm lại
  if (current.includes(tag)) return;

  //Thêm tag mới vào danh sách
  updateQuery({ tags: [...current, tag] });
};

//Xóa một tag khỏi filter
const deleteTag = (tag) => {
  const { query } = getHashPath();
  const current = query.get("tags")?.split(",") || [];

  //Lọc bỏ tag cần xóa
  updateQuery({ tags: current.filter((t) => t !== tag) });
};

//Gom các action vào một object để dễ sử dụng
//Giống pattern "action handler" trong các kiến trúc frontend hiện đại
const filterAction = {
  clearAll,
  clearBrand,
  clearGender,
  clearTags,
  clearPriceRange,
  changeBrand,
  changeGender,
  changePriceRange,
  addTag,
  deleteTag,
};

export default filterAction;
