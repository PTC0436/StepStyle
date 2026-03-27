const productHomeFilterModal = (
  brandList = [],
  genderList = [],
  tagList = [],
) => {
  return `
    <div class="modal fade" id="filterModal" tabindex="-1" aria-hidden="true">
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
    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#filterModal" data-aos="fade-left" data-aos-delay="350" data-aos-easing="ease-out">
      <i class="ri-filter-line"></i>
    </button>
  `;
};

export default productHomeFilterModal;
