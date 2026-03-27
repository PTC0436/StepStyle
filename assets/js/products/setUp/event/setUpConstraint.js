import filterAction from "../filterActions.js";
import changeSort from "../changeSort.js";

const setUpConstraint = () => {
  document.addEventListener("click", (e) => {
    //Xác định xem có phải nút clear được bấm không
    const btnClear = e.target.closest(".products__constraint-clear");
    if (!btnClear) return;

    //Xác định nút clear đó là nút gì và thực hiện chức năng tương ứng
    if (btnClear.classList.contains("products__constraint-clear-brand"))
      filterAction.clearBrand();
    else if (btnClear.classList.contains("products__constraint-clear-gender"))
      filterAction.clearGender();
    else if (btnClear.classList.contains("products__constraint-clear-price"))
      filterAction.clearPriceRange();
    else if (btnClear.classList.contains("products__constraint-delete-tag"))
      filterAction.deleteTag(btnClear.dataset.tag);
    else if (btnClear.classList.contains("products__constraint-clear-sort"))
      changeSort("", "");
  });
};
export default setUpConstraint;
