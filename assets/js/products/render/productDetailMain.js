import formatCurrency from "../utils/formatCurrency.js";
import getRatingStars from "../utils/getRatingStars.js";

const productDetailMain = (product) => {
  const discountPercentage = (
    100 * (product.salePrice / product.price) -
    100
  ).toFixed(0);

  return `
    <div class="row">
      <div class="col-md-5">
        <div class="product__images">
          <div data-thumbnail="${product.thumbnail}"></div>
          <div class="product__slider-show slider slider-for">
            ${product.images.map((img) => `<div class="product__slider-show-item"><img src=${img} alt="${product.name}" /></div>`).join("")}
          </div>
          <div class="product__slider-nav slider slider-nav">
            ${product.images.map((img) => `<div class="product__slider-nav-item"><img src=${img} alt="${product.name}" /></div>`).join("")}
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="product__body">
          <h3 class="product__name-wrapper">
            <span class="product__badges">
              ${product.tags.includes("Hot") ? `<span class='product__badge product__badge--hot'>HOT</span>` : ""}
              ${discountPercentage < 0 ? `<span class='product__badge product__badge--sale'>${discountPercentage}%</span>` : ""}
            </span>
            <span class="product__name">${product.name}</span>
          </h3>
          <p class="product__brand">${product.brand}</p>

          <div class="product__rating">
            <div class="product__stars">${getRatingStars(product.ratingAverage)}</div>
            <div class="product__score">${product.ratingAverage}</div>
            <div class="product__num-reviews">(${product.ratingCount})</div>
          </div>

          <div class="product__price">
            <span class="product__price--current" data-currency=${product.currency}>${formatCurrency(product.salePrice)}</span>
            ${discountPercentage < 0 ? `<span class="product__price--old" data-currency=${product.currency}>${formatCurrency(product.price)}</span>` : ""}
          </div>
          
          <div class="product__selections">
            <div class="row align-items-center gy-2">
              <div class="col-xxl-2 col-md-4 col-sm-3">
                <h2 class='product__selection'>Chọn màu:</h2>
              </div>
              <div class="col-xxl-10 col-md-8 col-sm-9">
                <div class="product__options">
                  ${product.colors
                    .map(
                      (color) => `
                    <div class="product__color" data-id="${product.id}" data-color=${color.hex} data-color-name=${color.name}></div>
                  `,
                    )
                    .join("")}
                </div>  
              </div>
            </div>
            <div class="row align-items-center gy-2">
              <div class="col-xxl-2 col-md-4 col-sm-3">
                <h2 class='product__selection'>Chọn size:</h2>
              </div>
              <div class="col-xxl-10 col-md-8 col-sm-9">
                <div class="product__options">
                  ${product.sizes
                    .map(
                      (size) => `
                    <span class="product__size" data-id="${product.id}" data-size=${size}>${size}</span>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            </div>
            <div class="row align-items-center gy-2">
              <div class="col-xxl-2 col-md-4 col-sm-3">
                <h2 class='product__selection'>Số lượng:</h2>
              </div>
              <div class="col-xxl-10 col-md-8 col-sm-6">
                <div class='product__quantity'>
                  <button class="product__quantity-btn decrease"><i class="ri-subtract-fill"></i></button>
                  <div class="product__quantity-content">1</div>
                  <button class="product__quantity-btn increase" data-max=${product.stock}><i class="ri-add-fill"></i></button>
                </div>
              </div>
            </div>
          </div>

          <div class="product__actions">
            ${
              product.stock != 0
                ? `
              <button class="product__action add">Thêm vào giỏ</button>
              <button class="product__action buy-now">Mua ngay</button>
              `
                : `
                  <div class="product__out-of-stock">Hết hàng!!!</div>
                `
            }
          </div>
        </div>
      </div>
    </div>
  `;
};

export default productDetailMain;
