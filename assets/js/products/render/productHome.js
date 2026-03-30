import productHomeFilter from "./productHomeFilter.js";
import productHomeSearch from "./productHomeSearch.js";
import productHomeFilterModal from "./productHomeFilterModal.js";
import productHomeSort from "./productHomeSort.js";
import productHomeConstraint from "./productHomeConstraint.js";
import prodCard from "./prodCard.js";
import noProduct from "./noProduct.js";
import productHomePagination from "./productHomePagination.js";

//Hàm productHome dùng để tạo cấu trúc html trong phần #app của trang danh sách sản phẩm dùng để chèn vào cây DOM
//khi đã có dữ liệu từ call api
const productHome = ({
  products = [],
  brandList = [],
  genderList = [],
  tagList = [],
}) => {
  //Dùng cú pháp destructuring để lấy các key ra cho dễ sử dụng
  const { data, page, totalPages } = products;

  return `
    <div class="products py-md-4 py-3">
      <div class="container-xxl">
        <div class="products__wrapper d-flex">
          ${productHomeFilter(brandList, genderList, tagList)}
          <div class="flex-grow-1">
            <div class="d-flex gap-3 justify-content-between align-items-center">
              ${productHomeSearch()}
              <div class="d-flex">
                ${productHomeFilterModal(brandList, genderList, tagList)}
                ${productHomeSort()}
              </div>
            </div>
            
            ${productHomeConstraint()}
            
            <div class="products__list">
              <div class="row mt-sm-2 mt-1 gy-md-4 gy-3">
                ${
                  data
                    ?.map((item) =>
                      prodCard(
                        item,
                        "col-xxl-3 col-lg-4 col-sm-4 col-6 px-md-3 px-2",
                      ),
                    )
                    .join("") || noProduct()
                }
              </div>
            </div>
            ${productHomePagination(page, totalPages)}
          </div>
        </div>
      </div>
    </div>
    
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

export default productHome;
