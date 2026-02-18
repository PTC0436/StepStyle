import { getProductsListByID, getProductsList } from "./productsAPI.js";
import {
  renderProductDetail,
  renderProductHome,
  renderPageNotFound404,
} from "./products.js";

const routes = [
  {
    path: "/",
    render: async ({ query }) => {
      const priceRange = query.get("priceRange");

      const [priceStart, priceEnd] = priceRange
        ? priceRange
            .split(",")
            .map((v) => Number(v))
            .map((v) => (Number.isFinite(v) ? v : null))
        : [];

      const minPrice = priceStart ?? 0;
      const maxPrice = priceEnd ?? Infinity;

      const filters = {
        search: query.get("search"),
        brand: query.get("brand"),
        gender: query.get("gender"),
        sort: query.get("sort"),
        order: query.get("order") || "asc",
        tags: query.get("tags")?.split(",") || [],
        priceRange: [minPrice, maxPrice],
      };

      const data = await getProductsList(filters);
      return {
        html: await renderProductHome(data),
        route: "PRODUCT_HOME",
      };
    },
  },

  {
    path: "/:id",
    render: async (params) => {
      const [product] = await getProductsListByID(params.id);
      if (!product) return renderPageNotFound404();

      return {
        html: await renderProductDetail(product),
        route: "PRODUCT_DETAIL",
      };
    },
  },
];

export default routes;
