import { PRODUCT_DOMAIN } from "../utils/domain.js";
import formatCurrency from "../utils/formatCurrency.js";
import getRatingStars from "../utils/getRatingStars.js";

const prodCard = (data, className) => {
  const discountPercentage = (
    100 * (data.salePrice / data.price) -
    100
  ).toFixed(0);

  return `
    <div class="${className}">
      <div class="prod__card" data-id="${data.id}">
        <div class="prod__thumb">
          <a href=${PRODUCT_DOMAIN + "#/" + data.id}><img src=${data.thumbnail} alt="${data.name}" loading="lazy"/></a>
          <div class="prod__badges">
            ${data.tags?.includes("Hot") ? `<span class='prod__badge prod__badge--hot'>HOT</span>` : ""}
            ${discountPercentage < 0 ? `<span class='prod__badge prod__badge--sale'>${discountPercentage}%</span>` : ""}
          </div>  
          <div class="prod__add" data-id="${data.id}" data-bs-toggle="modal" data-bs-target="#addToCartModal"><i class="ri-shopping-cart-2-fill"></i></div>
        </div>
        <div class="prod__content">
          <a href=${PRODUCT_DOMAIN + "#/" + data.id}><p class="prod__name">${data.name}</p></a>
          <p class="prod__brand">${data.brand}</p>
          <div class="prod__price">
            <span class="prod__price--current" data-currency=${data.currency}>${formatCurrency(data.salePrice)}</span>
            ${discountPercentage < 0 ? `<span class="prod__price--old" data-currency=${data.currency}>${formatCurrency(data.price)}</span>` : ""}
          </div>
          <div class="prod__rating">
            <div class="prod__stars">${getRatingStars(data.ratingAverage)}</div>
            <div class="prod__score">${data.ratingAverage}</div>
            <div class="prod__num-reviews">(${data.ratingCount})</div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default prodCard;
