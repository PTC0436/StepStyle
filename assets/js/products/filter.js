import updateQuery from "./updateQuery.js";
import getHashPath from "./getHashPath.js";

function handleClearAll() {
  updateQuery({
    search: null,
    brand: null,
    gender: null,
    sort: null,
    order: null,
    tags: [],
    priceRange: null,
  });
}

export function handleClearBrand() {
  updateQuery({ brand: null });
}

export function handleClearGender() {
  updateQuery({ gender: null });
}

function handleClearTags() {
  updateQuery({ tags: [] });
}

export function handleClearPriceRange() {
  updateQuery({ priceRange: null });
}

function handleChangeBrand(newBrand) {
  updateQuery({ brand: newBrand });
}

function handleChangeGender(newGender) {
  updateQuery({ gender: newGender });
}

function handleChangePriceRange(newPriceRange) {
  const isDefault = newPriceRange[0] === 0 && newPriceRange[1] === 0;

  updateQuery({
    priceRange: isDefault ? "" : newPriceRange,
  });
}

function handleAddTag(tag) {
  if (!tag) {
    updateQuery({ tags: "" });
    return;
  }
  const { query } = getHashPath();
  const current = query.get("tags")?.split(",") || [];

  if (current.includes(tag)) return;

  updateQuery({ tags: [...current, tag] });
}

export function handleDeleteTag(tag) {
  const { query } = getHashPath();
  const current = query.get("tags")?.split(",") || [];

  updateQuery({ tags: current.filter((t) => t !== tag) });
}

export function setUpFilter() {
  document.addEventListener("click", (e) => {
    const btnClear = e.target.closest(".filter__clear");
    if (btnClear) {
      if (btnClear.classList.contains("filter__clear-brand"))
        handleClearBrand();
      else if (btnClear.classList.contains("filter__clear-gender"))
        handleClearGender();
      else if (btnClear.classList.contains("filter__clear-price"))
        handleClearPriceRange();
      else if (btnClear.classList.contains("filter__clear-tags"))
        handleClearTags();
      else if (btnClear.classList.contains("filter__clear-all"))
        handleClearAll();
    }

    const filterItem = e.target.closest(".filter__item");
    if (filterItem) {
      const modalEl = document.getElementById("exampleModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();

      if (filterItem.classList.contains("filter__item-brand")) {
        if (filterItem.classList.contains("filter__item--active"))
          handleChangeBrand("");
        else handleChangeBrand(filterItem.dataset.brand);
      } else if (filterItem.classList.contains("filter__item-gender")) {
        if (filterItem.classList.contains("filter__item--active"))
          handleChangeGender("");
        else handleChangeGender(filterItem.dataset.gender);
      } else if (filterItem.classList.contains("filter__item-price")) {
        if (filterItem.classList.contains("filter__item--active"))
          handleChangePriceRange("");
        else
          handleChangePriceRange([
            Number(filterItem.dataset.priceStart),
            Number(filterItem.dataset.priceEnd),
          ]);
      } else if (filterItem.classList.contains("filter__item-tag")) {
        if (!filterItem.classList.contains("filter__item--active"))
          handleAddTag(filterItem.dataset.tag);
        else handleDeleteTag(filterItem.dataset.tag);
      }
    }
  });
}

export function setUpFilterItem() {
  const { query } = getHashPath();

  const brand = query.get("brand");
  document
    .querySelectorAll(`.filter__item-brand[data-brand="${brand}"]`)
    .forEach((item) => item.classList.add("filter__item--active"));

  const gender = query.get("gender");
  document
    .querySelectorAll(`.filter__item-gender[data-gender="${gender}"]`)
    .forEach((item) => item.classList.add("filter__item--active"));

  const priceRange = query.get("priceRange");

  const [priceStart, priceEnd] = priceRange
    ? priceRange
        .split(",")
        .map((v) => Number(v))
        .map((v) => (Number.isFinite(v) ? v : null))
    : [];

  const minPrice = priceStart ?? 0;
  const maxPrice = priceEnd ?? Infinity;

  document
    .querySelectorAll(
      `.filter__item-price[data-price-start="${minPrice}"][data-price-end="${maxPrice}"]`,
    )
    .forEach((item) => item.classList.add("filter__item--active"));

  const tags = query.get("tags")?.split(",") || [];
  tags.forEach((tag) =>
    document
      .querySelectorAll(`.filter__item-tag[data-tag="${tag}"]`)
      .forEach((item) => item.classList.add("filter__item--active")),
  );
}
