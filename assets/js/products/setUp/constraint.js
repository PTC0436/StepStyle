import {
  handleClearBrand,
  handleClearGender,
  handleClearPriceRange,
  handleDeleteTag,
} from "./filter.js";
import { handleChangeSort } from "./sort.js";

export function setUpConstraint() {
  document.addEventListener("click", (e) => {
    // console.log(e);
    const btnClear = e.target.closest(".products__constraint-clear");
    // console.log(btnClear);
    if (!btnClear) return;
    if (btnClear.classList.contains("products__constraint-clear-brand"))
      handleClearBrand();
    else if (btnClear.classList.contains("products__constraint-clear-gender"))
      handleClearGender();
    else if (btnClear.classList.contains("products__constraint-clear-price"))
      handleClearPriceRange();
    else if (btnClear.classList.contains("products__constraint-delete-tag"))
      handleDeleteTag(btnClear.dataset.tag);
    else if (btnClear.classList.contains("products__constraint-clear-sort"))
      handleChangeSort("", "");
  });
}
