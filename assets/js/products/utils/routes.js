import {
  getBrandList,
  getGenderList,
  getProductById,
  getProductsList,
  getSimilarProducts,
  getTagList,
} from "../services/productsAPI.js";
import { getReviewsByShoeId } from "../services/reviewsAPI.js";
import productHome from "../render/productHome.js";
import productHomeSkeleton from "../render/productHomeSkeleton.js";
import productDetail from "../render/productDetail.js";
import productDetailSkeleton from "../render/productDetailSkeleton.js";
import pageNotFound404 from "../render/pageNotFound404.js";

const routes = [
  {
    path: "/",
    render: async ({ query }) => {
      try {
        const app = document.querySelector("#app");
        if (app) app.innerHTML = productHomeSkeleton();

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        const filters = {
          search: query.get("search"),
          brand: query.get("brand"),
          gender: query.get("gender"),
          sort: query.get("sort"),
          order: query.get("order") || "asc",
          tags: query.get("tags")?.split(",") || [],
          priceMin: query.get("priceMin") ?? 0,
          priceMax: query.get("priceMax") ?? Infinity,
          page: query.get("page") ?? 1,
        };

        const [products, brandList, genderList, tagList] = await Promise.all([
          getProductsList(filters),
          getBrandList(),
          getGenderList(),
          getTagList(),
        ]);

        return {
          html: productHome({
            products,
            brandList,
            genderList,
            tagList,
          }),
          route: "PRODUCT_HOME",
        };
      } catch (err) {
        console.error(err);
      }
    },
  },

  {
    path: "/:id",
    render: async (params) => {
      const app = document.querySelector("#app");
      if (app) app.innerHTML = productDetailSkeleton();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      const [product, reviews, similarProducts] = await Promise.all([
        getProductById(params.id),
        getReviewsByShoeId(params.id),
        getSimilarProducts(params.id, 6),
      ]);

      if (!product) return pageNotFound404();

      return {
        html: productDetail({ product, reviews, similarProducts }),
        route: "PRODUCT_DETAIL",
      };
    },
  },
];

export default routes;
