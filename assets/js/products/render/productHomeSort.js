//Hàm productHomeSort dùng để tạo cấu trúc html cho phần sort của trang danh sách sản phẩm
//dùng dropdown của bootstrap 5
const productHomeSort = () => {
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
};

export default productHomeSort;
