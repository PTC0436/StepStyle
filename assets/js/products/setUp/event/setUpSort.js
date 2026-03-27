import changeSort from "../changeSort.js";

//Hàm setUpSort dùng để xử lý logic sắp xếp (sort)

const setUpSort = () => {
  document.addEventListener("click", (e) => {
    //Kiểm tra click có phải nút sort không
    const btnSort = e.target.closest("button[data-sort-field]");
    if (!btnSort) return;

    //Nếu đang active thì bỏ sort (reset)
    if (btnSort.classList.contains("dropdown-item--active")) changeSort("", "");
    //Nếu chưa active thì áp dụng sort mới
    else changeSort(btnSort.dataset.sortField, btnSort.dataset.sortOrder);
  });
};

export default setUpSort;
