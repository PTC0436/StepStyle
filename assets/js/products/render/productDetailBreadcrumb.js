import { HOME_DOMAIN, PRODUCT_DOMAIN } from "../utils/domain.js";

const productDetailBreadcrumb = (name) => {
  return `
    <div aria-label="breadcrumb margin-bottom-5px">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="${HOME_DOMAIN}">Home</a></li>
        <li class="breadcrumb-item"><a href="${PRODUCT_DOMAIN}">Products</a></li>
        <li class="breadcrumb-item active" aria-current="page">${name}</li>
      </ol>
    </div>
  `;
};

export default productDetailBreadcrumb;
