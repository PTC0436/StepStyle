import filterAction from "../filterActions.js";

//Hàm setUpFilter dùng để xử lý toàn bộ logic tương tác filter trên UI
export const setUpFilter = () => {
  document.addEventListener("click", (e) => {
    //XỬ LÝ CLEAR FILTER
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

    //XỬ LÝ CHỌN FILTER ITEM
    const filterItem = e.target.closest(".filter__item");
    if (filterItem) {
      //Đóng modal filter (nếu đang mở)
      const modalEl = document.getElementById("filterModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();

      //Brand
      if (filterItem.classList.contains("filter__item-brand")) {
        //Nếu đang active thì bỏ filter
        if (filterItem.classList.contains("filter__item--active"))
          filterAction.changeBrand("");
        //Nếu chưa active thì set filter
        else filterAction.changeBrand(filterItem.dataset.brand);
      }
      //Gender
      else if (filterItem.classList.contains("filter__item-gender")) {
        //Nếu đang active thì bỏ filter
        if (filterItem.classList.contains("filter__item--active"))
          filterAction.changeGender("");
        //Nếu chưa active thì set filter
        else filterAction.changeGender(filterItem.dataset.gender);
      }
      //Price range
      else if (filterItem.classList.contains("filter__item-price")) {
        //Nếu đang active thì bỏ filter
        if (filterItem.classList.contains("filter__item--active"))
          filterAction.changePriceRange();
        //Nếu chưa active thì set filter
        else
          filterAction.changePriceRange(
            Number(filterItem.dataset.priceStart),
            Number(filterItem.dataset.priceEnd),
          );
      }
      //Tags
      else if (filterItem.classList.contains("filter__item-tag")) {
        //Nếu chưa active thì thêm tag
        if (!filterItem.classList.contains("filter__item--active"))
          filterAction.addTag(filterItem.dataset.tag);
        //Nếu đang active thì xóa tag
        else filterAction.deleteTag(filterItem.dataset.tag);
      }
    }
  });
};

export default setUpFilter;
