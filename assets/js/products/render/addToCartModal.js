import formatCurrency from "../utils/formatCurrency.js";

const addToCartModal = (shoes) => {
  return `
    <div class="modal-header border-0">
      <h5 class="modal-title" id="addToCartModalLabel">${shoes.name}</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>

    <div class="modal-body m-1 p-0">
      <div class="w-100 p-2 d-flex gap-3 align-items-center">
        <div class="modal__img">
          <img src="${shoes.thumbnail}"/>
        </div>
        <div class="modal__infor">
          <p class="modal__price" data-currency=${shoes.currency}>${formatCurrency(shoes.salePrice)}</p>
          <div class="modal__selection">
            <p>Chọn màu:</p>
            <div class="modal__options">
              ${shoes.colors.map((color) => `<div class="modal__color" data-color=${color.hex} data-color-name=${color.name}></div>`).join("")}
            </div>
          </div>
          <div class="modal__selection">
            <p>Chọn size:</p>
            <div class="modal__options">
              ${shoes.sizes.map((size) => `<span class="modal__size" data-size=${size}>${size}</span>`).join("")}
            </div>
          </div>
          <div class="modal__quantity">
            <button class="modal__quantity-btn decrease"><i class="ri-subtract-fill"></i></button>
            <div class="modal__quantity-content">1</div>
            <button class="modal__quantity-btn increase" data-max=${shoes.stock}><i class="ri-add-fill"></i></button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-footer p-0 border-0">
      <div class="w-100 p-2 d-flex gap-2">
        <button
          type="button"
          class="btn flex-grow-1 add"
          data-id="${shoes.id}"
        >
          Add to cart
        </button>
        <button
          type="button"
          class="btn"
          data-bs-dismiss="modal"
        >
          Close
        </button>
      </div>
    </div>
  `;
};

export default addToCartModal;
