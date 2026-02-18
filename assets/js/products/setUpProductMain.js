import getIdFromHash from "./getIdFromHash.js";
import {
  getProductDetailState,
  setProductDetailState,
} from "./productDetailStore.js";

export function setUpProductMain() {
  document.addEventListener("click", (e) => {
    const color = e.target.closest(".product__color");
    if (color) {
      if (!color.classList.contains("product__color--active")) {
        document
          .querySelector(".product__color--active")
          ?.classList.remove("product__color--active");
        color.classList.add("product__color--active");
        setProductDetailState(color.dataset.id, {
          color: color.dataset.colorName,
        });
      } else {
        color.classList.remove("product__color--active");
        setProductDetailState(color.dataset.id, { color: null });
      }
    }

    const size = e.target.closest(".product__size");
    if (size) {
      if (!size.classList.contains("product__size--active")) {
        document
          .querySelector(".product__size--active")
          ?.classList.remove("product__size--active");
        size.classList.add("product__size--active");
        setProductDetailState(size.dataset.id, { size: size.dataset.size });
      } else {
        size.classList.remove("product__size--active");
        setProductDetailState(size.dataset.id, { size: null });
      }
    }
  });
}

export function setUpProductMainOptions() {
  document.querySelectorAll(".product__color").forEach((e) => {
    e.style.backgroundColor = e.dataset.color;
  });

  const id = getIdFromHash();
  const { color = null, size = null } = getProductDetailState(id) || {};
  if (color) {
    document
      .querySelector(`[data-color-name="${color}"]`)
      ?.classList.add("product__color--active");
  }
  if (size) {
    document
      .querySelector(`[data-size="${size}"]`)
      ?.classList.add("product__size--active");
  }
}
