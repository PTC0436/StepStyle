import { PRODUCT_DOMAIN } from "../utils/domain.js";
import formatCurrency from "../utils/formatCurrency.js";
import getRatingStars from "../utils/getRatingStars.js";

const prodCard = (product, className) => {
  const discountPercentage = (
    100 * (product.salePrice / product.price) -
    100
  ).toFixed(0);

  return `
    <div class="${className}">
      <div class="prod__card" data-id="${product.id}">
        <div class="prod__thumb">
          <a href=${PRODUCT_DOMAIN + "#/" + product.id}><img src=${product.thumbnail} alt="${product.name}" loading="lazy"/></a>
          <div class="prod__badges">
            ${product.tags?.includes("Hot") ? `<span class='prod__badge prod__badge--hot'>HOT</span>` : ""}
            ${discountPercentage < 0 ? `<span class='prod__badge prod__badge--sale'>${discountPercentage}%</span>` : ""}
          </div>  
          <div class="prod__add" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#addToCartModal"><i class="ri-shopping-cart-2-fill"></i></div>
        </div>
        <div class="prod__content">
          <a href=${PRODUCT_DOMAIN + "#/" + product.id}><p class="prod__name">${product.name}</p></a>
          <p class="prod__brand">${product.brand}</p>
          <div class="prod__price">
            <span class="prod__price--current" data-currency=${product.currency}>${formatCurrency(product.salePrice)}</span>
            ${discountPercentage < 0 ? `<span class="prod__price--old" data-currency=${product.currency}>${formatCurrency(product.price)}</span>` : ""}
          </div>
          <div class="prod__rating">
            <div class="prod__stars">${getRatingStars(product.ratingAverage)}</div>
            <div class="prod__score">${product.ratingAverage}</div>
            <div class="prod__num-reviews">(${product.ratingCount})</div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default prodCard;
