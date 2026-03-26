const productHomeFilter = (brandList = [], genderList = [], tagList = []) => {
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
};

export default productHomeFilter;
