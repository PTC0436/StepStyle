import updateQuery from "../utils/updateQuery.js";
import getHashPath from "../utils/getHashPath.js";

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

const clearBrand = () => {
  updateQuery({ brand: null });
};

const clearGender = () => {
  updateQuery({ gender: null });
};

const clearTags = () => {
  updateQuery({ tags: [] });
};

const clearPriceRange = () => {
  updateQuery({ priceMin: null, priceMax: null });
};

const changeBrand = (newBrand) => {
  updateQuery({ brand: newBrand });
};

const changeGender = (newGender) => {
  updateQuery({ gender: newGender });
};

const changePriceRange = (priceMin, priceMax) => {
  const isDefault = priceMin === 0 && priceMax === 0;

  updateQuery({
    priceMin: isDefault ? null : priceMin,
    priceMax: isDefault ? null : priceMax,
  });
};

const addTag = (tag) => {
  if (!tag) {
    updateQuery({ tags: "" });
    return;
  }
  const { query } = getHashPath();
  const current = query.get("tags")?.split(",") || [];

  if (current.includes(tag)) return;

  updateQuery({ tags: [...current, tag] });
};

const deleteTag = (tag) => {
  const { query } = getHashPath();
  const current = query.get("tags")?.split(",") || [];

  updateQuery({ tags: current.filter((t) => t !== tag) });
};

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
