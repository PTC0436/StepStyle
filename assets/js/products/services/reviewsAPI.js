import api from "../../utils/request.js";

//Lấy reviews theo id
export const getReviewsByShoeId = async (shoeId) => {
  const res = await api.get(`/api/reviews/shoe/${shoeId}`);
  return res;
};
