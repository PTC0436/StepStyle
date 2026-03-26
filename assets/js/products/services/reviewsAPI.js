import { api } from "../../utils/request.js";

export const getReviewsByShoeId = async (shoeId) => {
  const res = await api.get(`/api/reviews/shoe/${shoeId}`);
  return res;
};
