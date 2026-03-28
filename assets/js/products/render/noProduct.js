//Hàm noProduct dùng để tạo cấu trúc html cho product list
//khi không có sản phẩm nào khớp với filter và search
const noProduct = () => {
  return `
    <div class="col-12">
      <div class="products__no-product">
        <p>(>_<)</p>
        <span>Không có sản phẩm nào khớp bộ lọc</span>
        <button class="btn-back">Quay lại</button>
      </div>
    </div>
  `;
};

export default noProduct;
