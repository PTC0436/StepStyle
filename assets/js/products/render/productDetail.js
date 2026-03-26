import productDetailBreadcrumb from "./productDetailBreadcrumb.js";
import productDetailMain from "./productDetailMain.js";
import productDetailInfor from "./productDetailInfor.js";
import productDetailTestimonials from "./productDetailTestimonials.js";
import productDetailSimilar from "./productDetailSimilar.js";

const productDetail = ({
  product = {},
  reviews = [],
  similarProducts = [],
}) => {
  return `
      <div class="product">
        <div class="container-xl">
          ${productDetailBreadcrumb(product.name)}
          <button class="btn-back btn-back--text"><i class="ri-arrow-left-long-line"></i></button>
          <div class="product__wrapper">
            ${productDetailMain(product)}
          </div>
          <div class="product__wrapper">
            ${productDetailInfor(product)}
          </div>
          <div class="product__wrapper">
            ${productDetailTestimonials(reviews)}
          </div>
          <div class="product__wrapper">
            ${productDetailSimilar(similarProducts)}
          </div>
        </div>
      </div >

      <div
        class="modal fade"
        id="addToCartModal"
        tabindex="-1"
        aria-labelledby="addToCartModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-md modal-dialog-centered">
          <div class="modal-content"></div>
        </div>
      </div>
    `;
};

export default productDetail;
