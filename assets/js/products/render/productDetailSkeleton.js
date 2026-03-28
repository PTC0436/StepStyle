import prodCardSkeleton from "./prodCardSkeleton.js";

//Hàm productDetailSkeleton dùng để tạo cấu trúc html cho trang chi tiết sản phẩm khi chưa hoặc đang call api
//(lúc chưa có dữ liệu)
//Cú pháp Array(n) chỉ tạo mảng có 4 ô trống nên không dùng map() được
//Cú pháp [...Array(n)] dùng để tạo 1 mảng có n phần tử undefined
//được dùng để tạo nhiều vòng lặp bên dưới do có method map()
const productDetailSkeleton = () => {
  return `
    <div class="product">
      <div class="container-xl">
        <div aria-label="breadcrumb">
          <div class="breadcrumb skeleton max-width-400px height-20px border-radius-5px margin-bottom-5px">
          </div>
        </div>
        <button class="btn-back btn-back--text"><i class="ri-arrow-left-long-line"></i></button>
        <div class="product__wrapper">
          <div class="row">
            <div class="col-md-5">
              <div class="product__images">
                <div class="product__slider-show slider slider-for">
                  <div class="product__slider-show-item skeleton aspect-ratio-4-3 border-radius-5px"></div>
                </div>
                <div class="product__slider-nav slider slider-nav skeleton min-height-60px border-radius-5px"></div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="product__body">
                <div class="product__name skeleton height-25px border-radius-5px margin-bottom-15px"></div>
                <div class="product__brand skeleton max-width-200px height-20px border-radius-5px"></div>
                <div class="product__rating skeleton max-width-250px height-20px border-radius-5px"></div>
                <div class="product__price skeleton max-width-300px height-20px border-radius-5px margin-top-5px"></div>
                <div class="product__selections">
                  <div class="row align-items-center gy-2">
                    <div class="col-xxl-2 col-md-4 col-sm-3">
                      <div class="product__selection skeleton max-width-200px height-30px border-radius-5px"></div>
                    </div>
                    <div class="col-xxl-10 col-md-8 col-sm-9">
                      <div class="product__options">
                        ${[...Array(4)].map(() => `<div class="product__color skeleton"></div>`).join("")}
                      </div>
                    </div>
                  </div>
                  <div class="row align-items-center gy-2">
                    <div class="col-xxl-2 col-md-4 col-sm-3">
                      <div class="product__selection skeleton max-width-200px height-30px border-radius-5px"></div>
                    </div>
                    <div class="col-xxl-10 col-md-8 col-sm-9">
                      <div class="product__options">
                        ${[...Array(5)].map(() => `<div class="product__size skeleton"></div>`).join("")}
                      </div>
                    </div>
                  </div>
                  <div class="row align-items-center gy-2">
                    <div class="col-xxl-2 col-md-4 col-sm-3">
                      <div class="product__selection skeleton max-width-200px height-30px border-radius-5px"></div>
                    </div>
                    <div class="col-xxl-10 col-md-8 col-sm-6">
                      <div class="product__quantity skeleton"></div>
                    </div>
                  </div>
                </div>

                <div class="product__actions">
                  <div class="product__action skeleton min-width-150px max-width-200px height-40px"></div>
                  <div class="product__action skeleton min-width-150px max-width-200px height-40px"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product__wrapper">
          <div class="product__infor">
            <h3 class="skeleton max-width-300px height-25px border-radius-5px"></h3>
            <div class="skeleton height-20px border-radius-5px"></div>
            <div class="skeleton height-20px border-radius-5px margin-top-5px"></div>
            <div class="skeleton height-20px border-radius-5px margin-top-5px"></div>
          </div>
        </div>
        <div class="product__wrapper">
          <div class="product__testimonials">
            <h3 class="skeleton max-width-300px height-25px border-radius-5px"></h3>
            <div class="product__testi-wrapper">
              ${[...Array(2)]
                .map(
                  () => `
                <div class="product__feedback">
                  <div class="product__feedback-header">
                    <div class="product__feedback-avt skeleton"></div>
                    <div class="product__feedback-content">
                      <p class="product__feedback-name skeleton width-200px height-20px border-radius-5px"></p>
                      <div class="product__feedback-rating skeleton width-150px height-20px border-radius-5px"></div>
                      <div class="product__feedback-date skeleton width-100px height-20px border-radius-5px"></div>
                    </div>
                  </div>
                  <div class="skeleton height-20px border-radius-5px margin-bottom-5px"></div>
                  <div class="skeleton height-20px border-radius-5px margin-bottom-5px"></div>
                  <div class="skeleton height-20px border-radius-5px"></div>
                </div>
                `,
                )
                .join("")}
              
            </div>
          </div>
        </div>
        <div class="product__wrapper">
          <div class="product__same-brand">
            <h3 class="skeleton max-width-300px height-25px border-radius-5px"></h3>
            <div class="row mt-2 gy-4 justify-content-center">
              ${[...Array(12)].map(() => prodCardSkeleton("col-xxl-3 col-lg-4 col-sm-4 col-6 px-md-3 px-1")).join("")}
            </div>
          <div>
        </div>
      </div>
    </div >
  `;
};

export default productDetailSkeleton;
