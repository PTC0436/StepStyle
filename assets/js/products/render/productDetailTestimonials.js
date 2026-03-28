import getRatingStars from "../utils/getRatingStars.js";
import getDateAndTime from "../utils/getDateAndTime.js";

//Hàm productDetailTestimonials dùng để tạo cấu trúc phần các đánh giá của sản phẩm trong trang chi tiết sản phẩm đó
const productDetailTestimonials = (reviews = []) => {
  return `
    <div class="product__testimonials">
      <h3>Đánh giá sản phẩm</h3>
      <div class="product__testi-wrapper">
        ${
          reviews
            ?.map(
              (review) => `
          <div class="product__feedback">
            <div class="product__feedback-header">
              <div class="product__feedback-avt">
                <i class="ri-user-line"></i>
              </div>
              <div class="product__feedback-content">
                <p class="product__feedback-name">
                  ${review.user.name}
                </p>
                <div class="product__feedback-rating">
                  ${getRatingStars(review.rating)}
                </div>
                <div class="product__feedback-date">
                  ${getDateAndTime(review.createdAt)}
                </div>
              </div>
            </div>
            <div class="product__feedback-desc">
              ${review.content}
            </div>
          </div>
        `,
            )
            .join("") ||
          `<div class="product__feedback--empty">Hiện tại chưa có review</div>`
        }
      </div>
    </div>
  `;
};

export default productDetailTestimonials;
