import addToCart from "./addToCart.js";
import formatCurrency from "./formatCurrency.js";
import { getProductById } from "./productsAPI.js";

const setUpColor = () => {
  document.querySelectorAll(".modal__color")?.forEach((item) => {
    item.style.backgroundColor = item.dataset.color;
  });
};

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
        });
        return;
      }
      const sizeChosen = document.querySelector(".modal__size--active")?.dataset
        .size;
      if (!sizeChosen) {
        Swal.fire({
          icon: "error",
          title: "Vui lòng chọn size!",
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
      Swal.fire({
        title: "Đã thêm vào giỏ hàng!",
        icon: "success",
      }).then(() => modal.hide());
    }
  });
};

const modalSkeleton = () => {
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

const modal = (shoes) => {
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

const setUpAddToCartOfProdCard = () => {
  document.addEventListener("click", async (e) => {
    const addBtn = e.target.closest(".prod__card .prod__add");
    if (!addBtn) return;
    const addModelContent = document.querySelector(
      "#addToCartModal .modal-content",
    );

    addModelContent.innerHTML = modalSkeleton();

    const shoes = await getProductById(addBtn.dataset.id);

    addModelContent.innerHTML = modal(shoes);

    setUpColor();
  });

  setUpAddToCartModal();
};

export default setUpAddToCartOfProdCard;

/*
{
  "name": "Duramo SL 2.0",
  "brand": "Adidas",
  "gender": "Women",
  "price": 5470000,
  "salePrice": 4345000,
  "currency": "VND",
  "thumbnail": "https://images.unsplash.com/photo-1533228067526-c21a6e8eaad7?w=400&q=60&auto=format",
  "images": [
    "https://images.unsplash.com/photo-1533228067526-c21a6e8eaad7?w=800&q=60&auto=format",
    "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?w=800&q=60&auto=format",
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=60&auto=format",
    "https://images.unsplash.com/photo-1684355414585-19abfb02a82e?w=800&q=60&auto=format",
    "https://images.unsplash.com/photo-1519931127525-6b6a7619a003?w=800&q=60&auto=format"
  ],
  "colors": [
    {
      "name": "Black",
      "hex": "#000000"
    },
    {
      "name": "White",
      "hex": "#ffffff"
    },
    {
      "name": "Cream",
      "hex": "#fffdd0"
    }
  ],
  "sizes": [38, 41, 43, 45],
  "stock": 2,
  "ratingAverage": 4,
  "ratingCount": 3,
  "description": "Minimalist design with reliable performance. Reflective details for visibility in low light. Lightweight build reduces fatigue. Modern style with dependable construction. Designed for both comfort and style. Breathable and flexible—built for your active life. Soft lining enhances wearing comfort. Comfortable fit for everyday wear. Engineered for smooth transitions. Soft cushioning for a smooth walking experience. Engineered for stability and comfort. Durable structure for long term wear. Lightweight feel for better mobility.",
  "material": "Knit",
  "weight": 0.96,
  "origin": "Thailand",
  "tags": [
    "Lifestyle",
    "Low-top",
    "Premium",
    "Sport"
  ],
  "isActive": true,
  "createdAt": "2026-03-17T12:25:33.335Z",
  "updatedAt": "2026-03-17T12:25:49.294Z",
  "id": "69b9483d557ba1976ca0741a"
}
*/
