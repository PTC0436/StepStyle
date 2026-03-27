import getHashPath from "../../utils/getHashPath.js";

export const setUpUIFilter = () => {
  const { query } = getHashPath();

  const brand = query.get("brand");
  if (!brand)
    document
      .querySelectorAll(`.filter__item-brand[data-brand=""]`)
      .forEach((item) => item.classList.add("filter__item--active"));
  else
    document
      .querySelectorAll(`.filter__item-brand[data-brand="${brand}"]`)
      .forEach((item) => item.classList.add("filter__item--active"));

  const gender = query.get("gender");
  if (!gender)
    document
      .querySelectorAll(`.filter__item-gender[data-gender=""]`)
      .forEach((item) => item.classList.add("filter__item--active"));
  else
    document
      .querySelectorAll(`.filter__item-gender[data-gender="${gender}"]`)
      .forEach((item) => item.classList.add("filter__item--active"));

  const priceMin = query.get("priceMin");
  const priceMax = query.get("priceMax");

  document
    .querySelectorAll(
      `.filter__item-price[data-price-start="${priceMin ?? ""}"][data-price-end="${priceMax ?? ""}"]`,
    )
    .forEach((item) => item.classList.add("filter__item--active"));

  const tags = query.get("tags")?.split(",");
  if (!tags)
    document
      .querySelectorAll(`.filter__item-tag[data-tag=""]`)
      .forEach((tag) => tag.classList.add("filter__item--active"));
  else
    tags.forEach((tag) =>
      document
        .querySelectorAll(`.filter__item-tag[data-tag="${tag}"]`)
        .forEach((item) => item.classList.add("filter__item--active")),
    );
};

export default setUpUIFilter;
