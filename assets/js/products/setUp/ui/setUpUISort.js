import getHashPath from "../../utils/getHashPath.js";

const setUpUISort = () => {
  const { query } = getHashPath();

  const sort = query.get("sort");
  if (!sort)
    document
      .querySelector("[data-sort-field='']")
      ?.classList.add("dropdown-item--active");
  else {
    const order = query.get("order");
    document
      .querySelector(`[data-sort-field="${sort}"][data-sort-order="${order}"]`)
      ?.classList.add("dropdown-item--active");
  }
};

export default setUpUISort;
