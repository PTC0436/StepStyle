import addToCart from "../utils/addToCart.js";
import getIdFromHash from "../utils/getIdFromHash.js";

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

    const quantityContent = document.querySelector(
      ".product__quantity-content",
    );
    const decrease = e.target.closest(".product__quantity-btn.decrease");
    if (decrease && Number(quantityContent.innerHTML) > 1) {
      quantityContent.innerHTML = Number(quantityContent.innerHTML) - 1;
    }
    const increase = e.target.closest(".product__quantity-btn.increase");
    if (increase && Number(quantityContent.innerHTML) < increase.dataset.max) {
      quantityContent.innerHTML = Number(quantityContent.innerHTML) + 1;
    }

    const add = e.target.closest(".product__action.add");
    if (add) {
      const colorChosen = document.querySelector(".product__color--active")
        ?.dataset.colorName;
      if (!colorChosen) {
        Swal.fire({
          icon: "error",
          title: "Vui lòng chọn màu!",
          timer: 2000,
          timerProgressBar: true,
        });
        return;
      }

      const sizeChosen = document.querySelector(".product__size--active")
        ?.dataset.size;
      if (!sizeChosen) {
        Swal.fire({
          icon: "error",
          title: "Vui lòng chọn size!",
          timer: 2000,
          timerProgressBar: true,
        });
        return;
      }

      const name = document.querySelector(".product__name")?.innerHTML;

      const price = document
        .querySelector(".product__price--current")
        ?.innerHTML.replace(/\./g, "");

      const thumbnail = document.querySelector("div[data-thumbnail]")?.dataset
        .thumbnail;

      const quantity = Number(
        document.querySelector(".product__quantity-content")?.innerHTML,
      );

      const id = getIdFromHash();

      addToCart({
        id,
        name,
        price,
        thumbnail,
        colorChosen,
        sizeChosen,
        quantity,
      });

      Swal.fire({
        title: "Đã thêm vào giỏ hàng!",
        icon: "success",
      });
    }
  });
}

export function setUpProductOptions() {
  document.querySelectorAll(".product__color").forEach((item) => {
    item.style.backgroundColor = item.dataset.color;
  });
}
