export function setUpProductSelection() {
  document.addEventListener("click", (e) => {
    const color = e.target.closest(".product__color");
    if (color) {
      if (!color.classList.contains("product__color--active")) {
        document
          .querySelector(".product__color--active")
          ?.classList.remove("product__color--active");
        color.classList.add("product__color--active");
      } else {
        color.classList.remove("product__color--active");
      }
    }

    const size = e.target.closest(".product__size");
    if (size) {
      if (!size.classList.contains("product__size--active")) {
        document
          .querySelector(".product__size--active")
          ?.classList.remove("product__size--active");
        size.classList.add("product__size--active");
      } else {
        size.classList.remove("product__size--active");
      }
    }
  });
}

export function setUpProductOptions() {
  document.querySelectorAll(".product__color").forEach((item) => {
    item.style.backgroundColor = item.dataset.color;
  });
}
