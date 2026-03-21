import {
  getBrandList,
  getGenderList,
  getProductById,
  getProductsList,
  getProductsListByBrand,
  getSimilarProducts,
  getTagList,
} from "./productsAPI.js";
import {
  renderProductDetail,
  renderProductHome,
  renderPageNotFound404,
  renderProductDetailSkeleton,
  renderProductHomeSkeleton,
} from "./products.js";
import { getReviewsByShoeId } from "./reviewsAPI.js";

const routes = [
  {
    path: "/",
    render: async ({ query }) => {
      try {
        const app = document.querySelector("#app");
        if (app) app.innerHTML = renderProductHomeSkeleton();

        const notification = setTimeout(() => {
          app.insertAdjacentHTML(
            "afterbegin",
            "<p>Vui lòng thông cảm do dùng server free của render nên sau 1 thời gian không có request nào server sẽ tạm đóng và khi có request sau khi đóng thì cần thời gian để server khởi đọng lại! Sẽ mất khoảng 10 phút hoặc ngắn hơn nếu đang giờ cao điểm! Sau khi server được khởi động lại lần đầu thì sẽ load nhanh hơn nhiều!</p>",
          );
        }, 30000);

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

        clearTimeout(notification);

        // console.log(products);
        // console.log(brandList);
        // console.log(genderList);
        // console.log(tagList);
        return {
          html: await renderProductHome({
            products,
            brandList,
            genderList,
            tagList,
          }),
          // html: renderProductHomeSkeleton(),
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
      if (app) app.innerHTML = renderProductDetailSkeleton();

      const notification = setTimeout(() => {
        app.insertAdjacentHTML(
          "afterbegin",
          "<p>Vui lòng thông cảm do dùng server free của render nên sau 1 thời gian không có request nào server sẽ tạm đóng và khi có request sau khi đóng thì cần thời gian để server khởi đọng lại! Sẽ mất khoảng 10 phút hoặc ngắn hơn nếu đang giờ cao điểm! Sau khi server được khởi động lại lần đầu thì sẽ load nhanh hơn nhiều!</p>",
        );
      }, 30000);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      const [product, reviews, similarProducts] = await Promise.all([
        getProductById(params.id),
        getReviewsByShoeId(params.id),
        getSimilarProducts(params.id, 6),
      ]);

      clearTimeout(notification);

      if (!product) return renderPageNotFound404();

      // console.log(product);
      // console.log(reviews);
      // console.log(similarProducts);

      return {
        html: await renderProductDetail({ product, reviews, similarProducts }),
        // html: renderProductDetailSkeleton(),
        route: "PRODUCT_DETAIL",
      };
    },
  },
];

export default routes;
