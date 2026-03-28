//Hàm addToCartModalSkeleton dùng để tạo cấu trúc html modal hiện lên
//khi ấn nút giỏ hàng ở prodCard và chưa call api hoặc đang call và đợi response
const addToCartModalSkeleton = () => {
  return `
    <div class="modal-header border-0">
      <h5 class="modal-title skeleton width-250px height-25px border-radius-5px" id="addToCartModalLabel"></h5>
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
          <div class="skeleton width-100 aspect-ratio-4-3 border-radius-5px"></div>
        </div>
        <div class="modal__infor">
          <p class="modal__price skeleton width-150px border-radius-5px"></p>
          <div class="modal__selection">
            <p class="skeleton border-radius-5px">Chọn màu:</p>
            <div class="modal__options">
              ${[...Array(4)].map(() => `<div class="modal__color skeleton"></div>`).join("")}
            </div>
          </div>
          <div class="modal__selection">
            <p class="skeleton border-radius-5px">Chọn size:</p>
            <div class="modal__options">
              ${[...Array(4)].map(() => `<span class="modal__size skeleton"></span>`).join("")}
            </div>
          </div>
          <div class="skeleton width-150px height-25px border-radius-20px"></div>
        </div>
      </div>
    </div>

    <div class="modal-footer p-0 border-0">
      <div class="w-100 p-2 d-flex gap-2">
        <button
          type="button"
          class="flex-grow-1 skeleton height-30px border-radius-5px"
        >
          Add to cart
        </button>
        <button
          type="button"
          class="skeleton height-30px border-radius-5px"
        >
          Close
        </button>
      </div>
    </div>
  `;
};

export default addToCartModalSkeleton;
