import filterAction from "../filterActions.js";

export const setUpFilter = () => {
  document.addEventListener("click", (e) => {
    const btnClear = e.target.closest(".filter__clear");
    if (btnClear) {
      if (btnClear.classList.contains("filter__clear-brand"))
        filterAction.clearBrand();
      else if (btnClear.classList.contains("filter__clear-gender"))
        filterAction.clearGender();
      else if (btnClear.classList.contains("filter__clear-price"))
        filterAction.clearPriceRange();
      else if (btnClear.classList.contains("filter__clear-tags"))
        filterAction.clearTags();
      else if (btnClear.classList.contains("filter__clear-all"))
        filterAction.clearAll();
    }

    const filterItem = e.target.closest(".filter__item");
    if (filterItem) {
      const modalEl = document.getElementById("exampleModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();

      if (filterItem.classList.contains("filter__item-brand")) {
        if (filterItem.classList.contains("filter__item--active"))
          filterAction.changeBrand("");
        else filterAction.changeBrand(filterItem.dataset.brand);
      } else if (filterItem.classList.contains("filter__item-gender")) {
        if (filterItem.classList.contains("filter__item--active"))
          filterAction.changeGender("");
        else filterAction.changeGender(filterItem.dataset.gender);
      } else if (filterItem.classList.contains("filter__item-price")) {
        if (filterItem.classList.contains("filter__item--active"))
          filterAction.changePriceRange();
        else
          filterAction.changePriceRange(
            Number(filterItem.dataset.priceStart),
            Number(filterItem.dataset.priceEnd),
          );
      } else if (filterItem.classList.contains("filter__item-tag")) {
        if (!filterItem.classList.contains("filter__item--active"))
          filterAction.addTag(filterItem.dataset.tag);
        else filterAction.deleteTag(filterItem.dataset.tag);
      }
    }
  });
};

export default setUpFilter;
