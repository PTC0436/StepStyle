import formatCurrency from "./formatCurrency.js";
import getDateAndTime from "./getDateAndTime.js";
import getRatingStars from "./getRatingStars.js";
import capitalizeWords from "./capitalizeWords.js";
import { HOME_DOMAIN, PRODUCT_DOMAIN } from "./domain.js";
import getHashPath from "./getHashPath.js";

export async function renderProductHome({
  products = [],
  brandList = [],
  genderList = [],
  tagList = [],
}) {
  const { data, page, totalPages } = products;

  return `
    <div class="products py-md-4 py-3">
      <div class="container-xxl">
        <div class="products__wrapper d-flex">
          ${await renderProductHomeFilter(brandList, genderList, tagList)}
          <div class="flex-grow-1">
            <div class="d-flex gap-3 justify-content-between align-items-center">
              ${renderProductHomeSearch()}
              <div class="d-flex">
                ${await renderProductHomeModal(brandList, genderList, tagList)}
                ${renderProductHomeSort()}
              </div>
            </div>
            
            ${renderProductHomeConstraint()}
            
            <div class="products__list">
              <div class="row mt-sm-2 mt-1 gy-md-4 gy-2">
                ${
                  data
                    ?.map((item) =>
                      renderProductCard(
                        item,
                        "col-xxl-3 col-lg-4 col-sm-4 col-6 px-md-3 px-1",
                      ),
                    )
                    .join("") || renderNoProduct()
                }
              </div>
            </div>
            ${renderProductHomePagination(page, totalPages)}
          </div>
        </div>
      </div>
    </div>
  `;
}

