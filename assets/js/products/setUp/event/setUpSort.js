import changeSort from "../changeSort.js";

const setUpSort = () => {
  document.addEventListener("click", (e) => {
    const btnSort = e.target.closest("button[data-sort-field]");
    if (!btnSort) return;
    if (btnSort.classList.contains("dropdown-item--active")) changeSort("", "");
    else changeSort(btnSort.dataset.sortField, btnSort.dataset.sortOrder);
  });
};

export default setUpSort;
