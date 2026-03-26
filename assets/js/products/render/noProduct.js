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