async function renderProductHomeFilter(
  brandList = [],
  genderList = [],
  tagList = [],
) {
  return `
    <div class="products__filter" data-aos="fade-right" data-aos-duration="300" data-aos-easing="ease-out">
      <div class="filter">
        <div class="filter__header">
          <h3 class="filter__heading">Bộ lọc</h3>
          <button class="filter__clear filter__clear-all">Clear all</button>
        </div>

        <div class="filter__label">
          <p class="filter__title">Thương hiệu</p>
          <button class="filter__clear filter__clear-brand">Clear</button>
        </div>

        <div class="filter__list">
          <button class="filter__item filter__item-brand" data-brand="">Tất cả</button>
          ${brandList
            .map(
              (brand) => `
            <button class="filter__item filter__item-brand" data-brand="${brand}">${brand}</button>
          `,
            )
            .join("")}
        </div>

        <div class="filter__label">
          <p class="filter__title">Giới tính</p>
          <button class="filter__clear filter__clear-gender">Clear</button>
        </div>

        <div class="filter__list">
          <button class="filter__item filter__item-gender" data-gender="">Tất cả</button>
          ${genderList
            .map(
              (gender) => `
            <button class="filter__item filter__item-gender" data-gender="${gender}">${gender}</button>
          `,
            )
            .join("")}
        </div>

        <div class="filter__label">
          <p class="filter__title">Giá</p>
          <button class="filter__clear filter__clear-price">Clear</button>
        </div>

        <div class="filter__list">
          <button class="filter__item filter__item-price" data-price-start="" data-price-end="">Tất cả</button>
          <button class="filter__item filter__item-price" data-price-start="0" data-price-end="1000000">Dưới 1 triệu</button>
          <button class="filter__item filter__item-price" data-price-start="1000000" data-price-end="2000000">Từ 1 đến 2 triệu</button>
          <button class="filter__item filter__item-price" data-price-start="2000000" data-price-end="4000000">Từ 2 đến 4 triệu</button>
          <button class="filter__item filter__item-price" data-price-start="4000000" data-price-end="Infinity">Trên 4 triệu</button>
        </div>

        <div class="filter__label">
          <p class="filter__title">Tags</p>
          <button class="filter__clear filter__clear-tags">Clear</button>
        </div>

        <div class="filter__list filter__list-tags">
          <button class="filter__item filter__item-tag" data-tag="">Tất cả</button>
          ${tagList
            .map(
              (tag) => `
            <button class="filter__item filter__item-tag" data-tag="${tag}"git >${tag}</button>
          `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function renderProductHomeSearch() {
  return `
    <div class="products__search flex-grow-1">
      <form class="form-group d-flex align-items-center gap-1" data-aos="fade-down" data-aos-delay="0" data-aos-easing="ease-out">
        <input name="search"  type="text" id="search" class="form-control flex-grow-1" placeholder=""/>
        <label for="search"><i class="ri-search-line"></i>Tìm kiếm...</label>
        <div data-aos="fade-left" data-aos-delay="200" data-aos-easing="ease-out"><button type="submit">Tìm</button></div>
      </form>
    </div>
  `;
}

function renderProductHomeSort() {
  return `
    <div class="products__sort" data-aos="fade-left" data-aos-delay="400" data-aos-easing="ease-out">
      <div class="btn-group">
        <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="ri-arrow-up-down-fill"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="defaultDropdown">
          <li><button class="dropdown-item" type="button" data-sort-field="" data-sort-order="">Mặc định</button></li>
          <li><button class="dropdown-item" type="button" data-sort-field="salePrice" data-sort-order="asc">Giá thấp đến cao</button></li>
          <li><button class="dropdown-item" type="button" data-sort-field="salePrice" data-sort-order="desc">Giá cao đến thấp</button></li>
          <li><button class="dropdown-item" type="button" data-sort-field="createAt" data-sort-order="desc">Mới nhất</button></li>
          <li><button class="dropdown-item" type="button" data-sort-field="createAt" data-sort-order="asc">Cũ nhất</button></li>
          <li><button class="dropdown-item" type="button" data-sort-field="ratingCount" data-sort-order="desc">Nhiều review nhất</button></li>
        </ul>
      </div>
    </div>
  `;
}

async function renderProductHomeModal(
  brandList = [],
  genderList = [],
  tagList = [],
) {
  return `
    <div class="modal fade" id="modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="ri-close-fill"></i></div>
          <div class="modal-header">
            <div class="filter__header">
              <h3 class="filter__heading">Bộ lọc</h3>
              <button class="filter__clear filter__clear-all" data-bs-dismiss="modal">Clear all</button>
            </div>
          </div>
          <div class="modal-body">
            <div class="filter__label">
              <p class="filter__title">Thương hiệu</p>
              <button class="filter__clear filter__clear-brand" data-bs-dismiss="modal">Clear</button>
            </div>

            <div class="filter__list">
              <button class="filter__item filter__item-brand" data-brand="" data-bs-dismiss="modal">Tất cả</button>
              ${brandList
                .map(
                  (brand) => `
                <button class="filter__item filter__item-brand" data-brand="${brand}" data-bs-dismiss="modal">${brand}</button>
              `,
                )
                .join("")}
            </div>

            <div class="filter__label">
              <p class="filter__title">Giới tính</p>
              <button class="filter__clear filter__clear-gender" data-bs-dismiss="modal">Clear</button>
            </div>

            <div class="filter__list">
              <button class="filter__item filter__item-gender" data-gender="" data-bs-dismiss="modal">Tất cả</button>
              ${genderList
                .map(
                  (gender) => `
                <button class="filter__item filter__item-gender" data-gender="${gender}" data-bs-dismiss="modal">${gender}</button>
              `,
                )
                .join("")}
            </div>

            <div class="filter__label">
              <p class="filter__title">Giá</p>
              <button class="filter__clear filter__clear-price" data-bs-dismiss="modal">Clear</button>
            </div>

            <div class="filter__list">
              <button class="filter__item filter__item-price" data-price-start="" data-price-end="" data-bs-dismiss="modal">Tất cả</button>
              <button class="filter__item filter__item-price" data-price-start="0" data-price-end="1000000" data-bs-dismiss="modal">Dưới 1 triệu</button>
              <button class="filter__item filter__item-price" data-price-start="1000000" data-price-end="2000000" data-bs-dismiss="modal">Từ 1 đến 2 triệu</button>
              <button class="filter__item filter__item-price" data-price-start="2000000" data-price-end="4000000" data-bs-dismiss="modal">Từ 2 đến 4 triệu</button>
              <button class="filter__item filter__item-price" data-price-start="4000000" data-price-end="Infinity" data-bs-dismiss="modal">Trên 4 triệu</button>
            </div>

            <div class="filter__label">
              <p class="filter__title">Tags</p>
              <button class="filter__clear filter__clear-tags" data-bs-dismiss="modal">Clear</button>
            </div>

            <div class="filter__list filter__list-tags">
              <button class="filter__item filter__item-tag" data-tag="" data-bs-dismiss="modal">Tất cả</button>
              ${tagList
                .map(
                  (tag) => `
                <button class="filter__item filter__item-tag" data-tag="${tag}" data-bs-dismiss="modal">${tag}</button>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modal" data-aos="fade-left" data-aos-delay="350" data-aos-easing="ease-out">
      <i class="ri-filter-line"></i>
    </button>
  `;
}

function renderProductHomeConstraint() {
  const { query } = getHashPath();
  const brand = query.get("brand");

  const gender = query.get("gender");

  const priceRange = query.get("priceRange");
  const [priceStart, priceEnd] = priceRange
    ? priceRange
        .split(",")
        .map((v) => Number(v))
        .map((v) => (Number.isFinite(v) ? v : null))
    : [];
  const minPrice = priceStart ?? 0;
  const maxPrice = priceEnd ?? Infinity;

  const tags = query.get("tags")?.split(",") || [];

  const sort = query.get("sort");
  const order = query.get("order") || "asc";

  var delayTime = 250;

  const increaseDelayTime = (increaseAmount) => {
    delayTime += increaseAmount;
    return delayTime;
  };

  return `
    <div class="products__constraint">
      ${brand ? `<div class="products__constraint-item" data-aos="fade-down" data-aos-delay="${increaseDelayTime(50)}">${brand} <span class="products__constraint-clear products__constraint-clear-brand"><i class="ri-close-fill"></i></span></div>` : ""}

      ${gender ? `<div class="products__constraint-item" data-aos="fade-down" data-aos-delay="${increaseDelayTime(50)}">${gender}<span class="products__constraint-clear products__constraint-clear-gender"><i class="ri-close-fill"></i></span></div>` : ""}

      ${
        minPrice == 0 && maxPrice == Infinity
          ? ""
          : `<div class="products__constraint-item" data-aos="fade-down" data-aos-delay="${increaseDelayTime(50)}">${
              minPrice == 0 && maxPrice == 1000000
                ? "Dưới 1 triệu"
                : minPrice == 1000000 && maxPrice == 2000000
                  ? "Từ 1 đến 2 triệu"
                  : minPrice == 2000000 && maxPrice == 4000000
                    ? "Từ 2 đến 4 triệu"
                    : "Trên 4 triệu"
            }<span class="products__constraint-clear products__constraint-clear-price"><i class="ri-close-fill"></i></span></div>`
      }

      ${tags
        .map(
          (
            tag,
          ) => `<div class="products__constraint-item" data-aos="fade-down" data-aos-delay="${increaseDelayTime(50)}">
        ${capitalizeWords(tag)}
        <span class="products__constraint-clear products__constraint-delete-tag" data-tag="${tag}"><i class="ri-close-fill"></i></span></div>`,
        )
        .join("")}

      ${
        sort
          ? `<div class="products__constraint-item" data-aos="fade-down" data-aos-delay="${increaseDelayTime(50)}">${
              sort == "salePrice" && order == "asc"
                ? "Giá Thấp Đến Cao"
                : sort == "salePrice" && order == "desc"
                  ? "Giá Cao Đến Thấp"
                  : sort == "createAt" && order == "desc"
                    ? "Mới Nhất"
                    : sort == "createAt" && order == "asc"
                      ? "Cũ Nhất"
                      : "Nhiều review nhất"
            }<span class="products__constraint-clear products__constraint-clear-sort"><i class="ri-close-fill"></i></span></div>`
          : ""
      }
    </div>
  `;
}

function renderProductCard(data, className) {
  // console.log(data);
  const discountPercentage = (
    100 * (data.salePrice / data.price) -
    100
  ).toFixed(0);

  return `
    <div class="${className}">
      <div class="prod__card">
        <div class="prod__thumb">
          <a href=${PRODUCT_DOMAIN + "#/" + data.id}><img src=${data.thumbnail} alt="${data.name}" loading="lazy"/></a>
          <div class="prod__badges">
            ${data.tags?.includes("Hot") ? `<span class='prod__badge prod__badge--hot'>HOT</span>` : ""}
            ${discountPercentage < 0 ? `<span class='prod__badge prod__badge--sale'>${discountPercentage}%</span>` : ""}
          </div>  
          <div class="prod__add"><i class="ri-shopping-cart-2-fill"></i></div>
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
}

function renderNoProduct() {
  return `
    <div class="col-12">
      <div class="products__no-product">
        <p>(>_<)</p>
        <span>Không có sản phẩm nào khớp bộ lọc</span>
        <button class="btn-back">Quay lại</button>
      </div>
    </div>
  `;
}

export async function renderProductDetail({
  product = {},
  reviews = [],
  similarProducts = [],
}) {
  return `
			<div class="product">
        <div class="container-xl">
          ${renderProductDetailBreadcrumb(product.name)}
          <button class="btn-back btn-back--text"><i class="ri-arrow-left-long-line"></i></button>
          <div class="product__wrapper">
            ${renderProductDetailMain(product)}
          </div>
          <div class="product__wrapper">
            ${renderProductDetailInfor(product)}
          </div>
          <div class="product__wrapper">
            ${renderProductDetailTestimonials(reviews)}
          </div>
          <div class="product__wrapper">
            ${await renderProductDetailFamiliar(similarProducts)}
          </div>
        </div>
      </div >
		`;
}

function renderProductDetailMain(product) {
  const discountPercentage = (
    100 * (product.salePrice / product.price) -
    100
  ).toFixed(0);
  // data.stock = 0;

  return `
    <div class="row">
      <div class="col-md-5">
        <div class="product__images">
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
          <h3 class="product__name">
            <span class="product__badges">
              <span class='product__badge product__badge--hot'>HOT</span>
              ${discountPercentage < 0 ? `<span class='product__badge product__badge--sale'>${discountPercentage}%</span>` : ""}
            </span>
            ${product.name}
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
                  <button class="product__quantity-btn" btn-qty-increase>+</button>
                  <div class="product__quantity-content">1</div>
                  <button class="product__quantity-btn" btn-qty-decrease>-</button>
                </div>
              </div>
            </div>
          </div>

          <div class="product__actions">
            ${
              product.stock != 0
                ? `
              <button class="product__action">Thêm vào giỏ</button>
              <button class="product__action">Mua ngay</button>
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
}

function renderProductDetailInfor(product) {
  return `
    <div class="product__infor">
      <h3>Thông tin chi tiết</h3>
      <div class="accordion product__accordion" id="product__accordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
              aria-expanded="true" aria-controls="collapseOne">
              Mô tả sản phẩm
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
            data-bs-parent="#product__accordion">
            <div class="accordion-body">
                <p class="product__name">${product.name}</p>
                <p><strong>Thương hiệu:</strong> ${product?.brand ?? "Đang cập nhật"}</p>
                <p><strong>Xuất xứ:</strong> ${product?.origin ?? "Đang cập nhật"}</p>
                <p><strong>Chất liệu:</strong> ${product?.material ?? "Đang cập nhật"}</p>
                <p><strong>Trọng lượng(kg):</strong> ${product?.weight ?? "Đang cập nhật"}</p>
                <p><strong>Giới tính:</strong> ${product?.gender ?? "Đang cập nhật"}</p>
                <p><strong>Cam kết chính hãng 100%</strong></p>
                <p><strong style="text-decoration: underline; font-style: italic;">Lưu ý:</strong>Đối với các sản phẩm hết hàng sẵn hoặc hết size bạn cần, Quý khách có thể liên hệ với Stepstyle để trao đổi.</p>
                <br/>
                <p>${product?.description ?? ""}</p>
            </div>  
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
              aria-expanded="false" aria-controls="collapseTwo">
              Chính sách thanh toán
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
            data-bs-parent="#product__accordion">
            <div class="accordion-body">
              <p>
                Stepstyle hỗ trợ nhiều hình thức thanh toán nhằm mang lại sự tiện lợi và an tâm cho khách hàng.
              </p>

              <ol>
                <li>
                  <strong>Hình thức thanh toán</strong>
                  <ul>
                    <li>
                      <strong>Thanh toán khi nhận hàng (COD):</strong>
                      Khách hàng thanh toán trực tiếp cho nhân viên giao hàng khi nhận sản phẩm.
                    </li>
                    <li>
                      <strong>Chuyển khoản ngân hàng:</strong>
                      Thông tin tài khoản sẽ được Stepstyle cung cấp sau khi xác nhận đơn hàng.
                      <br />
                      <em>Nội dung chuyển khoản: Tên + Số điện thoại + Mã đơn hàng.</em>
                    </li>
                    <li>
                      <strong>Thanh toán qua ví điện tử:</strong>
                      Momo, ZaloPay, VNPay (nếu có).
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Thời gian xác nhận thanh toán</strong>
                  <ul>
                    <li>
                      <strong>Đơn COD:</strong> Xử lý ngay sau khi xác nhận đặt hàng.
                    </li>
                    <li>
                      <strong>Đơn chuyển khoản / ví điện tử:</strong>
                      Xử lý sau khi Stepstyle xác nhận đã nhận được thanh toán.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Lưu ý</strong>
                  <ul>
                    <li>
                      Stepstyle <strong>không chịu trách nhiệm</strong> nếu khách hàng chuyển khoản sai thông
                      tin.
                    </li>
                    <li>
                      Nếu phát sinh sự cố thanh toán, vui lòng liên hệ Stepstyle để được hỗ trợ.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Chính sách đổi trả
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
            data-bs-parent="#product__accordion">
            <div class="accordion-body">
              <p>
                Stepstyle cam kết bảo vệ quyền lợi khách hàng với chính sách đổi trả minh bạch và rõ ràng.
              </p>

              <ol>
                <li>
                  <strong>Thời gian đổi trả</strong>
                  <ul>
                    <li>
                      Khách hàng được <strong>đổi hoặc trả sản phẩm trong vòng X ngày</strong> kể từ ngày nhận hàng.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Điều kiện đổi trả</strong>
                  <ul>
                    <li>Sản phẩm <strong>chưa qua sử dụng</strong>, chưa mang ra ngoài.</li>
                    <li>Còn <strong>nguyên tem, nhãn mác</strong>.</li>
                    <li>Không bị bẩn, trầy xước, biến dạng.</li>
                    <li>Có <strong>đầy đủ hộp giày và phụ kiện</strong> đi kèm.</li>
                    <li>Có <strong>hóa đơn hoặc thông tin đơn hàng</strong>.</li>
                  </ul>
                </li>

                <li>
                  <strong>Trường hợp được đổi trả</strong>
                  <ul>
                    <li>Sản phẩm bị <strong>lỗi do nhà sản xuất</strong>.</li>
                    <li>Giao <strong>sai mẫu, sai size, sai màu</strong>.</li>
                    <li>Sản phẩm bị <strong>hư hỏng trong quá trình vận chuyển</strong>.</li>
                  </ul>
                </li>

                <li>
                  <strong>Trường hợp không áp dụng đổi trả</strong>
                  <ul>
                    <li>Sản phẩm đã qua sử dụng.</li>
                    <li>Sản phẩm bị hư hỏng do người sử dụng.</li>
                    <li>
                      Sản phẩm thuộc chương trình
                      <strong>giảm giá sâu / xả kho / sale off</strong>
                      (trừ khi có lỗi từ nhà sản xuất).
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Phí đổi trả</strong>
                  <ul>
                    <li>
                      Stepstyle <strong>chịu phí đổi trả</strong> nếu lỗi thuộc về shop.
                    </li>
                    <li>
                      Khách hàng <strong>chịu phí vận chuyển</strong> nếu đổi trả do nhu cầu cá nhân.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Quy trình đổi trả</strong>
                  <ul>
                    <li>Liên hệ Stepstyle qua fanpage / hotline / email.</li>
                    <li>Cung cấp <strong>mã đơn hàng và hình ảnh sản phẩm</strong>.</li>
                    <li>Stepstyle xác nhận và hướng dẫn gửi hàng.</li>
                    <li>Tiến hành đổi hoặc trả theo thỏa thuận.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProductDetailTestimonials(reviews = []) {
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
}

async function renderProductDetailFamiliar(similarProducts = []) {
  return `
    <div class="product__same-brand">
      <h3>Sản phẩm tương tự</h3>
      <div class="row mt-2 gy-4">
        ${similarProducts?.map((prod) => renderProductCard(prod, "col-xxl-3 col-lg-4 col-sm-4 col-6 px-md-3 px-1")).join("") ?? ""}
      </div>
    <div>
  `;
}

function renderProductDetailBreadcrumb(name) {
  return `
    <div aria-label="breadcrumb margin-bottom-5px">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="${HOME_DOMAIN}">Home</a></li>
        <li class="breadcrumb-item"><a href="${PRODUCT_DOMAIN}">Products</a></li>
        <li class="breadcrumb-item active" aria-current="page">${name}</li>
      </ol>
    </div>
  `;
}

export function renderPageNotFound404() {
  return `
    <div class="not-found">
      <div class="container-fluid">
        <div class="row text-align-center">
          <h1>NOT FOUND</h1>
          <p class="zoom-area">
            Bạn đang cố truy cập vào trang không tồn tại!
          </p>
          <section class="error-container">
            <span class="four"><span class="screen-reader-text">4</span></span>
            <span class="zero"><span class="screen-reader-text">0</span></span>
            <span class="four"><span class="screen-reader-text">4</span></span>
          </section>
          <div class="link-container">
            <button class="btn-back">Quay lại</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderProductHomeSkeleton() {
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
              <div class="row mt-sm-2 mt-1 gy-md-4 gy-2">
                ${[...Array(12)]
                  .map(() =>
                    renderProdCardSkeleton(
                      "col-xxl-3 col-lg-4 col-sm-4 col-6 px-md-3 px-1",
                    ),
                  )
                  .join("")}
              </div>
            </div>
            <div class="pagination">
              <div class="skeleton width-100 max-width-400px height-25px border-radius-5px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderProductDetailSkeleton() {
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
                <div class="product__name skeleton height-20px" style="min-height:20px"></div>
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
              ${[...Array(12)].map(() => renderProdCardSkeleton("col-xxl-3 col-lg-4 col-sm-4 col-6 px-md-3 px-1")).join("")}
            </div>
          <div>
        </div>
      </div>
    </div >
  `;
}

function renderProdCardSkeleton(className) {
  return `
    <div class="${className}">
      <div class="prod__card">
        <div class="prod__thumb">
          <a class="skeleton max-width-100 border-radius-10px aspect-ratio-4-3"></a>
        </div>
        <div class="prod__content">
          <div class="skeleton max-width-200px height-20px border-radius-5px"></div>
          <p class="prod__brand skeleton max-width-100px height-18px border-radius-5px margin-top-5px"></p>
          <div class="prod__price skeleton max-width-250px height-20px border-radius-5px"></div>
          <div class="prod__rating skeleton max-width-150px height-18px border-radius-5px margin-top-5px"></div>
        </div>
      </div>
    </div>
  `;
}

export function renderProductHomePagination(currentPage, totalPages) {
  const pages = [];

  if (totalPages == 0) return "";

  pages.push(
    `<button class="pagination__item pagination__first" data-page="${currentPage == 1 ? "" : 1}"><i class="ri-arrow-left-double-fill"></i></button>`,
  );
  pages.push(
    `<button class="pagination__item pagination__prev" data-page="${currentPage == 1 ? "" : currentPage - 1}"><i class="ri-skip-left-line"></i></button>`,
  );

  // luôn có trang đầu
  pages.push(
    `<button class="pagination__item pagination__number${currentPage == 1 ? " pagination__number--active" : ""}" data-page="1">1</button>`,
  );

  // nếu current > 4 thì thêm ...
  if (currentPage > 4) {
    pages.push(
      `<button class="pagination__item pagination__dot" data-page="${Math.max(1, currentPage - 5)}">...</button>`,
    );
  }

  // các trang quanh current
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 1 && i < totalPages) {
      pages.push(
        `<button class="pagination__item pagination__number${currentPage == i ? " pagination__number--active" : ""}" data-page="${i}">${i}</button>`,
      );
    }
  }

  // nếu current < total - 3 thì thêm ...
  if (currentPage < totalPages - 3) {
    pages.push(
      `<button class="pagination__item pagination__dot" data-page="${Math.min(totalPages, currentPage + 5)}">...</button>`,
    );
  }

  // luôn có trang cuối
  if (totalPages > 1) {
    pages.push(
      `<button class="pagination__item pagination__number${currentPage == totalPages ? " pagination__number--active" : ""}" data-page="${totalPages}">${totalPages}</button>`,
    );
  }

  pages.push(
    `<button class="pagination__item pagination__next" data-page="${currentPage == totalPages ? "" : currentPage + 1}"><i class="ri-skip-right-line"></i></button>`,
  );
  pages.push(
    `<button class="pagination__item pagination__last" data-page="${currentPage == totalPages ? "" : totalPages}"><i class="ri-arrow-right-double-fill"></i></button>`,
  );

  return `
    <div class="pagination">
      ${pages.join("")}
    </div>
  `;
}
