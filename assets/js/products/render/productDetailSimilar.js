import prodCard from "./prodCard.js";

const productDetailSimilar = (similarProducts = []) => {
  return `
    <div class="product__same-brand">
      <h3>Sản phẩm tương tự</h3>
      <div class="row mt-2 gy-4">
        ${similarProducts?.map((prod) => prodCard(prod, "col-xxl-3 col-lg-4 col-sm-4 col-6 px-md-3 px-1")).join("") ?? ""}
      </div>
    <div>
  `;
};

export default productDetailSimilar;
