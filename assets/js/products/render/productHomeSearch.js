//Hàm productHomeSearch dùng để tạo cấu trúc html cho phẩn tìm kiếm của trang danh sách sản phẩm
const productHomeSearch = () => {
  return `
    <div class="products__search flex-grow-1">
      <form class="form-group d-flex align-items-center gap-1" data-aos="fade-down" data-aos-delay="0" data-aos-easing="ease-out">
        <input name="search"  type="text" id="search" class="form-control flex-grow-1" placeholder=""/>
        <label for="search"><i class="ri-search-line"></i>Tìm kiếm...</label>
        <div data-aos="fade-left" data-aos-delay="200" data-aos-easing="ease-out"><button type="submit">Tìm</button></div>
      </form>
    </div>
  `;
};

export default productHomeSearch;
