import addToCart from "../../utils/addToCart.js";

const setUpAddToCartModal = () => {
  document.addEventListener("click", (e) => {
    const color = e.target.closest("#addToCartModal .modal__color");
    if (color) {
      if (!color.classList.contains("modal__color--active")) {
        document
          .querySelector(".modal__color--active")
          ?.classList.remove("modal__color--active");
        color.classList.add("modal__color--active");
      } else {
        color.classList.remove("modal__color--active");
      }
    }

    const size = e.target.closest("#addToCartModal .modal__size");
    if (size) {
      if (!size.classList.contains("modal__size--active")) {
        document
          .querySelector(".modal__size--active")
          ?.classList.remove("modal__size--active");
        size.classList.add("modal__size--active");
      } else {
        size.classList.remove("modal__size--active");
      }
    }

    const quantity = document.querySelector(
      "#addToCartModal .modal__quantity-content",
    );

    const decrease = e.target.closest(
      "#addToCartModal .modal__quantity-btn.decrease",
    );
    if (decrease && Number(quantity.textContent) > 1) {
      quantity.textContent = Number(quantity.textContent) - 1;
    }

    const increase = e.target.closest(
      "#addToCartModal .modal__quantity-btn.increase",
    );
    if (
      increase &&
      Number(quantity.textContent) < Number(increase.dataset.max)
    ) {
      quantity.textContent = Number(quantity.textContent) + 1;
    }

    const add = e.target.closest("#addToCartModal .add");
    if (add) {
      const colorChosen = document.querySelector(".modal__color--active")
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
      const sizeChosen = document.querySelector(".modal__size--active")?.dataset
        .size;
      if (!sizeChosen) {
        Swal.fire({
          icon: "error",
          title: "Vui lòng chọn size!",
          timer: 2000,
          timerProgressBar: true,
        });
        return;
      }
      const name = document.querySelector(
        "#addToCartModal .modal-title",
      )?.innerHTML;
      const price = document
        .querySelector("#addToCartModal .modal__price")
        ?.innerHTML.replace(/\./g, "");
      const thumbnail = document
        .querySelector("#addToCartModal .modal__img img")
        ?.getAttribute("src");
      const quantity = Number(
        document.querySelector("#addToCartModal .modal__quantity-content")
          ?.innerHTML,
      );

      addToCart({
        id: add.dataset.id,
        name,
        price,
        thumbnail,
        colorChosen,
        sizeChosen,
        quantity,
      });

      const modalEl = document.getElementById("addToCartModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();

      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      }).fire({
        icon: "success",
        title: "Thêm vào giỏ hàng thành công!",
      });
    }
  });
};

export default setUpAddToCartModal;
