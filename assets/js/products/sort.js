import getHashPath from "./getHashPath.js";
import updateQuery from "./updateQuery.js";

export function handleChangeSort(sortField, sortOrder = "asc") {
  updateQuery({ sort: sortField, order: sortOrder });
}

export function setUpSort() {
  document.addEventListener("click", (e) => {
    const btnSort = e.target.closest("button[data-sort-field]");
    if (!btnSort) return;
    if (btnSort.classList.contains("dropdown-item--active"))
      handleChangeSort("", "");
    else handleChangeSort(btnSort.dataset.sortField, btnSort.dataset.sortOrder);
  });
}

export function setUpSortItem() {
  const { query } = getHashPath();

  console.log(query);
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
}
