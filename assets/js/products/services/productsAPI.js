import api from "../../utils/request.js";

//Hàm getProductsList dùng để lấy danh sách sản phẩm theo filter
export const getProductsList = async (filter = {}) => {
  //Lọc và loại bỏ các key có value không hợp lệ trong filter
  const cleanFilter = Object.fromEntries(
    Object.entries(filter).filter(
      ([_, v]) => v !== null && v !== undefined && v !== "",
    ),
  );

  //Tạo query string(phần sau dấu '?')
  const query = new URLSearchParams(cleanFilter).toString();

  const res = await api.get(`/api/shoes?${query}`);
  return res;
};

//Hàm getProductById dùng để lấy thông tin chi tiết của một sản phẩm theo id
export const getProductById = async (id) => {
  const res = await api.get(`/api/shoes/${id}`);
  return res;
};

//Hàm getSimilarProducts dùng để lấy danh sách sản phẩm tương tự
export const getSimilarProducts = async (id, limit = null) => {
  const res = await api.get(
    `/api/shoes/${id}/similar${limit ? "?limit=" + limit : ""}`,
  );
  return res;
};

//Hàm getBrandList dùng để lấy danh sách các thương hiệu
export const getBrandList = async () => {
  const res = await api.get("/api/shoes/brands");
  return res;
};

//Hàm getGenderList dùng để lấy danh sách giới tính
export const getGenderList = async () => {
  const res = await api.get("/api/shoes/genders");
  return res;
};

//Hàm getTagList dùng để lấy danh sách tag
export const getTagList = async () => {
  const res = await api.get("/api/shoes/tags");
  return res;
};
