import prodCardSkeleton from "./prodCardSkeleton.js";

//Hàm này dùng để tạo cấu trúc html cho trang danh sách sản phẩm
//khi chưa có dữ liệu(chưa hoặc đang call api)
const productHomeSkeleton = () => {
  return `
    <div class="products py-md-4 py-3">
      <div class="container-xxl">
        <div class="products__wrapper d-flex">
          <div class="products__filter">
            <div class="filter">
              <div class="filter__header">
                <h3 class="filter__heading skeleton width-87px height-34px border-radius-5px"></h3>
                <div class="skeleton width-74px height-27px border-radius-5px"></div>
              </div>

              <div class="filter__label">
                <p class="filter__title skeleton width-120px height-30px border-radius-5px"></p>
                <button class="skeleton width-43px height-24px border-radius-5px"></button>
              </div>

              <div class="filter__list">
                <div class="skeleton width-100px height-34px border-radius-20px"></div>
                <div class="skeleton width-120px height-34px border-radius-20px"></div>
                <div class="skeleton width-80px height-34px border-radius-20px"></div>
                <div class="skeleton width-140px height-34px border-radius-20px"></div>
                <div class="skeleton width-150px height-34px border-radius-20px"></div>
                <div class="skeleton width-70px height-34px border-radius-20px"></div>
                <div class="skeleton width-120px height-34px border-radius-20px"></div>
                <div class="skeleton width-100px height-34px border-radius-20px"></div>
                <div class="skeleton width-140px height-34px border-radius-20px"></div>
                <div class="skeleton width-80px height-34px border-radius-20px"></div>
              </div>

              <div class="filter__label">
                <p class="filter__title skeleton width-120px height-30px border-radius-5px"></p>
                <button class="skeleton width-43px height-24px border-radius-5px"></button>
              </div>

              <div class="filter__list">
                <div class="skeleton width-100px height-34px border-radius-20px"></div>
                <div class="skeleton width-120px height-34px border-radius-20px"></div>
                <div class="skeleton width-80px height-34px border-radius-20px"></div>
                <div class="skeleton width-140px height-34px border-radius-20px"></div>
                <div class="skeleton width-150px height-34px border-radius-20px"></div>
                <div class="skeleton width-70px height-34px border-radius-20px"></div>
                <div class="skeleton width-120px height-34px border-radius-20px"></div>
                <div class="skeleton width-100px height-34px border-radius-20px"></div>
                <div class="skeleton width-140px height-34px border-radius-20px"></div>
                <div class="skeleton width-80px height-34px border-radius-20px"></div>
              </div>

              <div class="filter__label">
                <p class="filter__title skeleton width-120px height-30px border-radius-5px"></p>
                <button class="skeleton width-43px height-24px border-radius-5px"></button>
              </div>

              <div class="filter__list">
                <div class="skeleton width-100px height-34px border-radius-20px"></div>
                <div class="skeleton width-120px height-34px border-radius-20px"></div>
                <div class="skeleton width-80px height-34px border-radius-20px"></div>
                <div class="skeleton width-140px height-34px border-radius-20px"></div>
                <div class="skeleton width-150px height-34px border-radius-20px"></div>
                <div class="skeleton width-70px height-34px border-radius-20px"></div>
                <div class="skeleton width-120px height-34px border-radius-20px"></div>
                <div class="skeleton width-100px height-34px border-radius-20px"></div>
                <div class="skeleton width-140px height-34px border-radius-20px"></div>
                <div class="skeleton width-80px height-34px border-radius-20px"></div>
              </div>

              <div class="filter__label">
                <p class="filter__title skeleton width-120px height-30px border-radius-5px"></p>
                <button class="skeleton width-43px height-24px border-radius-5px"></button>
              </div>

              <div class="filter__list">
                <div class="skeleton width-100px height-34px border-radius-20px"></div>
                <div class="skeleton width-120px height-34px border-radius-20px"></div>
                <div class="skeleton width-80px height-34px border-radius-20px"></div>
                <div class="skeleton width-140px height-34px border-radius-20px"></div>
                <div class="skeleton width-150px height-34px border-radius-20px"></div>
                <div class="skeleton width-70px height-34px border-radius-20px"></div>
                <div class="skeleton width-120px height-34px border-radius-20px"></div>
                <div class="skeleton width-100px height-34px border-radius-20px"></div>
                <div class="skeleton width-140px height-34px border-radius-20px"></div>
                <div class="skeleton width-80px height-34px border-radius-20px"></div>
                
              </div>
            </div>
          </div>
          <div class="flex-grow-1">
            <div class="d-flex gap-3 justify-content-between align-items-center">
              <div class="products__search flex-grow-1">
                <div class="d-flex align-items-center gap-1">
                  <div class="flex-grow-1 skeleton max-width-600px height-35px border-radius-20px"></div>
                  <div class="skeleton width-51px height-35px border-radius-20px"></div>
                </div>
              </div>
              <div class="d-flex">
                <div class="skeleton width-35px height-35px border-radius-50"></div>
                <div class="skeleton width-35px height-35px border-radius-50 margin-left-5px"></div>
              </div>
            </div>
            
            <div class="products__list">
              <div class="row mt-sm-2 mt-1 gy-md-4 gy-3">
                ${[...Array(12)]
                  .map(() =>
                    prodCardSkeleton(
                      "col-xxl-3 col-lg-4 col-sm-4 col-6 px-md-3 px-2",
                    ),
                  )
                  .join("")}
              </div>
            </div>
            <div class="products__pagination">
              <div class="skeleton width-100 max-width-400px height-25px border-radius-5px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default productHomeSkeleton;
